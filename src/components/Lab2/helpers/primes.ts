import { range } from "./range";

export function getPrimes(m: number) {
    const min = Math.min(m, 50000000);
    const primes = eratosthenes(min);

    if (min === m) {
        return primes;
    }

    return primes.concat(getPrimesInRange(min, m));
}

export function getPrimesInRange(from: number, to: number): number[] {
    const simples = [];
    for (const n of range(from, to)) {
        if (isPrime(n)) {
            simples.push(n);
        }
    }

    return simples;
}

export function isPrime(n: number) {
    if (n < 2) {
        return false;
    }

    const sqrtN = Math.sqrt(n);
    for (let i = 2; i <= sqrtN; ++i) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

// Sieve of Eratosthenes
export function eratosthenes(n: number) {
    // TODO: Try bitmask
    const sieve = [, false];
    for (let i = 2; i < n; i++) {
        sieve[i] = true;
    }

    for (let i = 2; i * i < sieve.length; i++) {
        if (sieve[i]) {
            for (let k = i * i; k < n; k += i) {
                sieve[k] = false;
            }
        }
    }

    return sieve.reduce((primes: number[], isSimple, i) => {
        if (isSimple) {
            primes.push(i);
        }

        return primes;
    }, []);
}