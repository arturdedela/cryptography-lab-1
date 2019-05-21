import * as React from "react";
import { Button, Dropdown, DropdownItemProps, DropdownProps, Input, InputOnChangeData } from "semantic-ui-react";
import { Mode } from "../Encryption";
import bind from "../../../decorators/bind";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { AlgorithmNames, generateKey, validateKey } from "../algorithms";
import ChooseDesMode from "./ChooseDesMode";

interface IProps {
    onChange: (algorithm: AlgorithmNames, encryptionKey: string, options: any) => void;
    mode: Mode;
}

@observer
class ChooseAlgorithm extends React.Component<IProps> {
    private options: DropdownItemProps[] = [
        { text: "Shuffle bits", value: AlgorithmNames.ShuffleBits },
        { text: "Vernam", value: AlgorithmNames.Vernam },
        { text: "DES", value: AlgorithmNames.DES },
        { text: "RC4", value: AlgorithmNames.RC4 },
        { text: "A5", value: AlgorithmNames.A5 }
    ];

    @observable private algorithm: AlgorithmNames;
    @observable private key: any = "";
    @observable private invalidKey: boolean = false;

    private algorithmOptions: any = {};

    public render() {
        const { mode } = this.props;

        return (
            <>
                <div className="mb-3">
                    {mode === "encrypt" && this.algorithm === AlgorithmNames.DES &&
                    <p>Use an 8-character key to encrypt with regular DES, and 24-character key to encrypt with triple DES.</p>
                    }

                    <Dropdown
                        className="mr-2"
                        placeholder="Choose algorithm"
                        selection
                        options={this.options}
                        onChange={this.handleChange}
                    />

                    {this.algorithm === AlgorithmNames.DES &&
                    <ChooseDesMode onChange={this.createOptionsChangeHandler("desMode")} />
                    }

                    <Input
                        label="Key:"
                        value={this.key.toString()}
                        disabled={this.algorithm === undefined}
                        onChange={this.onKeyChange}
                        error={this.invalidKey}
                    />
                    {mode === "encrypt" &&
                    <Button icon="sync" size="small" attached="right" onClick={this.generateEncryptionKey} />
                    }

                </div>
                <Button primary onClick={this.onSubmitClick} disabled={this.algorithm === undefined}>Next</Button>
            </>
        );
    }

    private createOptionsChangeHandler(optionName: string) {
        return (value: any) => this.algorithmOptions[optionName] = value;
    }

    @bind
    private generateEncryptionKey() {
        this.key = generateKey(this.algorithm);
        this.invalidKey = false;
    }

    @bind
    private onKeyChange(e: React.ChangeEvent, data: InputOnChangeData) {
        this.key = data.value;
        this.invalidKey = false;
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

        this.props.onChange(this.algorithm, this.key, this.algorithmOptions);
    }
}

export default ChooseAlgorithm;
