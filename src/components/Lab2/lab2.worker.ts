import { IPrimesMessage, isGetPrimesMessage } from "./types";
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
            const message: IPrimesMessage = { action: "primes", primes, progress: (to / m) * 100 };

            ctx.postMessage(message);
        }
    }

});

export default null as any;