import * as React from "react";
import { Button, Dropdown, DropdownItemProps, DropdownProps, Input, InputOnChangeData } from "semantic-ui-react";
import { EncryptionAlgorithm, Mode } from "../Encryption";
import bind from "../../../decorators/bind";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { ShuffleEncryption } from "../algorithms/ShuffleEncryption";
import { RC4 } from "../algorithms/RC4";
import { IEncryptionAlgorithm } from "../algorithms/IEncryptionAlgorithm";

interface IProps {
    onChange: (algorithm: IEncryptionAlgorithm) => void;
    mode: Mode;
}

@observer
class ChooseAlgorithm extends React.Component<IProps> {
    private algorithms: Record<EncryptionAlgorithm, IEncryptionAlgorithm> = {
        [EncryptionAlgorithm.ShuffleBits]: new ShuffleEncryption,
        [EncryptionAlgorithm.Vernam]: new ShuffleEncryption,
        [EncryptionAlgorithm.DES]: new ShuffleEncryption,
        [EncryptionAlgorithm.RC4]: new RC4,
    };

    private options: DropdownItemProps[] = [
        { text: "Shuffle bits", value: EncryptionAlgorithm.ShuffleBits },
        { text: "Vernam", value: EncryptionAlgorithm.Vernam },
        { text: "DES", value: EncryptionAlgorithm.DES },
        { text: "RC4", value: EncryptionAlgorithm.RC4 },
    ];

    @observable private algorithm: EncryptionAlgorithm;
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
        this.key = this.algorithms[this.algorithm].generateKey();
    }

    @bind
    private onKeyChange(e: React.ChangeEvent, data: InputOnChangeData) {
        this.key = data.value;
    }

    @bind
    private handleChange(e: React.SyntheticEvent, data: DropdownProps) {
        this.algorithm = data.value as EncryptionAlgorithm;
        if (this.props.mode === "encrypt") {
            this.generateEncryptionKey();
        }
    }

    @bind
    private onSubmitClick()  {
        const algorithm = this.algorithms[this.algorithm];
        if (!algorithm.setEncryptKey(this.key)) {
            this.invalidKey = true;

            return;
        }

        this.props.onChange(algorithm);
    }
}

export default ChooseAlgorithm;
