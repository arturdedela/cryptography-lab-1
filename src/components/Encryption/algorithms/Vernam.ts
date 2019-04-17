import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";


export class Vernam implements IEncryptionAlgorithm {
    private static readonly generatedKeyLength = 32;

    public key: string;
    public onProgress: (ready: number, total: number) => void;

    public encrypt(data: ArrayBuffer): ArrayBuffer {
        const view = new DataView(data);

        for (let byteOffset = 0; byteOffset < view.byteLength; ++byteOffset) {
            view.setUint8(byteOffset, view.getUint8(byteOffset) ^ this.key.charCodeAt(byteOffset % this.key.length));

            if (this.onProgress) {
                this.onProgress(byteOffset, view.byteLength);
            }
        }

        return view.buffer;
    }

    public decrypt(data: ArrayBuffer): ArrayBuffer {
        return this.encrypt(data);
    }

    public generateKey(): string {
        let key = "";
        while (key.length < 32) {
            key += Math.random().toString(16).substring(2);
        }

        return key.substring(0, Vernam.generatedKeyLength);
    }

    public isValidKey(key: string): boolean {
        return key.length >= 8;
    }

    public setEncryptKey(key: string): void {
        this.key = key;
    }
}