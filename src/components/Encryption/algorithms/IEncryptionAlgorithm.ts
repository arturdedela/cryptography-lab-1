

export interface IEncryptionAlgorithm {
    onProgress: (progress: number) => void;
    readonly key: string;
    generateKey(): string;
    setEncryptKey(key: string): boolean;
    encrypt(data: ArrayBuffer): ArrayBuffer;
    decrypt(data: ArrayBuffer): ArrayBuffer;
}