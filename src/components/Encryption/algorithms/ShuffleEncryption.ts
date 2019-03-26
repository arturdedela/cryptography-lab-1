import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";

export class ShuffleEncryption implements IEncryptionAlgorithm {

    public onProgress: (progress: number) => void;
    public key: string;
    private encryptTable: number[];
    private decryptTable: number[] = [];

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
        this.encryptTable = this.parseKey(key);
        this.encryptTable.forEach((order, i) => this.decryptTable[order] = i);
        this.key = this.decryptTable.toString();
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

        let prevProgress = 0;
        for (let byteOffset = 0; byteOffset < view.byteLength; byteOffset++) {
            const reshuffledByte = reshuffle(view.getUint8(byteOffset));
            view.setUint8(byteOffset, reshuffledByte);

            if (this.onProgress) {
                const curProgress = byteOffset / view.byteLength * 100;
                if (curProgress - prevProgress >= 1) {
                    this.onProgress(Math.round(curProgress));
                    prevProgress = curProgress;
                }
            }
        }

        return view.buffer;
    }
    
    private parseKey(key: string): number[] {
        return key.split(",").map(i => parseInt(i, 10));
    }
}