
const search = (arr,n) => {
    let indexHead = 0
    let indexLast = arr.length - 1
    while(indexHead <= indexLast){
        let indexMid = parseInt((indexHead + indexLast)/2,10)
        if (arr[indexMid]=== n){
            return indexMid
        } else if (arr[indexMid] > n){
            indexLast = indexMid - 1
        } else {
            indexHead = indexMid + 1 
        }
    }
    return -1
}

console.log(search([1, 3, 10, 14, 39], 14))