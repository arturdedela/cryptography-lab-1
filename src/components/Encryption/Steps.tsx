import * as React from "react";
import { Icon, Step } from "semantic-ui-react";
import { EncryptionSteps, Mode } from "./Encryption";

interface IProps {
    step: EncryptionSteps;
    mode: Mode;
}

class Steps extends React.Component<IProps> {
    public render() {
        const { step, mode } = this.props;

        return (
            <Step.Group fluid>
                <Step active={step === EncryptionSteps.UploadFile}>
                    <Icon name="upload" />
                    <Step.Content>
                        <Step.Title>Upload file</Step.Title>
                        <Step.Description>Choose file you want to {mode}</Step.Description>
                    </Step.Content>
                </Step>

                <Step active={step === EncryptionSteps.ChooseAlgorithm} disabled={step < EncryptionSteps.ChooseAlgorithm}>
                    <Icon name="key" />
                    <Step.Content>
                        <Step.Title>Algorithm</Step.Title>
                        <Step.Description>Choose encryption algorithm</Step.Description>
                    </Step.Content>
                </Step>

                <Step active={step === EncryptionSteps.Encrypting} disabled={step < EncryptionSteps.Encrypting}>
                    <Icon name="cog" loading={step === EncryptionSteps.Encrypting} />
                    <Step.Content>
                        <Step.Title>{`${mode[0].toUpperCase() + mode.slice(1)}ing`}</Step.Title>
                        {/*<Step.Description>Wait for the encryption process to complete.</Step.Description>*/}
                    </Step.Content>
                </Step>

                <Step active={step === EncryptionSteps.DownloadFile} disabled={step < EncryptionSteps.DownloadFile}>
                    <Icon name="download" />
                    <Step.Content>
                        <Step.Title>Download {mode}ed file</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        );
    }
}

export default Steps;
