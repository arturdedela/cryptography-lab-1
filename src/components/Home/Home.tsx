import * as React from "react";
import BinaryInput from "../BinaryInput/BinaryInput";
import { Divider, Form, InputOnChangeData, Statistic, Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Binary } from "../Binary/Binary";
import bind from "../../decorators/bind";


@observer
class Home extends React.Component {
    @observable private binary: Binary = new Binary();
    @observable private i: number = 0;
    @observable private j: number = 0;
    private bitsOrder: string;

    public render() {
        return (
            <Form>
                <Statistic>
                    <Statistic.Value>{this.binary.toString(32)}</Statistic.Value>
                    <Statistic.Label>32-bit representation</Statistic.Label>
                </Statistic>

                <Form.Field>
                    <BinaryInput
                        label="Enter 32-bit digit:"
                        value={this.binary.toString()}
                        onChange={this.handleInputChange}
                    />
                </Form.Field>

                <Form.Group unstackable inline>
                    <Form.Input
                        label="i"
                        type="number"
                        min="0"
                        max="31"
                        size="mini"
                        value={this.i}
                        onChange={this.createIndexChangeHandler("i")}
                    />
                    <Form.Input
                        label="j"
                        type="number"
                        min="0"
                        max="31"
                        size="mini"
                        value={this.j}
                        onChange={this.createIndexChangeHandler("j")}
                    />
                </Form.Group>

                <Statistic size="mini">
                    <Statistic.Value>{this.binary.getBit(this.i)}</Statistic.Value>
                    <Statistic.Label>i-th bit</Statistic.Label>
                </Statistic>

                <Statistic size="mini">
                    <Statistic.Value>{this.binary.getBit(this.j)}</Statistic.Value>
                    <Statistic.Label>j-th bit</Statistic.Label>
                </Statistic>

                <Statistic size="mini">
                    <Statistic.Value>{this.binary.maxDividePowerOf2()}</Statistic.Value>
                    <Statistic.Label>Max divide power of 2</Statistic.Label>
                </Statistic>

                <Statistic size="mini">
                    <Statistic.Value>{this.binary.getPower_2_5()}</Statistic.Value>
                    <Statistic.Label>2.5. Power <i>p</i></Statistic.Label>
                </Statistic>

                <Statistic size="mini">
                    <Statistic.Value>{this.binary.xorBits()}</Statistic.Value>
                    <Statistic.Label>XORed bits</Statistic.Label>
                </Statistic>

                <Divider />

                <div className="mb-4">
                    <Button.Group>
                        <Button type="button" positive onClick={this.createEnableBitHandler("i")}>Enable i-th bit</Button>
                        <Button.Or />
                        <Button type="button" secondary onClick={this.createDisableBitHandler("i")}>Disable i-th bit</Button>
                    </Button.Group>
                </div>

                <div className="mb-4">
                    <Button.Group>
                        <Button type="button" positive onClick={this.createEnableBitHandler("j")}>Enable j-th bit</Button>
                        <Button.Or />
                        <Button type="button" secondary onClick={this.createDisableBitHandler("j")}>Disable j-th bit</Button>
                    </Button.Group>
                </div>

                <div className="mb-3">
                    <Button type="button" onClick={this.onSwapClick}>Swap i-th and j-th bits</Button>

                    <Button type="button" onClick={this.onResetClick}>Reset i LSBs</Button>

                    <Button type="button" onClick={this.onConcatClick}>Concat i MSBs and j LSBs</Button>

                    <Button type="button" onClick={this.onGetInnerClick}>Get inner bits between i and j</Button>

                    <Button type="button" onClick={this.onSwapBytesClick}>Swap i-th and j-th bytes</Button>
                </div>

                <div className="mb-3">
                    <Button type="button" onClick={this.onLeftShiftClick}>Left shift by i</Button>

                    <Button type="button" onClick={this.onRightShiftClick}>Right shift by i</Button>
                </div>
                
                <div>
                    <Form.Group>
                        <Form.Input
                            width={10}
                            label="Bits order:"
                            onChange={this.onBitsOrderChange}
                        />
                        <Button type="button" onClick={this.onReshuffleClick}>Reshuffle bits</Button>
                    </Form.Group>
                </div>

            </Form>
        );
    }

    @bind
    private handleInputChange(value: string) {
        this.binary.value = value;
    }

    @bind
    private createIndexChangeHandler(indexName: "i" | "j") {
        return (e: React.ChangeEvent, data: InputOnChangeData) => {
            const n = Number(data.value);
            if (n < 0 || n > 31) {
                return;
            }

            this[indexName] = n;
        };
    }

    @bind
    private createEnableBitHandler(bit: "i" | "j") {
        return () => this.binary.enableBit(this[bit]);
    }

    @bind
    private createDisableBitHandler(bit: "i" | "j") {
        return () => this.binary.disableBit(this[bit]);
    }

    @bind
    private onSwapClick() {
        this.binary.swapBits(this.i, this.j);
    }

    @bind
    private onResetClick() {
        this.binary.resetBits(this.i);
    }

    @bind
    private onConcatClick() {
        this.binary.value = this.binary.getOuterBits(this.i, this.j);
    }

    @bind
    private onGetInnerClick() {
        this.binary.value = this.binary.getInnerBits(this.i, this.j);
    }

    @bind
    private onSwapBytesClick() {
        this.binary.swapBytes(this.i, this.j);
    }

    @bind
    private onRightShiftClick() {
        this.binary.rightShift(this.i);
    }

    @bind
    private onLeftShiftClick() {
        this.binary.leftShift(this.i);
    }
    
    @bind
    private onBitsOrderChange(e: React.ChangeEvent, data: InputOnChangeData) {
        this.bitsOrder = data.value;
    }
    
    @bind
    private onReshuffleClick() {
        this.binary.reshuffle(
            this.bitsOrder
                .split(",")
                .map(n => parseInt(n, 10))
        );
    }
}

export default Home;
