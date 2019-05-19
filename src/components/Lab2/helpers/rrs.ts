import { gcd } from "./gcd";

// Reduced residue system | приведенная система вычетов
export function rrs(m: number, from: number = 0, to: number = m): number[] {
    const res = [];

    for (let i = from; i < to; ++i) {
        if (gcd(i, m) === 1) {
            res.push(i);
        }
    }

    return res;
}