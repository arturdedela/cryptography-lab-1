import { range } from "./range";

export function getPrimes(from: number, to: number): number[] {
    const simples = [];
    for (const n of range(from, to)) {
        if (isPrime(n)) {
            simples.push(n);
        }
    }

    return simples;
}

const simpleCache = new Set();
function isPrime(n: number) {
    if (n < 2) {
        return false;
    }
    if (simpleCache.has(n)) {
        return true;
    }

    for (let i = 2; i <= n / 2; ++i) {
        if (n % i === 0) {
            return false;
        }
    }
    simpleCache.add(n);

    return true;
}

// Sieve of Eratosthenes
// function getPrimes(n: number) {
//     const sieve = [, false]; // 1 - not prime
//     for (let i = 2; i < n; i++) {
//         sieve[i] = true;
//     }
//
//     for (let i = 2; i * i < sieve.length; i++) {
//         if (sieve[i]) { // Simple
//             for (let k = i * i; k < n; k += i) {
//                 sieve[k] = false;
//             }
//         }
//     }
//
//     return sieve.reduce((primes: number[], isSimple, i) => {
//         if (isSimple) {
//             primes.push(i);
//         }
//
//         return primes;
//     }, []);
// }