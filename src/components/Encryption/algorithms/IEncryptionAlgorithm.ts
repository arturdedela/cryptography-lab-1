

export interface IEncryptionAlgorithm {
    onProgress: (ready: number, total: number) => void;
    readonly key: string;
    generateKey(): string;
    isValidKey(key: string): boolean;
    setEncryptKey(key: string): void;
    encrypt(data: ArrayBuffer): ArrayBuffer;
}