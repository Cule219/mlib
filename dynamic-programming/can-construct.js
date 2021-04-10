// Write a fn canConstruct that accepts a target string and an array of strings
// return a bool indicating if the target can be constructed by concatinating words in the array, you may reuse the words in the array

// memoization
function canConstruct(target, strings, memo={}) {
    if(target === '') return true;
    if(target in memo) return memo[target];
    for(let str of strings) {
        if(target.indexOf(str) === 0) {
            const sufix = target.slice(str.length);
            if(canConstruct(sufix, strings, memo)) {
                memo[target] = true;
                return true;
            }
        }
    }
    memo[target] = false;
    return false;
}

// tabulation
function canConstruct(target, strings) {
    const table = Array(target.length).fill(false);
    table[0] = true;
    for(let i = 0; i <= target.length; i++) {
        
    }
}

// console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
// console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // false
// console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']))
// console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])) // false

// count number of ways in which we can build the target
function countConstruct(target, strings, memo={}) {
    if (target === '') return 1;
    if(target in memo) return memo[target];
    let count = 0;
    for(let str of strings) {
        if(target.indexOf(str) === 0) {
            const suffix = target.slice(str.length);
            count += canConstruct(suffix, strings, memo);
        }
    }
    memo[target] = count;
    return count;
}

// console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // true
// console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']))
// console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])) // false

// write a fn allConstruct which returns all the ways in which we can build the string
function allConstruct(target, strings, memo={}) {
    if(target === '') return [[]];
    if(target in memo) return memo[target]
    let solutions = []
    for(let str of strings) {
        if(target.indexOf(str) === 0) {
            const suffix = target.slice(str.length);
            memo[suffix] = allConstruct(suffix, strings, memo);
            solutions.push(...memo[suffix].map(arr => [str, ...arr]));
        }
    }
    memo[target] = solutions;
    return solutions;
}

console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])); // true
