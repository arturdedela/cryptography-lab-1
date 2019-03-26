import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";


export class RC4 implements IEncryptionAlgorithm {
    public key: string;
    public onProgress: (progress: number) => void;
    private readonly keyLength: number = 128;

    public decrypt(data: ArrayBuffer): ArrayBuffer {
        return new ArrayBuffer(5);
    }

    public encrypt(data: ArrayBuffer): ArrayBuffer {
        return new ArrayBuffer(5);
    }

    public generateKey(): any {
        let key = "";
        while (key.length < this.keyLength) {
            key += Math.random().toString(16).substring(2);
        }

        return key.substring(0, this.keyLength);
    }

    public setEncryptKey(key: string) {
        this.key = key;
    }

    public isValidKey(key: string): boolean {
        return key.length >= 8;
    }

}