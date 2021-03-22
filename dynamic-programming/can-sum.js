// Write a function `canSum(targetSum, numbers) that takes in a targetSum and an array of numbers as arguments.
// return bool indicating wheather or not it is possible to generate targetSum using numbers from the array.
// you may use an element of an array as many times as needed
// you may assume that all input numbers are nonnegative.

/*
example:
canSum(7, [5, 3, 4, 7]) => true
canSum(7, [2, 4]) => false
*/


function canSum(n, arr, memo = {}) {
    if(arr.includes(n)) return true;
    for(const num of arr) {
        if(n - num > 0) {
            memo[n - num] = canSum(n - num, arr, memo);
            return memo[n - num];
        }
    }
    return false;
}

console.log(canSum(7, [2, 4]));