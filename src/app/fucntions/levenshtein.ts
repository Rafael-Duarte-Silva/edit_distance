export const levenshtein = (
    s1: string | undefined,
    s2: string | undefined,
): { matrix: number[][]; result: number } => {
    if (!s1 || !s2) {
        return { matrix: [], result: 0 };
    }

    const s1Size: number = s1.length;
    const s2Size: number = s2.length;

    const dp: number[][] = new Array(s1Size + 1)
        .fill(0)
        .map(() => new Array(s2Size + 1).fill(0));

    for (let i: number = 0; i <= s1Size; i++) {
        dp[i][0] = i;
    }

    for (let i: number = 0; i <= s2Size; i++) {
        dp[0][i] = i;
    }
    console.table(dp);

    for (let i: number = 1; i <= s1Size; i++) {
        for (let j: number = 1; j <= s2Size; j++) {
            const cust: number = s1[i - 1] == s2[j - 1] ? 0 : 1;

            dp[i][j] = Math.min(
                dp[i - 1][j] + 1, // remove
                dp[i][j - 1] + 1, // insert
                dp[i - 1][j - 1] + cust, // replace
            );
        }
    }
    console.table(dp);

    return { matrix: dp, result: dp[s1Size][s2Size] };
};

