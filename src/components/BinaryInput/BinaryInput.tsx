import * as React from "react";
import { Input, InputOnChangeData } from "semantic-ui-react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Binary } from "../Binary/Binary";

import "./style.scss";

interface IProps {
    onChange?: (value: string) => void;
    value?: string;
    label?: string;
}

@observer
class BinaryInput extends React.Component<IProps> {
    @observable private binaryString: string = "";
    private readonly controlled: boolean;

    constructor(props: IProps) {
        super(props);

        this.controlled = this.props.value !== undefined;
    }

    public render() {
        const value = this.controlled ? this.props.value! : this.binaryString;

        return (
            <div className="binary-input">
                {this.props.label && <label className="binary-input__label">{this.props.label}</label>}
                <Input
                    value={value}
                    placeholder="Enter binary digit"
                    onChange={this.handleChange}
                    labelPosition="right"
                    label={Binary.toNumber(value)}
                />
            </div>
        );
    }

    @action.bound
    private handleChange(e: React.ChangeEvent, data: InputOnChangeData) {
        if (data.value.length > 32 || !Binary.binaryRegexp.test(data.value)) {
            return;
        }

        if (this.controlled) {
            this.props.onChange && this.props.onChange(data.value);
        } else {
            this.binaryString = data.value;
        }
    }
}

export default BinaryInput;
