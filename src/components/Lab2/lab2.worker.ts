import {
    IFinishMessage,
    IProgressMessage,
    isGetPrimeFactorizationMessage,
    isGetPrimesMessage,
    isGetRrsMessage
} from "./types";
import { eratosthenes, getPrimesInRange } from "./helpers/primes";
import { rrs } from "./helpers/rrs";
import { primeFactorization } from "./helpers/primeFactorization";

const ctx: Worker = self as any;

let upperCachedBound = 50000000;
const primesCache = eratosthenes(upperCachedBound);

ctx.postMessage({ action: "ready" });

ctx.addEventListener("message", (e) => {
    const { data } = e;

    if (isGetPrimesMessage(data)) {
        const { m } = data;
        const message: IFinishMessage = { action: "finish", result: [] };

        if (m < upperCachedBound) {
            const end = primesCache.findIndex(p => p > m);
            message.result = primesCache.slice(0, end);
        } else {
            const interval = 100;

            for (let from = upperCachedBound; from < m; from += interval) {
                const to = Math.min(m, from + interval);
                const newPrimes = getPrimesInRange(from, to);
                primesCache.push(...newPrimes);
                upperCachedBound = to;

                const progressMessage: IProgressMessage = { action: "progress", progress: (to / m) * 100 };
                ctx.postMessage(progressMessage);
            }

            message.result = primesCache;
        }

        ctx.postMessage(message);
    }

    if (isGetRrsMessage(data)) {
        const { m } = data;
        const interval = 100000;

        let result: number[] = [];
        for (let from = 0; from < m; from += interval) {
            const to = Math.min(m, from + interval);
            const numbers = rrs(m, from, to);
            result = result.concat(numbers);

            const progressMessage: IProgressMessage = { action: "progress", progress: (to / m) * 100 };
            ctx.postMessage(progressMessage);
        }

        const message: IFinishMessage = { action: "finish", result };
        ctx.postMessage(message);
    }

    if (isGetPrimeFactorizationMessage(data)) {
        const { m } = data;

        const message: IFinishMessage = { action: "finish", result: primeFactorization(m) };
        ctx.postMessage(message);
    }
});

export default null as any;