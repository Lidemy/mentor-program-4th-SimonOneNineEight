## 什麼是 Ajax？
Ajax 全名 Asynchronous JavaScript and XML，中文翻譯為「非同步的 JavaScript 與 XML 技術」，作用就是讓你可以在不用重新整理網頁的情況下，讓瀏覽器去和伺服器即時的溝通並且或許想要的資料！另外非同步則是可以讓 JavaScript 在執行的時候不需要等到 response 傳回來就可以繼續跑下面的程式，可以讓整個程式的運作更加流暢且快速！

## 用 Ajax 與我們用表單送出資料的差別在哪？
用 Ajax 送出資料的話可以在同一個網頁直接送出並且渲染出想要的樣子！但如果是用表單送出的話，就一定會開一個新的分頁才能拿到我們要的資料和網頁的樣貌。

## JSONP 是什麼？
JSONP 全名 JSON with Padding，他是一個非官方的協議，利用 JavaScript callback 的方式在 Server 端把想要的資料搜集成 tag 之後傳回 Client 端。

## 要如何存取跨網域的 API？
1. CORS：response 的 header 裡面會有一個 Access-Control-Allow-Headers，如果裡面允許你的 domain 存取就可以存取跨網域 API。
2. 用 JSONP 的方式繞過瀏覽器的限制取得跨網域 API 資料
3. 直接不要用瀏覽器，用 Node.js 等等其他的 runtime 來發 request
## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週沒有遇到跨網域的問題是因為是用 Node.js 這個 runtime 而不是用瀏覽器，在 Node.js 因為都是在自己的電腦執行，每個動作都是自己決定要做的所以不會有惡意攻擊的問題，所以就不需要有安全性的保護！  
但如果在瀏覽器上執行的話就有可能有人惡意攻擊網頁拿取資訊的問題，所以會需要一些協議來保護網站的資訊，所以在用瀏覽器的發 request 的時候才會有跨網域的問題！
