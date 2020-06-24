function reverse(str) {
    let result = ""
    let length = str.length
    for(let i = 0; i < length;i++){
        result += str.charAt(length - i - 1)
    }
    return result
}

console.log(reverse('yoyoyo'));
