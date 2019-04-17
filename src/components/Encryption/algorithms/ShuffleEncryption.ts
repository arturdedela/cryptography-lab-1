import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";

export class ShuffleEncryption implements IEncryptionAlgorithm {

    public onProgress: (ready: number, total: number) => void;
    public key: string;

    private encryptTable: number[];

    public generateKey() {
        return [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5).toString();
    }

    public isValidKey(key: string): boolean {
        const parsedKey = this.parseKey(key);
        const values = new Set();

        return parsedKey.length === 8 && !parsedKey.some(i => {
            if (values.has(i)) {
                return true;
            }
            values.add(i);

            return false;
        });
    }

    public setEncryptKey(key: string) {
        const decryptTable: number[] = [];
        this.encryptTable = this.parseKey(key);
        this.encryptTable.forEach((order, i) => decryptTable[order] = i);
        this.key = decryptTable.toString();
    }

    public encrypt(data: ArrayBuffer) {
        const view = new DataView(data);

        const reshuffle = (byte: number) => {
            let reshuffled = 0;

            this.encryptTable.forEach((order, i) => {
                reshuffled |= (byte >> order & 1) << i;
            });

            return reshuffled;
        };

        for (let byteOffset = 0; byteOffset < view.byteLength; byteOffset++) {
            const reshuffledByte = reshuffle(view.getUint8(byteOffset));
            view.setUint8(byteOffset, reshuffledByte);

            if (this.onProgress) {
                this.onProgress(byteOffset, view.byteLength);
            }
        }

        return view.buffer;
    }

    public decrypt(data: ArrayBuffer): ArrayBuffer {
        return this.encrypt(data);
    }
    
    private parseKey(key: string): number[] {
        return key.split(",").map(i => parseInt(i, 10));
    }
}