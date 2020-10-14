## hw1：Event Loop
>在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

### 輸出結果：
1  
3  
5  
2  
4  

### 運作方式：
1. JavaScript 開始執行第 1 行，印出 `1`
2. JavaScript 開始執行第 2 行，看到 `setTimeOut(cb, 0)`，所以決定等 0 毫秒再把 `console.log(2)` 放入 Event Queue
3. JavaScript 開始執行第 5 行，印出 `3`
4. JavaScript 開始執行第 6 行，看到 `setTimeOut(cb, 0)`，所以決定等 0 毫秒再把 `console.log(4)` 放入 Event Queue
5. JavaScript 開始執行第 9 行，印出 `5`
6. 主執行環境的程式執行完畢，開始執行 Event Queue，依序在 console 上印出 `2`, `4`