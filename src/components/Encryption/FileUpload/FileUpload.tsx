import * as React from "react";
import "./style.scss";
import bind from "../../../decorators/bind";
import { Button, Icon } from "semantic-ui-react";

interface IProps {
    onChange: (file: ArrayBuffer, fileName: string) => void;
}

class FileUpload extends React.Component<IProps> {

    public render() {
        return (
            <Button className="file-upload" color="teal" size="massive" icon labelPosition="right">
                <input type="file" onChange={this.handleChange} />
                Choose file
                <Icon name="upload" />
            </Button>
        );
    }

    @bind
    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0];
        const reader = new FileReader();

        // @ts-ignore
        reader.onload = readerEvent => this.props.onChange(readerEvent.target.result, file.name);

        reader.readAsArrayBuffer(file);
    }
}

export default FileUpload;
