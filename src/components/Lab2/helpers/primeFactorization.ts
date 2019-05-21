import { getPrimes, isPrime } from "./primes";

export function primeFactorization(m: number): Record<number, number> {
    if (isPrime(m)) {
        return { 1: 1, [m]: 1 };
    }

    const primes = getPrimes(m / 2 + 1);
    const factorization: Record<number, number> = {};

    let i = 0;
    while (i < primes.length) {
        const p = primes[i];
        if (m % p === 0) {
            factorization[p] = factorization[p] ? factorization[p] + 1 : 1;
            m /= p;
        } else {
            ++i;
        }
    }

    return factorization;
}