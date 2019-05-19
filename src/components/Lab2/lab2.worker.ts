import { IFinishMessage, IProgressMessage, isGetPrimesMessage } from "./types";
import { getPrimes } from "./helpers/getPrimes";

const ctx: Worker = self as any;

ctx.addEventListener("message", (e) => {
    const { data } = e;

    if (isGetPrimesMessage(data)) {
        const { m } = data;
        const interval = 5000;

        const primes = [];
        for (let from = 0; from < m; from += interval) {
            const to = Math.min(m, from + interval);
            const newPrimes = getPrimes(from, to);
            primes.push(...newPrimes);

            const progressMessage: IProgressMessage = { action: "progress", progress: (to / m) * 100 };
            ctx.postMessage(progressMessage);
        }

        const message: IFinishMessage = { action: "finish", result: primes };
        ctx.postMessage(message);
    }

});

export default null as any;