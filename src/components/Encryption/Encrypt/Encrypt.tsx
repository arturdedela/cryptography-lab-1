import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as Worker from "./encrypt.worker";
import { AlgorithmNames } from "../algorithms";
import { EncryptTimings, IEncryptData, isFinishMessage, isProgressMessage } from "./types";
import { Progress } from "semantic-ui-react";
import bind from "../../../decorators/bind";
import { Mode } from "../Encryption";

interface IProps {
    file: ArrayBuffer;
    mode: Mode;
    algorithmName: AlgorithmNames;
    encryptionKey: string;
    onEncrypted: (file: ArrayBuffer, key: string) => void;
}

@observer
class Encrypt extends React.Component<IProps> {
    private static Worker: Worker;
    @observable private progress: number = 0;

    public componentDidMount() {
        const { file, algorithmName, encryptionKey, mode } = this.props;

        if (!Encrypt.Worker) {
            Encrypt.Worker = new (Worker as any)();
        }

        Encrypt.Worker.addEventListener("message", this.workerMessageHandler);

        const encryptMessage: IEncryptData = { action: "encrypt", mode, file, algorithmName, encryptionKey };
        Encrypt.Worker.postMessage(encryptMessage);
    }

    public componentWillUnmount() {
        Encrypt.Worker.removeEventListener("message", this.workerMessageHandler);
    }

    public render() {

        return (
            <Progress progress="percent" percent={this.progress} color="violet">
                Encrypting...
            </Progress>
        );
    }

    @bind
    private workerMessageHandler(e: any) {
        const { data } = e;
        if (isFinishMessage(data)) {
            this.props.onEncrypted(data.encryptedFile, data.decryptionKey);
            this.saveEncryptTime(data.encryptTime);
        }
        else if (isProgressMessage(data)) {
            this.progress = data.progress;
        }
    }

    private saveEncryptTime(time: number) {
        const key = `${this.props.algorithmName}_timings`;
        const s = localStorage.getItem(key);
        const timings: EncryptTimings = s ? JSON.parse(s) : [];
        timings.push({ size: this.props.file.byteLength, time });
        localStorage.setItem(key, JSON.stringify(timings));
    }
}

export default Encrypt;
