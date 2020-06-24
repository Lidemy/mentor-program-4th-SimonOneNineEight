function join(arr, concatStr) {
    let result = ""
    for (let i = 0; i < arr.length-1; i++ ){
        result += (arr[i]+concatStr)
    }
    result += arr[arr.length-1]
    return result
}

function repeat(str, times) {
    let result = ""
    for(let i = 1; i <= times; i++){
        result += str
    }
    return result
}

console.log(join(['a','b','c'], '!'));
console.log(repeat('a', 5));
