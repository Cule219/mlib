// Write a function `canSum(targetSum, numbers) that takes in a targetSum and an array of numbers as arguments.
// return bool indicating wheather or not it is possible to generate targetSum using numbers from the array.
// you may use an element of an array as many times as needed
// you may assume that all input numbers are nonnegative.

/*
example:
canSum(7, [5, 3, 4, 7]) => true
canSum(7, [2, 4]) => false
*/

// memoization
// function canSum(n, numbers, memo = {}) {
//     if(n in memo) return memo[n];
//     if(n === 0) return true;
//     if(n < 0) return false;
//     for(const num of numbers) {
//         const remainder = n - num;
//         if(canSum(remainder, numbers, memo)) {
//             memo[n] = true;
//             return true;
//         }
//     }
//     memo[n] = false;
//     return false;
// }

// tabulation
function canSum(n, numbers) {
    const table = Array(n + 1).fill(false);
    table[0] = true;
    for(let i = 0; i <= n; i++) {
        if(table[i]) {
            for(num of numbers) {
                if(i + num === n) {
                    return true;
                } else if(i + num < n) {
                    table[i + num] = true;
                }
            }
        }
    }
    return false;
}

// console.log(canSum(7, [2, 3])); // true
// console.log(canSum(7, [5, 4, 3, 7])); // true
// console.log(canSum(7, [2, 4])); // false
// console.log(canSum(8, [2, 3, 5])); // true
// console.log(canSum(300, [7, 14])); // false
// console.log(canSum(700, [7, 14])); // true


// howSum
// same as above but return an array representing how you get to the result
// in case of n = 0 return []

// memoization
// function howSum(n, numbers, memo = {}) {
//     if(n in memo) return memo[n];
//     if(n === 0) return [];
//     if(n < 0) return null;
//     for(const num of numbers) {
//         const remainder = n - num;
//         const remainderResult = howSum(remainder, numbers, memo)
//         if(remainderResult !== null) {
//             memo[n] = remainderResult;
//             remainderResult.push(num);
//             return remainderResult;
//         }
//     }
//     memo[n] = null;
//     return null;
// }

// tabulation
function howSum(n, numbers) {
    const table = new Array(n + 1).fill(null);
    table[0] = [];
    for(let i = 0; i <= n; i++) {
        if(table[i]) {
            for(num of numbers) {
                if(i + num === n) {
                    return [...table[i], num]
                } else if(i + num < n) {
                    table[i + num] = [...table[i], num];
                } else {
                    numbers.splice(i, 1);
                }
            }
        }
    }
    return table[n]
}

// console.log(howSum( 7, [5, 3, 4, 7])); // [3, 4] or [4, 3] or [7]
// console.log(howSum(300, [7, 14])); // null
// console.log(howSum(700, [7, 14])); // [7, 7, 7...]


// bestSum
// same as above but you always want the shortest sum

// memoization
// function bestSum(n ,numbers, memo = {}, shortest = null) {
//     if (n in memo) return memo[n];
//     if (n === 0) return [];
//     if (n < 0) return null;
//     for (const num of numbers) {
//         const remainder = n - num;
//         const remainderResult = bestSum(remainder, numbers, memo);
//         memo[remainder] = remainderResult;
//         if (remainderResult !== null) {
//             const combination = [...remainderResult, num];
//             if (combination.length < shortest?.length || shortest === null) {
//                 shortest = combination;
//             }
//         }
//     }
//     return shortest;
// }

// tabulation
function bestSum(n, numbers) {
    const table = new Array(n + 1).fill(null);
    table[0] = [];
    for(let i = 0; i <= n; i++) {
        if(table[i]) {
            for(let num of numbers) {
                const combo = [...table[i], num];
                if(!table[i + num] || table[i + num].length > combo.length) {
                    table[i + num] = combo;
                }
                
            }
        }
    }
    return table[n];
}

console.log(bestSum( 7, [5, 3, 4, 7])); // [7]
console.log(bestSum(300, [7, 14])); // null
console.log(bestSum(700, [7, 14])); // [14, 14, 14...]
console.log(bestSum(100, [1,2,5,25])); // [25, 25, 25, 25]


// same as canSum, but this time return number of unique ways you can sum up the array

function countSum(n, numbers) {
    const table = Array(n + 1).fill(null);
    table[0] = [];
    for(let i = 0; i <= n; i++) {
        if(table[i]) {
            for(num of numbers) {
                if(i + num <= n) {
                    table[i + num] = [...table[i], num].sort((a, b) => a - b);;
                }
            }
        }
    }
    return table[n];
}

// console.log(countSum( 7, [5, 3, 4, 7])); // [7]
// console.log(countSum(300, [7, 14])); // null
// console.log(countSum(700, [7, 14])); // [14, 14, 14...]
// console.log(countSum(100, [1,2,5,25])); // [25, 25, 25, 25]
