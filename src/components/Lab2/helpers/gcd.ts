
export function gcd(a: number, b: number) {
    while (b) {
        a %= b;
        [a, b] = [b, a];
    }

    return a;
}