
export interface IWorkerMessage {
    action: "progress" | "finish" | "get_primes" | "get_rrs" | "get_prime_factorization" | "ready";
}

export interface IReadyMessage extends IWorkerMessage {
    action: "ready";
}

export interface IProgressMessage extends IWorkerMessage {
    action: "progress";
    progress: number;
}

export interface IFinishMessage extends IWorkerMessage {
    action: "finish";
    result: number[] | Record<number, number>;
}

export interface IGetPrimesMessage extends IWorkerMessage {
    action: "get_primes";
    m: number;
}

export interface IGetRrsMessage extends IWorkerMessage {
    action: "get_rrs";
    m: number;
}

export interface IGetPrimeFactorizationMessage extends IWorkerMessage {
    action: "get_prime_factorization";
    m: number;
}

export function isProgressMessage(message: IWorkerMessage): message is IProgressMessage {
    return message.action === "progress";
}

export function isFinishMessage(message: IWorkerMessage): message is IFinishMessage {
    return message.action === "finish";
}

export function isGetPrimesMessage(message: IWorkerMessage): message is IGetPrimesMessage {
    return message.action === "get_primes";
}

export function isGetRrsMessage(message: IWorkerMessage): message is IGetRrsMessage {
    return message.action === "get_rrs";
}

export function isGetPrimeFactorizationMessage(message: IWorkerMessage): message is IGetPrimeFactorizationMessage {
    return message.action === "get_prime_factorization";
}

export function isReadyMessage(message: IWorkerMessage): message is IReadyMessage {
    return message.action === "ready";
}