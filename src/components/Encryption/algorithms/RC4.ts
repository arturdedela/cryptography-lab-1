import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";
import { swap } from "./swap";


export class RC4 implements IEncryptionAlgorithm {
    private static readonly generatedKeyLength = 256;
    private static readonly sBlockSize = 256;

    public onProgress: (ready: number, total: number) => void;
    public key: string;

    public decrypt(data: ArrayBuffer): ArrayBuffer {
        return new ArrayBuffer(5);
    }

    public encrypt(data: ArrayBuffer): ArrayBuffer {
        const S = this.initBlock();

        const view = new DataView(data);
        let i = 0;
        let j = 0;

        for (let byteOffset = 0; byteOffset < data.byteLength; ++byteOffset) {
            i = (i + 1) % RC4.sBlockSize;
            j = (j + S[i]) % RC4.sBlockSize;
            swap(S, i, j);
            const pseudoRandomByte = S[(S[i] + S[j]) % RC4.sBlockSize];
            view.setUint8(byteOffset, view.getUint8(byteOffset) ^ pseudoRandomByte);

            if (this.onProgress) {
                this.onProgress(byteOffset, view.byteLength);
            }
        }

        return view.buffer;
    }

    public generateKey(): any {
        let key = "";
        while (key.length < RC4.generatedKeyLength) {
            key += Math.random().toString(16).substring(2);
        }

        return key.substring(0, RC4.generatedKeyLength);
    }

    public setEncryptKey(key: string) {
        this.key = key;
    }

    public isValidKey(key: string): boolean {
        return key.length >= 8;
    }

    private initBlock(): number[] {
        const S = [];
        for (let i = 0; i < RC4.sBlockSize; i++) {
            S[i] = i;
        }

        for (let i = 0, j = 0; i < RC4.sBlockSize; i++) {
            j = (j + S[i] + this.key.charCodeAt(i % this.key.length)) % 256;
            swap(S, i, j);
        }

        return S;
    }
}