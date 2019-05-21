import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";

export class A5Enc {
    private reg: number[] = []; // new bool[19];
    private reg2: number[] = []; // new bool[22];
    private reg3: number[] = []; // new bool[23];

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

    public FromBoolToByte(key: number[], lsb: boolean)
    {
        // let bytes = key.length / 8;
        // if ((key.length % 8) !== 0)  {
        //     bytes++;
        // }

        const arr2: number[] = [];
        let bitIndex = 0, byteIndex = 0;
        for (let i = 0; i < key.length; i++)
        {
            if (key[i])
            {
                if (lsb) {
                    arr2[byteIndex] |= 1 << (7 - bitIndex);
                } else {
                    arr2[byteIndex] |= 1 << bitIndex;
                }
            }
            bitIndex++;
            if (bitIndex === 8)
            {
                bitIndex = 0;
                byteIndex++;
            }
        }

        return arr2;
    }

    public KeySetup(key: ArrayBuffer, frame: ArrayBuffer) {
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
        const FrameBits = this.toBitArray(frame);

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

    // конструктор, который позволяет сразу установить начальное состояние регистров и нужное значение
    //     public A5Enc(bool[][] startState)
    // {
    //     reg = startState[0];
    //     reg2 = startState[1];
    //     reg3 = startState[2];
    // }

    // public A5Enc() {
    //     for (let i = 0; i < 19; i++) {
    //         this.reg[i] = 0;
    //     }
    //     for (let i = 0; i < 22; i++) {
    //         this.reg2[i] = 0;
    //     }
    //     for (let i = 0; i < 23; i++) {
    //         this.reg3[i] = 0;
    //     }
    // }

    private toBitArray(arr: ArrayBuffer) {
        const view = new DataView(arr);
        const bits: number[] = [];
        for (let i = 0; i < view.byteLength; ++i) {
            const bitString = view.getUint8(i).toString(2).padStart(8, "0");
            const bitsArr = bitString.split("").map(n => parseInt(n, 2));
            bits.push(...bitsArr);
        }

        return bits;
    }

    // нормальная инициализация регистров, используется при обычном вызове метода A5


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
}

function A5Encyptor(msg: ArrayBuffer, key: string)
{
    const a5 = new A5Enc();
    const frame = [];
    const resbits = [];
    let framesCount = Math.round(msg.byteLength / 228);
    if ((msgbits.Length % 228) != 0)
        framesCount++;
    for (int i = 0; i < framesCount; i++)
    {
        frame[0] = i;
        a5.KeySetup(key, frame);
        bool[] KeyStream = a5.A5(true);
        for (int j = 0; j < 228; j++)
        {
            resbits[i * 228 + j] = msgbits[i * 228 + j] ^ KeyStream[j];
        }
    }
    return a5.FromBoolToByte(resbits, false);
}