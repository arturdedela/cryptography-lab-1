
export function swap(s: any[], i: number, j: number) {
    const tmp = s[i];
    s[i] = s[j];
    s[j] = tmp;
}