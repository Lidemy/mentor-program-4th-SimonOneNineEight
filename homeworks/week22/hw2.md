## 請列出 React 內建的所有 hook，並大概講解功能是什麼

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

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
