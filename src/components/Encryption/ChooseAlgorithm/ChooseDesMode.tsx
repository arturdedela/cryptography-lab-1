import * as React from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";
import bind from "../../../decorators/bind";
import { DesMode } from "../algorithms/DES";


interface IProps {
    onChange: (mode: DesMode) => void;
}

class ChooseDesMode extends React.Component<IProps> {
    private options: DropdownItemProps[] = [
        { text: "Electronic code book", value: DesMode.ECB },
        { text: "Cipher block chaining", value: DesMode.CBC },
        { text: "Cipher feed back", value: DesMode.CFB },
        { text: "Output feed back", value: DesMode.OFB }
    ];

    public render() {
        return (
            <Dropdown
                defaultValue={DesMode.ECB}
                placeholder="Choose DES mode"
                selection
                options={this.options}
                onChange={this.handleChange}
            />
        );
    }

    @bind
    private handleChange(e: React.SyntheticEvent, data: DropdownProps) {
        this.props.onChange(data.value as DesMode);
    }
}

export default ChooseDesMode;
