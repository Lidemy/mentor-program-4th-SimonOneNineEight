## 為什麼我們需要 Redux？

原本在寫 React 的時候，因為整個 react 都是圍繞著 state 在前進的，所以就會有 state 散落各地的情況發生，這樣就會發生當我們做一個會改動很多 state 的動作的時候，就需要到每一個 state 的所在地把它傳到我們要用的地方或者是在散落各地的地方更改 state，所以 Redux 的出現就幫我們把很多的 state 全部都聚集在一個 store 裡面，讓我們可以把要改的 state 集中在一起，不用到處改，然後在需要的地方把這些 state 叫出來用就好了！  
另外如果出現 Bug 的話，我們也會比較好找出是在哪裡一個步驟出錯然後修正！不過缺點就是整個專案會變得複雜蠻多的，所以如果是小專案的話很容易覺得 Redux 很麻煩；但如果專案是那種 Debug 起來會很麻煩的大小，那用 Redux 來管理 State 就會利大於弊啦～

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一個利用 flux 架構建構起來的狀態管理的 Library。

#### Redux 的基本元件

1. store： store 是我們擺放我們所有 state 統一管理的地方，我們稱為 state，因為是統一管理的地方，所以一個專案只會有一個 store。
2. reducer: 是一個會接收到 action 的指令來控制 store 裡面相應的 state 的東西。
3. action: 如果要改變 store 裡面的 state，就只能透過 dispatch 的方式來傳送 action 給 reducer，所以可以把 action 看作是 state 唯一的資訊來源！

#### Redux 的資料流

Redux 的資料流是非常嚴格的單向資料流！他只能把你要做的 action 透過 dispatch 的方式傳送給 reducer，之後 reducer 再把新的 state 儲存在 store 裡面 。

## 該怎麼把 React 跟 Redux 串起來？

1. 用 npm 或是 yarn 安裝 redux 套件
2. 用一樣的方法安裝 react-redux 套件
3. 建立一個 store
4. 建立 reducer
5. 如果有很多個 reducer 就要建立 combineReducer
6. 如果預期會有很多 action 的話可以建立 actionType 來避免未來在使用 action 的時候打錯字但又找不到哪裡錯的情況發生。
7. 建立 actions
8. 建立 selector 來方便拿取 store 裡面的資料（非必要）
9. 在 React 的 index.js 裡面用 Provider 包住整個 App
10. 在需要用的 state 的地方用 useSelector 拿出 state，之後在需要改變 statec 的地方引入 useDispatch 跟會用到的 action 之後就可以用 `dispatch(action())` 來改變 state。

```javascript
import { createStore, combineReducers } from 'redux'

//建立 store
createStore(rootReducer)

//建立 reducer
const sumReducer = (state=initalState, action) => {
  //在 reducer 裡面用 actionType 來決定要執行哪一個動作，通常會用 switch case 的方法來寫，然後拿 action.payload 裡面的參數來用
  switch(action.type){
    case ADD : {
      return state + action.payload.number
    }
    default: {
      return state
    }
  }
}
// 建立 combineReducers
const rootReducer = combineReducers({
  sum, ...
})
// 建立 actionTypes
const ADD = 'add'
// 建立 actions
const add = () => {
  type: 'ADD'
  payload: {
    number: 30
  }
}
//建立 selector
const getCount = (store) => store.sum.sum
```

現在轉移到 index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```
