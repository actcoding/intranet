export function parseHeadingLevel(value: string) {
    return parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6;
}
