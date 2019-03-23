import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { IEncryptionAlgorithm } from "../algorithms/IEncryptionAlgorithm";

interface IProps {
    file: ArrayBuffer;
    algorithm: IEncryptionAlgorithm;
    onEncrypted: (file: ArrayBuffer, key: any) => void;
}


@observer
class Encrypt extends React.Component<IProps> {
    @observable private progress: number;

    public componentDidMount() {
        const { algorithm } = this.props;
        algorithm.onProgress = p => this.progress = p;
        const encrypted = algorithm.encrypt(this.props.file);
        this.props.onEncrypted(encrypted, algorithm.key);
    }

    public render() {

        return (
            <div>Encrypting...({this.progress}%)</div>
        );
    }
}

export default Encrypt;
