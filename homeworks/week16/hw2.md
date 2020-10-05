## hw2：Event Loop + Scope
>請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```JavaScript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
### 輸出結果：
i: 0  
i: 1  
i: 2  
i: 3  
i: 4  
5  
5  
5  
5  
5
  
### 運作方式：
1. 在 global 的 `Variable object` 宣告 `i` 值為 `undefined`
2. 開始迴圈，設 `i` 值為 `0` ，因為 `0 < 5`，迴圈繼續
3. 看到 `console.log('i:', i)` ，印出 `i: i`
4. 看到 `setTimeOut()`所以開啟新的`Execute content`，往下執行看到 `i * 1000` 在自己的 `Active Object` 找不到 `i` 所以上找在 global 的 VO 找到 `i = 0`，設定在 `i * 1000 毫秒`後把 `console.log(i)` 加入 Event Queue
5. 設 i 的值為 i + 1，回到步驟 2. 
6. 重複步驟 2. & 3. & 4. 直到 `i = 5`，不符合 `i < 5` ，所以跳出迴圈
7. 將前面第一次迴圈 `setTimeOut()` 的 function `console.log(i)` 加入 Event Queue 並執行，而因為這個時候迴圈已經整個跑完，所以 global 的 VO 中的 `i ＝ 5`，所以印出 `5`
8. 在 1000 毫秒後， 將前面第二次迴圈 `setTimeOut()` 的 function `console.log(i)` 加入 Event Queue 並執行，和步驟 7. 一樣的原因，所以印出 5，結束 `setTimeOut()`，清除這一個 function 的 EC
9. 在 2000 毫秒後， 將前面第三次迴圈 `setTimeOut()` 的 function `console.log(i)` 加入 Event Queue 並執行，和步驟 7. 一樣的原因，所以印出 5，結束 `setTimeOut()`，清除這一個 function 的 EC
10. 在 3000 毫秒後， 將前面第四次迴圈 `setTimeOut()` 的 function `console.log(i)` 加入 Event Queue 並執行，和步驟 7. 一樣的原因，所以印出 5，結束 `setTimeOut()`，清除這一個 function 的 EC
11. 在 4000 毫秒後， 將前面第五次迴圈 `setTimeOut()` 的 function `console.log(i)` 加入 Event Queue 並執行，和步驟 7. 一樣的原因，所以印出 5，結束 `setTimeOut()`，清除這一個 function 的 EC
12. 結束程式，清除 global 的 EC