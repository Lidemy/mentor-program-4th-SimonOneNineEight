## hw4：What is this?
> 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```javascript
const obj = {
  value: 1,

  hello: function() {
    console.log(this.value)
  },

  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
### 輸出結果：
2  
2  
undefined
  
### 運作方式：
1. `obj.inner.hello()` 可以看成是 `hello.call(obj.inner)` 這樣就是把 hello() 裡面的 `this` 設為 `obj.inner.value` 也就是 2，所以執行之後會 console.log 出 `2`
2. `obj2.hello()` 可以看成是 `hello.call(obj2)`，而 obj2 = obj.inner，所也整個就可以看成 `hello.call(obj.inner)`，這樣就和上面那一題完全一樣，所以輸出的值也會一樣是
`2`
3. 因為 `hello = obj.inner.hello`，所以我們知道 `hello()` 就等於 `hello: function() { console.log(this.value) }`。  
在執行 `hello()`的時候可以視為 `hello.call()`，因為在使用 call 的時候第一個 argument 就是這個 function 的 this 值，所以當我們沒有傳入值的時候 function 的 this 值就會是 `undefined`。