import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as Worker from "./encrypt.worker";
import { AlgorithmNames } from "../algorithms";
import { IEncryptData, isFinishMessage, isProgressMessage } from "./types";
import { Progress } from "semantic-ui-react";

interface IProps {
    file: ArrayBuffer;
    algorithmName: AlgorithmNames;
    encryptionKey: string;
    onEncrypted: (file: ArrayBuffer, key: string) => void;
}


@observer
class Encrypt extends React.Component<IProps> {
    @observable private progress: number = 0;

    public componentDidMount() {
        const { file, algorithmName, encryptionKey, onEncrypted } = this.props;

        const encryptionWorker = new (Worker as any)() as Worker;
        encryptionWorker.addEventListener("message", (e: any) => {
            const { data } = e;
            if (isFinishMessage(data)) {
                onEncrypted(data.encryptedFile, data.decryptionKey);
            }

            if (isProgressMessage(data)) {
                this.progress = data.progress;
            }
        });

        const encryptMessage: IEncryptData = { action: "encrypt", file, algorithmName, encryptionKey };
        encryptionWorker.postMessage(encryptMessage);
    }

    public render() {

        return (
            <Progress progress="percent" percent={this.progress} color="violet">
                Encrypting...
            </Progress>
        );
    }
}

export default Encrypt;
