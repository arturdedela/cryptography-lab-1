
export function euler(m: number) {
    let result = m;

    for (let i = 2; i * i <= m; ++i) {
        if (m % i === 0) {
            while (m % i === 0) {
                m /= i;
            }
            result -= result / i;
        }
    }

    if (m > 1) {
        result -= result / m;
    }

    return result;
}