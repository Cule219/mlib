// given grid with m, n dimensions, determine how many ways there are to get from beggining(0, 0) to the end of the grid(len, len)

// memoization
// const gridTravel = (m, n, memo={}) => {
//     const key = `${m},${n}`;
//     if (memo[key]) return memo[`${m},${n}`];
//     if (m === 1 || n === 1) return 1;
//     memo[key] = gridTravel(m - 1, n, memo) + gridTravel(m, n - 1, memo);v
//     return memo[key];
// }

// tabulation
const gridTravel = (m, n) => {
    const table = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)); // Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    table[1][1] = 1;
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            const current = table[i][j];
            if (j + 1 <= n) table[i][j + 1] += current;
            if (i + 1 <= m) table[i + 1][j] += current;
        }
    }
    return table[m][n];
}


console.log(gridTravel(2, 2)); // 2
console.log(gridTravel(2, 3)); // 3
console.log(gridTravel(3, 2)); // 3
console.log(gridTravel(3, 3)); // 6
console.log(gridTravel(18, 18)); // 2333606220

