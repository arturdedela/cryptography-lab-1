import { IEncryptionAlgorithm } from "./IEncryptionAlgorithm";
import { ShuffleEncryption } from "./ShuffleEncryption";
import { RC4 } from "./RC4";
import { Vernam } from "./Vernam";
import { DES } from "./DES";

enum AlgorithmNames {
    ShuffleBits = "shuffle",
    Vernam = "vernam",
    DES = "des",
    RC4 = "rc4"
}

const algorithms: Record<AlgorithmNames, IEncryptionAlgorithm> = {
    [AlgorithmNames.ShuffleBits]: new ShuffleEncryption,
    [AlgorithmNames.Vernam]: new Vernam,
    [AlgorithmNames.DES]: new DES,
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
};