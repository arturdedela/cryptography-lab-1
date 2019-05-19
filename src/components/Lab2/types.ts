
export interface IWorkerMessage {
    action: "progress" | "finish" | "get_primes" | "get_rrs";
}

export interface IProgressMessage extends IWorkerMessage {
    action: "progress";
    progress: number;
}

export interface IFinishMessage extends IWorkerMessage {
    action: "finish";
    result: number[];
}

export interface IGetPrimesMessage extends IWorkerMessage {
    action: "get_primes";
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