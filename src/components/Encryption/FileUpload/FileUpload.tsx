import * as React from "react";
import "./style.scss";
import bind from "../../../decorators/bind";
import { Button, Icon, Progress } from "semantic-ui-react";
import { observable } from "mobx";
import { observer } from "mobx-react";

interface IProps {
    onChange: (file: ArrayBuffer, fileName: string) => void;
}

@observer
class FileUpload extends React.Component<IProps> {
    @observable private progress: number;

    public render() {
        if (this.progress) {
            return (
                <Progress progress="percent" percent={this.progress} color="teal">
                    Reading file...
                </Progress>
            );
        }

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

        reader.onprogress = p => this.progress = Math.round(p.loaded / p.total * 100);
        // @ts-ignore
        reader.onload = readerEvent => this.props.onChange(readerEvent.target.result, file.name);

        reader.readAsArrayBuffer(file);
    }
}

export default FileUpload;
