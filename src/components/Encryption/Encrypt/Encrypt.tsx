import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as Worker from "./encrypt.worker";
import { AlgorithmNames } from "../algorithms";
import { IEncryptData, isFinishMessage, isProgressMessage } from "./types";
import { Progress } from "semantic-ui-react";
import bind from "../../../decorators/bind";

interface IProps {
    file: ArrayBuffer;
    algorithmName: AlgorithmNames;
    encryptionKey: string;
    onEncrypted: (file: ArrayBuffer, key: string) => void;
}


@observer
class Encrypt extends React.Component<IProps> {
    private static Worker: Worker;
    @observable private progress: number = 0;

    public componentDidMount() {
        const { file, algorithmName, encryptionKey } = this.props;

        if (!Encrypt.Worker) {
            Encrypt.Worker = new (Worker as any)();
        }

        Encrypt.Worker.addEventListener("message", this.workerMessageHandler);

        const encryptMessage: IEncryptData = { action: "encrypt", file, algorithmName, encryptionKey };
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
        }
        else if (isProgressMessage(data)) {
            this.progress = data.progress;
        }
    }
}

export default Encrypt;
