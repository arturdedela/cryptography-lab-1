import { AlgorithmNames } from "../algorithms";
import { Mode } from "../Encryption";


export interface IEventData {
    action: string;
}

export interface IEncryptData extends IEventData {
    file: ArrayBuffer;
    mode: Mode;
    algorithmName: AlgorithmNames;
    encryptionKey: string;
}

export interface IProgressData extends IEventData{
    progress: number;
}

export interface IFinishData extends IEventData {
    encryptedFile: ArrayBuffer;
    decryptionKey: string;
    encryptTime: number;
}

export function isEncryptMessage(data: IEventData): data is IEncryptData {
    return data.action === "encrypt";
}

export function isProgressMessage(data: IEventData): data is IProgressData {
    return data.action === "progress";
}

export function isFinishMessage(data: IEventData): data is IFinishData {
    return data.action === "finish";
}


export type EncryptTimings = Array<{ size: number, time: number }>;