import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";

export class A5 implements IEncryptionAlgorithm {
    public key: string;
    public onProgress: (ready: number, total: number) => void;

    private reg: number[] = []; // new bool[19];
    private reg2: number[] = []; // new bool[22];
    private reg3: number[] = []; // new bool[23];

    public generateKey() {
        let key = "";
        while (key.length < 8) {
            key += Math.random().toString(16).substring(2);
        }

        return key.substring(0, 8);
    }

    public isValidKey(key: string): boolean {
        return key.length === 8;
    }

    public setEncryptKey(key: string): void {
        this.key = key;
    }

    public encrypt(msg: ArrayBuffer): ArrayBuffer {
        let frame;
        const resbits = [];
        const msgbits = this.toBitArray(msg);
        let framesCount = Math.floor(msgbits.length / 228);
        if ((msgbits.length % 228) !== 0) {
            framesCount++;
        }

        for (let i = 0; i < framesCount; i++) {
            frame = i;
            this.KeySetup(this.strToArrayBuffer(this.key), frame);
            const KeyStream = this.A5();
            for (let j = 0; j < 228; j++) {
                resbits[i * 228 + j] = msgbits[i * 228 + j] ^ KeyStream[j];
            }

            this.onProgress(i, framesCount);
        }

        return this.FromBoolToByte(resbits, false);
    }

    public decrypt(data: ArrayBuffer): ArrayBuffer {
        return this.encrypt(data);
    }

    // метод возвращающий всю 228 битную последовательность сгенерированного потока
    public A5()
    {
        const FirstPart = [];
        for (let i = 0; i < 228; i++)
        {
            this.clock();
            FirstPart[i] = (this.reg[18] ^ this.reg2[21] ^ this.reg3[22]);
        }

        return FirstPart;
    }

    public FromBoolToByte(key: number[], lsb: boolean): Uint8Array {
        const arr2: number[] = [];
        let bitIndex = 0, byteIndex = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < key.length; i++) {
            if (key[i]) {
                if (lsb) {
                    arr2[byteIndex] |= 1 << (7 - bitIndex);
                } else {
                    arr2[byteIndex] |= 1 << bitIndex;
                }
            }

            bitIndex++;
            if (bitIndex === 8) {
                bitIndex = 0;
                byteIndex++;
            }
        }

        return new Uint8Array(arr2);
    }

    public KeySetup(key: ArrayBuffer, frame: number) {
        for (let i = 0; i < 19; i++) {
            this.reg[i] = 0;
        }
        for (let i = 0; i < 22; i++) {
            this.reg2[i] = 0;
        }
        for (let i = 0; i < 23; i++) {
            this.reg3[i] = 0;
        }

        const KeyBits = this.toBitArray(key);
        const FrameBits = frame.toString(2)
            .padStart(32, "0")
            .split("")
            .reverse()
            .map(n => parseInt(n, 2));

        for (let i = 0; i < 64; i++)
        {
            this.clockall();
            this.reg[0] = this.reg[0] ^ KeyBits[i];
            this.reg2[0] = this.reg2[0] ^ KeyBits[i];
            this.reg3[0] = this.reg3[0] ^ KeyBits[i];
        }
        for (let i = 0; i < 22; i++)
        {
            this.clockall();
            this.reg[0] = this.reg[0] ^ FrameBits[i];
            this.reg2[0] = this.reg2[0] ^ FrameBits[i];
            this.reg3[0] = this.reg3[0] ^ FrameBits[i];
        }
        for (let i = 0; i < 100; i++)
        {
            this.clock();
        }
    }

    private toBitArray(arr: ArrayBuffer) {
        const view = new DataView(arr);
        const bits: number[] = [];
        for (let i = 0; i < view.byteLength; ++i) {
            const bitsArr = view.getUint8(i)
                .toString(2)
                .padStart(8, "0")
                .split("")
                .reverse()
                .map(n => parseInt(n, 2));

            bits.push(...bitsArr);
        }

        return bits;
    }

    private clock() {
        const majority = ((this.reg[8] & this.reg2[10]) | (this.reg[8] & this.reg3[10]) | (this.reg2[10] & this.reg3[10]));
        if (this.reg[8] === majority) {
            this.clockone(this.reg);
        }
        if (this.reg2[10] === majority) {
            this.clocktwo(this.reg2);
        }
        if (this.reg3[10] === majority) {
            this.clockthree(this.reg3);
        }
    }

    // набор функций реализующих сдвиги регистров
    private clockone(RegOne: number[])
    {
        let temp = 0;
        for (let i = RegOne.length - 1; i > 0; i--)
        {
            if (i === RegOne.length - 1) {
                temp = RegOne[13] ^ RegOne[16] ^ RegOne[17] ^ RegOne[18];
            }

            RegOne[i] = RegOne[i - 1];

            if (i === 1) {
                RegOne[0] = temp;
            }
        }

        return RegOne;
    }

    private clocktwo(RegTwo: number[])
    {
        let temp = 0;
        for (let i = RegTwo.length - 1; i > 0; i--)
        {
            if (i === RegTwo.length - 1) {
                temp = RegTwo[20] ^ RegTwo[21];
            }

            RegTwo[i] = RegTwo[i - 1];

            if (i === 1) {
                RegTwo[0] = temp;
            }
        }

        return RegTwo;
    }

    private clockthree(RegThree: number[])
    {
        let temp = 0;
        for (let i = RegThree.length - 1; i > 0; i--)
        {
            if (i === RegThree.length - 1) {
                temp = RegThree[7] ^ RegThree[20] ^ RegThree[21] ^ RegThree[22];
            }

            RegThree[i] = RegThree[i - 1];

            if (i === 1) {
                RegThree[0] = temp;
            }
        }

        return RegThree;
    }

    private clockall()
    {
        this.reg = this.clockone(this.reg);
        this.reg2 = this.clocktwo(this.reg2);
        this.reg3 = this.clockthree(this.reg3);
    }

    private strToArrayBuffer(s: string): ArrayBuffer {
        const arr = new ArrayBuffer(s.length);
        const v = new DataView(arr);

        for (let i = 0; i < s.length; ++i) {
            v.setUint8(i, s.charCodeAt(i));
        }

        return arr;
    }
}
