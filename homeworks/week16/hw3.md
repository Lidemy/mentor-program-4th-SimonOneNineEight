## hw3：Hoisting
> 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```JavaScript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++ 
  var a
  fn2()
  console.log(a) 
  function fn2(){
    console.log(a) 
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
### 輸出結果：
undefined  
5  
6  
20  
1  
10  
100
  
### 運作方式：
1. 開始執行程式，開啟 global 的 execute content，裡面包含了 global 的 Variable Object ( 簡稱 VO )
```javascript
global VO {  
  a: undefined
  fn: fn(){...省空間就不貼過來了}
}
```
2. 一路執行到第 15 行，此時 global VO 變成  
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
}
```
3. 開始執行 `fn()`，開啟 `fn() 的 EC`，底下會有一個 fn() 的 Active Object ( 簡稱 AO )
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
}

fn() AO {
  a: undefined
  fn2(): fn(){...省空間就不貼過來了}
}
```
4. 在 `fn()` 的第一行看到 `console.log(a)`，這個時候回去找 fn() 的 AO 裡面的 a，值為 undefined，所以印出 `undefined`，繼續往下執行
5. 看到 `a = 5` 把 fn() AO 裡面的 a 改成 5 
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
}

fn() AO {
  a: 5
  fn2(): fn2(){...省空間就不貼過來了}
}
```
6. 看到 `console.log(a)`，在 fn() AO 找到 a = 5，所以印出 `5`
7. 看到 `a++` 把 fn() AO 裡面的 a 改成 6 
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
}

fn() AO {
  a: 6
  fn2(): fn2(){...省空間就不貼過來了}
}
```
8. 看到 `var a`，但 fn() AO 裡面已經存在 a 所以略過
9. 開始執行 `fn2()`，開啟 `fn2() 的 EC`，底下會有一個 fn2() 的 AO
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
  b: undefined
}

fn() AO {
  a: 6
  fn2(): fn2(){...省空間就不貼過來了}
}

fn() AO {
  空的
}
```
10. fn2() 的第一行 `console.log(a)`，但 fn2() 的 AO 裡面沒有 a，所以往上找到 fn() 的 AO 裡 a = 6，所以印出 `6`
11. 看到 `a = 10` ，但 fn2() 的 AO 裡面沒有 a，所以往上找到 fn() 的 AO把 fn() AO 裡面的 a 改成 10
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
  b: undefined
}

fn() AO {
  a: 10
  fn2(): fn2(){...省空間就不貼過來了}
}

fn() AO {
  空的
}
```
12. 看到 `b = 100` ，但 fn2() 的 AO 裡面沒有 b，所以往上找到 fn() 的 AO，但裡面也沒有 b，所以再往上找到 global 的 VO 有開始 fn2() 的時候宣告的 b，把他的值設為 100
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
  b: 100
}

fn() AO {
  a: 10
  fn2(): fn2(){...省空間就不貼過來了}
}

fn() AO {
  空的
}
```
13. fn2() 執行完畢，fn2() 的 EC 和 AO 同時刪除 
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
  b: 100
}

fn() AO {
  a: 10
  fn2(): fn2(){...省空間就不貼過來了}
}
```
13. fn() 執行完畢，fn() 的 EC 和 AO 同時刪除 
```javascript
global VO {  
  a: 1
  fn: fn(){...省空間就不貼過來了}
  b: 100
}
```
14. 看到 `console.log(a)`，在 global VO 找到 a = 1，所以印出 `1`
15. 看到 `a = 10 ` 把 global VO 裡面的 a 改成 10
```javascript
global VO {  
  a: 10
  fn: fn(){...省空間就不貼過來了}
  b: 100
}
```
16. 看到 `console.log(a)`，在 global VO 找到 a = 10，所以印出 `10`
17. 看到 `console.log(b)`，在 global VO 找到 b = 100，所以印出 `100`
18. 程式執行完畢，刪掉 global EC