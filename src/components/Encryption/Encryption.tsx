import * as React from "react";
import bind from "../../decorators/bind";
import { observer } from "mobx-react";
import Steps from "./Steps";
import { observable } from "mobx";
import FileUpload from "./FileUpload/FileUpload";
import ChooseAlgorithm from "./ChooseAlgorithm/ChooseAlgorithm";
import Encrypt from "./Encrypt/Encrypt";
import SwitchView from "../SwitchView/SwitchView";
import Download from "./Donwload/Download";
import { RouteComponentProps } from "react-router";
import { Button } from "semantic-ui-react";
import { AlgorithmNames } from "./algorithms";

export enum EncryptionSteps {
    UploadFile,
    ChooseAlgorithm,
    Encrypting,
    DownloadFile
}

export type Mode = "encrypt" | "decrypt";

@observer
class Encryption extends React.Component<RouteComponentProps<{ mode: Mode }>> {
    @observable private step: EncryptionSteps = EncryptionSteps.UploadFile;
    @observable private file: ArrayBuffer;
    @observable private fileName: string;
    @observable private algorithm: AlgorithmNames;
    @observable private encryptedFile: Blob;
    @observable private encryptionKey: string;
    @observable private decryptionKey: string;
    private algorithmOptions: any;

    public render() {
        const { mode } = this.props.match.params;

        return (
            <>
                <Steps mode={mode} step={this.step} />

                <SwitchView activeView={this.step}>
                    <FileUpload onChange={this.onFileUpload} />
                    <ChooseAlgorithm mode={mode} onChange={this.onChooseAlgorithm} />
                    <Encrypt
                        mode={mode}
                        file={this.file}
                        algorithmName={this.algorithm}
                        encryptionKey={this.encryptionKey}
                        options={this.algorithmOptions}
                        onEncrypted={this.onEncrypted}
                    />
                    <Download mode={mode} file={this.encryptedFile} fileName={this.fileName} decryptionKey={this.decryptionKey} />
                </SwitchView>

                {this.step === EncryptionSteps.DownloadFile &&
                <Button floated="right" secondary onClick={this.reset}>
                    {mode[0].toUpperCase() + mode.slice(1)} another file
                </Button>
                }
            </>
        );
    }

    @bind
    private onFileUpload(file: ArrayBuffer, fileName: string) {
        this.file = file;
        this.fileName = fileName;
        this.step = EncryptionSteps.ChooseAlgorithm;
    }

    @bind
    private onChooseAlgorithm(algorithm: AlgorithmNames, encryptionKey: string, options: any) {
        this.algorithm = algorithm;
        this.encryptionKey = encryptionKey;
        this.algorithmOptions = options;
        this.step = EncryptionSteps.Encrypting;
    }

    @bind
    private onEncrypted(file: ArrayBuffer, decryptionKey: string) {
        this.encryptedFile = new Blob([new Uint8Array(file)]);
        this.decryptionKey = decryptionKey;
        this.step = EncryptionSteps.DownloadFile;
    }

    @bind
    private reset() {
        this.step = EncryptionSteps.UploadFile;
        this.file = undefined!;
        this.fileName = undefined!;
        this.algorithm = undefined!;
        this.encryptedFile = undefined!;
        this.encryptionKey = undefined!;
    }
}

export default Encryption;
