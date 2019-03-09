import { observable, reaction } from "mobx";

export class Binary {
    public static binaryRegexp = /^$|^1[01]*$/;

    public static toBinaryString(value: number) {
        let res = "";
        while (value) {
            res = (value & 1) + res;
            value >>= 1;
        }

        return res;
    }

    @observable private binary: string;
    @observable private integer: number;

    public set value(v: string | number) {
        if (typeof v === "string") {
            this.binary = v;
        } else if (typeof v === "number") {
            if (v < 0) {
                throw new TypeError("Negative numbers not supported yet");
            }

            this.integer = v;
        } else {
            throw new TypeError();
        }
    }

    constructor(value: string | number = 0) {
        reaction(() => this.integer, integer => {
            this.binary = Binary.toBinaryString(integer);
        });

        reaction(() => this.binary, binary => {
            this.integer = parseInt(binary, 2);
        });

        this.value = value;
    }

    public getBit(i: number) {
        return (this.integer >> i) & 1;
    }

    public enableBit(i: number) {
        this.integer |= (1 << i);

        return this.binary;
    }

    public disableBit(i: number) {
        this.integer &= ~(1 << i);

        return this.binary;
    }

    public swapBits(i: number, j: number) {
        // Check that bits differs, otherwise swap not needed
        if (((this.integer >> i) & 1) !== ((this.integer >> j) & 1)) {
            this.integer ^= (1 << i) | (1 << j);
        }

        return this.binary;
    }

    public resetBits(n: number) {
        this.integer = this.integer >> n << n;

        return this.binary;
    }

    public getOuterBits(msbCnt: number, lsbCnt: number) {
        return this.binary.substr(0, msbCnt) + this.binary.substr(-lsbCnt);
    }

    public getInnerBits(msbCnt: number, lsbCnt: number) {
        return this.binary.substring(msbCnt, this.binary.length - lsbCnt);
    }

    public toString(): string {
        return this.binary;
    }

    public valueOf(): number {
        return this.integer;
    }
}

