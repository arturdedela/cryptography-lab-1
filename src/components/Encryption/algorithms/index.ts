import { ShuffleEncryption } from "./ShuffleEncryption";
import { RC4 } from "./RC4";
import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";

enum AlgorithmNames {
    ShuffleBits,
    Vernam,
    DES,
    RC4
}

const algorithms: Record<AlgorithmNames, IEncryptionAlgorithm> = {
    [AlgorithmNames.ShuffleBits]: new ShuffleEncryption,
    [AlgorithmNames.Vernam]: new ShuffleEncryption,
    [AlgorithmNames.DES]: new ShuffleEncryption,
    [AlgorithmNames.RC4]: new RC4,
};

function generateKey(i: AlgorithmNames): string {
    return algorithms[i].generateKey();
}

function validateKey(i: AlgorithmNames, key: string): boolean {
    return algorithms[i].isValidKey(key);
}

export {
    algorithms,
    generateKey,
    validateKey,
    AlgorithmNames,

    ShuffleEncryption,
    RC4
};