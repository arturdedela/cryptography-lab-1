
export interface IWorkerMessage {
    action: "get_primes" | "primes";
}

export interface IGetPrimesMessage extends IWorkerMessage {
    action: "get_primes";
    m: number;
}

export interface IPrimesMessage extends IWorkerMessage {
    action: "primes";
    progress: number;
    primes: number[];
}

export function isGetPrimesMessage(message: IWorkerMessage): message is IGetPrimesMessage {
    return message.action === "get_primes";
}

export function isPrimesMessage(message: IWorkerMessage): message is IPrimesMessage {
    return message.action === "primes";
}