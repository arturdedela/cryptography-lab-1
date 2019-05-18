
export function *range(m: number, n: number) {
    for (let i = m; i <= n; i++) {
        yield i;
    }
}