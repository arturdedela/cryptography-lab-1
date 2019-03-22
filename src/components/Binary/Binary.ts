import { observable, reaction } from "mobx";


export class Binary {
    public static binaryRegexp = /^[01]*$/;

    public static toBinaryString(value: number) {
        return (value >>> 0).toString(2);
    }

    public static toNumber(value: string) {
        // Before a bitwise operation is performed, JavaScript converts numbers to 32 bits signed integers.
        return parseInt(value, 2) << 0;
    }

    @observable private binary: string;
    @observable private integer: number;

    public set value(v: string | number) {
        if (typeof v === "string") {
            this.integer = Binary.toNumber(v);
        } else if (typeof v === "number") {
            this.integer = v;
        } else {
            throw new TypeError();
        }
    }

    constructor(value: string | number = 0) {
        reaction(() => this.integer, integer => {
            this.binary = Binary.toBinaryString(integer);
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

    public swapBytes(i: number, j: number) {
        if (i < 0 || i > 3 || j < 0 || j > 4) {
            throw new Error();
        }

        const bytes = this.toString(32).match(/\d{8}/g)!;
        const tmp = bytes[3 - i];
        bytes[3 - i] = bytes[3 - j];
        bytes[3 - j] = tmp;

        this.value = Binary.toNumber(bytes.join(""));
    }

    public maxDividePowerOf2() {
        return Math.log2(this.integer & -this.integer);
    }

    public getPower_2_5() {
        return this.binary.length - 1;
    }

    public xorBits() {
        let i = 0;
        let n = this.integer;

        while (n) {
            i = i ^ (n & 1);
            n = n >>> 1;
        }

        return i;
    }

    public leftShift(n: number) {
        this.integer = (this.integer << n) | (this.integer >>> (32 - n));
    }

    public rightShift(n: number) {
        this.integer = ((this.integer >>> n) | (this.integer << (32 - n))) >>> 0;
    }

    public toString(pad?: number): string {
        if (pad) {
            return this.binary.padStart(pad, "0");
        }

        return this.binary;
    }

    public valueOf(): number {
        return this.integer;
    }
}

