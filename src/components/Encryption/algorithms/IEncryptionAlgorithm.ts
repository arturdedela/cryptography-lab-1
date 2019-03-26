

export interface IEncryptionAlgorithm {
    onProgress: (progress: number) => void;
    readonly key: string;
    generateKey(): string;
    isValidKey(key: string): boolean;
    setEncryptKey(key: string): void;
    encrypt(data: ArrayBuffer): ArrayBuffer;
    decrypt(data: ArrayBuffer): ArrayBuffer;
}