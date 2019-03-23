import * as React from "react";
import { Button, Dropdown, DropdownItemProps, DropdownProps, Input, InputOnChangeData } from "semantic-ui-react";
import { Mode } from "../Encryption";
import bind from "../../../decorators/bind";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { AlgorithmNames, generateKey, validateKey } from "../algorithms";

interface IProps {
    onChange: (algorithm: AlgorithmNames, encryptionKey: string) => void;
    mode: Mode;
}

@observer
class ChooseAlgorithm extends React.Component<IProps> {
    private options: DropdownItemProps[] = [
        { text: "Shuffle bits", value: AlgorithmNames.ShuffleBits },
        { text: "Vernam", value: AlgorithmNames.Vernam },
        { text: "DES", value: AlgorithmNames.DES },
        { text: "RC4", value: AlgorithmNames.RC4 },
    ];

    @observable private algorithm: AlgorithmNames;
    @observable private key: any = "";
    @observable private invalidKey: boolean = false;

    public render() {
        const { mode } = this.props;

        return (
            <>
                <div className="mb-3">
                    <Dropdown
                        className="mr-2"
                        placeholder="Choose algorithm"
                        selection
                        options={this.options}
                        onChange={this.handleChange}
                    />
                    <Input
                        label="Key:"
                        value={this.key.toString()}
                        disabled={this.algorithm === undefined}
                        onChange={this.onKeyChange}
                        error={this.invalidKey}
                    />
                    {mode === "encrypt" &&
                    <Button icon="sync" size="small" attached="right" onClick={this.generateEncryptionKey}/>
                    }
                </div>
                <Button primary onClick={this.onSubmitClick} disabled={this.algorithm === undefined}>Submit</Button>
            </>
        );
    }

    @bind
    private generateEncryptionKey() {
        this.key = generateKey(this.algorithm);
    }

    @bind
    private onKeyChange(e: React.ChangeEvent, data: InputOnChangeData) {
        this.key = data.value;
    }

    @bind
    private handleChange(e: React.SyntheticEvent, data: DropdownProps) {
        this.algorithm = data.value as AlgorithmNames;
        if (this.props.mode === "encrypt") {
            this.generateEncryptionKey();
        }
    }

    @bind
    private onSubmitClick()  {
        if (!validateKey(this.algorithm, this.key)) {
            this.invalidKey = true;

            return;
        }

        this.props.onChange(this.algorithm, this.key);
    }
}

export default ChooseAlgorithm;
