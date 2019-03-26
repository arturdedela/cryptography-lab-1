import * as React from "react";
import { saveAs } from "file-saver";
import { Button, Message } from "semantic-ui-react";
import { Mode } from "../Encryption";


interface IProps {
    file: Blob;
    fileName: string;
    decryptionKey: string;
    mode: Mode;
}

class Download extends React.Component<IProps> {

    public componentDidMount() {
        saveAs(this.props.file, this.saveFileName);
    }

    public render() {
        const { mode } = this.props;

        return (
            <>
                <Message success>
                    <Message.Header>File successfully {mode}ed</Message.Header>
                    {mode === "encrypt" &&
                    <p style={{ wordBreak: "break-word"}}>Your decryption key: <b>{this.props.decryptionKey}</b></p>
                    }
                </Message>
                {mode === "encrypt" &&
                <Message warning>
                    <Message.Header>IMPORTANT!</Message.Header>
                    <p>Don't lose your key! Only with this key you will be able to decrypt your file!</p>
                </Message>
                }

                <p>Click the button below if your download doesn't start automatically.</p>
                <Button
                    as="a"
                    href={URL.createObjectURL(this.props.file)}
                    download={this.saveFileName}
                    content="Download"
                    primary
                    icon="download"
                    labelPosition="right"
                />
            </>
        );
    }

    private get saveFileName() {
        const splitted = this.props.fileName.split(".");

        return splitted
            .slice(0, splitted.length - 1)
            .concat(`${this.props.mode}ed`)
            .concat(splitted.splice(-1))
            .join(".");
    }
}

export default Download;
