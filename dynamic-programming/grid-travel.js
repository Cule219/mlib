// given grid with m, n dimensions, determine how many ways there are to get from beggining(0, 0) to the end of the grid(len, len)
const gridTravel = (m, n, memo={}) => {
    const key = `${m},${n}`;
    if (memo[key]) return memo[`${m},${n}`];
    if (m === 1 || n === 1) return 1;
    memo[key] = gridTravel(m - 1, n, memo) + gridTravel(m, n - 1, memo);
    return memo[key];
}


console.log(gridTravel(2, 2)); // 2
console.log(gridTravel(2, 3)); // 3
console.log(gridTravel(3, 2)); // 3
console.log(gridTravel(3, 3)); // 6
console.log(gridTravel(18, 18)); // 2333606220

