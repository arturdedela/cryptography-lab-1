import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";

export class ShuffleEncryption implements IEncryptionAlgorithm {

    public onProgress: (progress: number) => void;
    public key: string;
    private encryptTable: number[];
    private decryptTable: number[] = [];

    public generateKey() {
        return [0, 1, 2, 3, 4, 5, 6, 7].sort(() => Math.random() - 0.5).toString();
    }

    public setEncryptKey(key: string): boolean {
        const parsedKey = this.parseKey(key);
        if (!this.isValidKey(parsedKey)) {
            return false;
        }

        this.encryptTable = parsedKey;
        this.encryptTable.forEach((order, i) => this.decryptTable[order] = i);
        this.key = this.decryptTable.toString();

        return true;
    }

    public encrypt(data: ArrayBuffer) {
        return this.run(data, this.encryptTable);
    }

    public decrypt(data: ArrayBuffer) {
        return this.run(data, this.decryptTable);
    }

    private run(data: ArrayBuffer, shuffleTable: number[]) {
        const view = new DataView(data);

        const reshuffle = (byte: number) => {
            let reshuffled = 0;

            shuffleTable.forEach((order, i) => {
                reshuffled |= (byte >> order & 1) << i;
            });

            return reshuffled;
        };

        for (let byteOffset = 0; byteOffset < view.byteLength; byteOffset++) {
            const reshuffledByte = reshuffle(view.getUint8(byteOffset));
            view.setUint8(byteOffset, reshuffledByte);

            if (this.onProgress) {
                this.onProgress(byteOffset / view.byteLength * 100);
            }
        }

        return view.buffer;
    }

    private parseKey(key: string): number[] {
        return key.split(",").map(i => parseInt(i, 10));
    }

    private isValidKey(key: number[]): boolean {
        const values = new Set();

        return key.length === 8 && !key.some(i => {
            if (values.has(i)) {
                return true;
            }
            values.add(i);

            return false;
        });
    }

}