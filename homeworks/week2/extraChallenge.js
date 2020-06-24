function Add(num1, num2)
{
    // write code here
    while(num2 !== 0){
        var temp = num1^num2;
        num2 = (num1 & num2) << 1;
        num1 = temp;
    }
    return num1;
}

Add(7,9)