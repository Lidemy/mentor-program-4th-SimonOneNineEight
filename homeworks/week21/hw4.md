## 為什麼我們需要 React？可以不用嗎？

#### 爲什麼需要 React

React 幫助我們把每一個元件的屬性都直接綁在那一個元件上面，這樣操作元件的時候就不需要再用 querySelector 來選到 DOM 之後再加上 eventListener 進行操作這種複雜的操作；而是可以直接更改 State 就可以 render 出我們所想要的 virtual DOM。

另外利用 React 之後我們就需要注意 State 裡面擺放哪些資料，而不是利用原生的方式會需要同時改變儲存的資料同時要更改 UI 顯示的東西；這樣就可以避免儲存資料和 UI 顯示不統一的情況發生！

#### 可以不用 React 嗎？

當然可以啊！畢竟在框架流行之前大家也都是用 jQuery 在寫網站的，相信在不久的將來可能會有其他的開發方式，React 就會變得不流行了！就算是現在框架流行框架也都還有 Vue 和 Angular 等等很多人用得框架。所以不用 React 是完全沒問題啦～

## React 的思考模式跟以前的思考模式有什麼不一樣？

我覺得最大的不同從怎麼改變頁面變成了怎麼改變 State，之前不論是原生 JavaScript 或是 jQuery 我們都是把畫面刻出來之後利用 querySelector 和 eventListener 來對實體的 DOM 進行操作；但換成 React 之後思考的都是要怎麼設計自己的 State 跟 setState，而不會思考畫面會怎麼改變，因為對 React 來說畫面是隨著 State 變得，所以如果你的 State 弄好之後畫面自然就會好了！

## state 跟 props 的差別在哪裡？

State 是每一個 component 自己的資料，可以在 component 裡面自己宣告、自己改、自己用；但 props 是 component 的傳家寶，所以只能用，或是傳給下一代，但沒辦法更改或是丟掉！
