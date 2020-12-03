## 請列出 React 內建的所有 hook，並大概講解功能是什麼


#### useState

讓 function Component 可以擁有自己的 React State

#### useEffect

在第一次 render 畫面之後執行的來處理 sideEffect 的 Hook。適合放像是 fetch 這種不需要在每一次 render 都呼叫的功能。但第二個參數可以傳入一個陣列來控制在哪些東西改變之後要 call 這個 hook。

#### userLayoutEffect

和 useEffect 有 87% 像，只是 useLayoutEffect 是在第一次 render 之前執行，useEffect 則是在第一次 render 之後執行。

#### useContext

在我們有很多層 Components 的時候用來避免一直傳一樣的 props (aka prop drilling) 用的 hook。只要用 Context.Provider 把 component 包住，在裡面的子元件就可以直接用 useContext 把 props 拿出來用。

#### useReducer

跟 react 很像，都是宣告一個陣列，利用第二項改變第一項的 state 的 Hook，只是 useReducer 會先把改變的方式寫成一個 reducer 的 function，裡面用 case 來寫出所有功能，這樣在呼叫的時候只要使用 `dispatch({type: 想要的功能})` 就可以順利的更改 state。

#### useCallback

因為每次 re-render 的時候電腦都會把 components 重新分配到記憶體裡面，但有些功能是不會因為某些 state 的改變而改變，所以可以不需要每次都重新分配記憶體位置。  
這時候就可以用 useCallback 把它包起來，這樣就可以避免他在每個 state 改變 re-render 的時候都重新分配記憶體位置，而是和 useEffect 一樣，只有在第二個參數陣列裡面的 state 改變的時候才會 re-render，有節省效能的功用。

#### useMemo

讓 React 記住 function return 的值，如果 function dependency 沒有改變的話就不會重新運算，通常會用來包住複雜的運算，一樣是優化效能用的 Hook。

#### memo

好像不是 hook 可是跟 useCallback、useMemo 同為 React 效能優化好工具。當父元素有改變但是沒有改變到傳給子元素的 props 的時候，如果有用 memo 包住子元素，就可以避免他 re-render，達到節省效能的目的。

#### useRef

讓我們可以抓到 Dom 上面的資料的 Hook，在 component 裡面寫上 ref={...} 就可以讓我們抓到那個 Dom 裡面的值。  
`Note.` Ref 改變的時候不會 re-render

#### useImperativeHandle

讓子元件裡面的 function 透過 ref 的方式傳給父元件使用的 Hook。

#### useDebugValue

用來在 React DevTools 中顯示自訂義 hook 的標籤的 Hook。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

React 的 Lifecycle 大致分成三個部分 Mounting 、 Updating 跟 UnMounting，但是只有在使用 Class Component 的時候才會自帶 lifecycle，如果是使用 Function Component 的話則需要配合 Hook 的使用 React 才會擁有生命週期。

#### Mounting

Mounting 會在 components 被建立的時候執行

執行的時候會經過：

1. Constructor（初始化）
2. static getDerivedStateFromProps(props, state)：  
   在 component 被 render 之前執行，他會回傳一個 Object 用來更新 State，或是回傳 null 表示 State 不需要更新。
3. render：  
   這是整個 class component Lifecycle 裡面唯一必要的步驟，當 render 被呼叫之後會回檢視 this.props 和 this.state 裡面的變化，然後回傳資料後渲染出畫面。

   執行 render 實不應該改變任何 component 的 state，應該要讓每次執行 render 都回傳同樣的結果。如果要和瀏覽器互動的話應該要寫在其他 lifecycle 的階段當中。

4. componentDidMount（DOM 掛載完畢）：  
   會在 Component 被 Mount(加到 DOM tree 中)後馬上執行，很適合在這裡 fetch 資料。

#### Updating

當 Prop 或 State 產生變化的時候就會產生 Update

執行的時候會經過

1. static getDerivedStateFromProps(props, state)
2. shouldComponentUpdate()：  
   讓 React 知道一個 component 的 output 並不會被目前在 state 或 prop 內的改變所影響，所以阻止這一次的 Re-render，這樣做可以提升效能。
3. render
4. componentDidUpdate()：  
   和 componentDidMount() 一樣的作用，但是不會在第一次 render 的時候被呼叫

#### Unmounting

當一個 component 被從 DOM 中移除時，這個方法將會被呼叫：

componentWillUnmount()：  
 會在ㄧ個 component 被 unmount 和 destroy 後馬上被呼叫。你可以在這個方法內進行任何清理 (e.g. 清理計時器等等）

## 請問 class component 與 function component 的差別是什麼？

#### class component

用物件導向的方式，以 extend class 的方式建立 component。他在 constructor 裡定義 state，在使用 state 和 props 的時候都需要使用到 this 來指向的 component，最後再用 render 來回傳要顯示在畫面上的內容，並且用 lifecycle 的 method 來決定 render 前後要執行的內容。

#### function component

和原生的 JavaScript 比較接近，用 一個傳入 props 的 function 的方式來建立 component，在 function 裡面用 useState 來定義並且使用 state，用 useEffect 來處理 render 前後要執行的內容，並且用其他的 Hook 來輔助 function 的效能，最後用整個 function return 的值還決定要顯示在畫面上的內容。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用

#### uncontrolled conponent

是指不被 React 控制的 component，只有在需要用到它的值的時候我們才會用 ref 的方式拿到那個 DOM 上面的值。

#### controlled component

跟上面相反就是被 React 控制的 component，會用一個 state 來儲存 component 的值，然後用 setState 來改變它。這樣的元件比較好隨時了解他現在的值是什麼，而且也不會因為 re-render 造成原本儲存的值不見。

#### 何時使用？

基本上可以全部都使用 controlled component，畢竟 React 就是跟著 State 來跑的一個框架，所以把會改變的東西都用 State 來存起來，這樣才會遵守改變資料畫面就改變的原則，而不會有畫面改變了資料卻沒變這種不統一的情況發生。
