## 什麼是 DOM？
  因為世界上流通的瀏覽器多個，如果每一個瀏覽器編譯網頁程式的方式都不同的話，工程師就很難寫出符合所有瀏覽器使用的網頁，所以 W3C 就提出了 DOM 讓每個瀏覽器開發公司可以依照這一套定義來製作他們的瀏覽器，也讓他們的瀏覽器可以支援更多的網頁！  
   
  DOM 的全名是 Document Object Model，是一個把所有的 HTML 標籤都標籤都定義為物件，並且把這些物件依照階層關係組成樹狀行的一個模型。
    
  利用 DOM 我們可以抓出在 HTML 裡面所需要的節點（node）並且賦予這些節點網頁工程師們希望的操作。


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞機制就是每當我們做一個動作時，事件其實會從最底層的 document 一路順著節點來到我們希望它運作的地方，在運做完之後他就會重新的在往上傳到最上層的 document。  
  
而捕獲階段就是當事件從最上層走到最下層的時候，當事件傳到目的本身時，我們稱之為 AT_TARGET，而最後從事件本身走回最上層的階段稱之為冒泡階段。

Note. 口訣：先捕獲，在冒泡

## 什麼是 event delegation，為什麼我們需要它？

Event delegation 是一種受惠於冒泡階段而可以減少 Event listener 的方法。當我們在一段程式碼中需要用到大量重複的 Event listener 的時候就可以用 Event delegation 來節省時間。

舉例來說將 click 事件綁在 parent 上，藉由 Event Bubbling 傳遞給 child，而非直接將事件綁定在 child 上。優點是可減少監聽器的數目，缺點是由於需要判斷哪些 child node 是我們需要的項目，而必須多寫一些程式碼做判斷。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault()就是終止預設行為(Stop Event Flow)；以「超連結」為例，瀏覽器看到頁面上有超連結，只要偵測到超連結被點擊到，隨即會幫我做「導向連結」的動作，「導向連結」即是超連結的預設行為但當我們使用了event.preventDefault()，此時hyper就不再為我們進行導頁的動作，因為我們已經停止了他的預設行為（連到超連結網頁）。

event.stopPropagation()則是有時候我們是不希望「事件冒泡」發生在程式碼中，所以才有了event.stopPropagation()函式來阻止事件繼續冒泡。
