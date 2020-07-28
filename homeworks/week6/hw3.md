## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1.  `<code>...</code>`：當你想要打程式碼的時候，用這個包起來就可以把他列出來了！
2.  `<i>` ： 斜體字、  `<u>`：下底線、`<b>`：粗體
3.  `<hr>`： 會產生一條分隔線

## 請問什麼是盒模型（box model）

box model 可以想像成把一個 div 的區塊想像成一個盒子。  
這個盒子的組成是：  
1. 內容
2. padding：內容與邊界的距離
3. border：邊界
4. margin：邊界與盒子外的東西的距離

透過這四個屬性就可以讓我們決定這一個物件的跟其他物件的排版關係。 

`Note.`  box-sizing 大致分為兩種

1.  content - box：  
這個是預設值：元素寬 = content width + padding + border
2.  border - box：  
如果將 box-sizing 設為 border-box 時，此時 CSS 寫的寬度就是元素的寬度，無需再加上 padding or border，因為已經將 padding 以及 border 都包含在元素的寬度及高度裡面。  
## 請問 display: inline, block 跟 inline-block 的差別是什麼？
1. **Display block** ： div, p, h1~6 
    - 會自己佔一整行 
    - 要調整什麼都可以
2. **inline** ： a, span
    - 多個元素在一行裡面併排
    - 調整寬高、上下 margin 無效（因為寬高會根據內容顯示）
    - 左右 pedding 有效，上下 pedding 只會撐開元素，不會讓元素有所影響
3. **inline-block** ： botton, input, select
    - 可以併排而且什麼都可以調整

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
1. **static** ：  
預設的定位方式，元素將會依照著瀏覽器的配置自動地進行排列。
2. **relative**：  
基本上和 static 差不多，但是可以利用 top / bottom / right / left 等屬性來調整他的定位。
3. **absolute**：  
是一個一定要找到爸爸的元素，他會認最近的不是 static 的元素為爸爸（父元素）然後以父元素為起點可以利用 top / bottom / right / left 等屬性來調整他的定位。
4. **fixed**:  
和 relative 差不多，但是有不論頁面怎麼滑動他都還是會在那裡的特性！

