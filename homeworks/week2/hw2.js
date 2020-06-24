function capitalize(str) {
    let result = ""
    //把字首變成大寫
    if( str[0] >= "a" && str[0]<= "z"){
        result += str.charAt(0).toUpperCase()
    } else {
        result += str.charAt(0)
    }
    //把其他的字母印回去
    for(let i = 1; i < str.length; i++){
        result += str.charAt(i)
    } 
    return result
}

console.log(capitalize('Nick'));
