## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
其實 VARCHAR 跟 TEXT 大部分是一樣的，在儲存文字的時候都可以使用，但是 VARCHAR 可以限制長度，但是 TEXT 不行！
另外如果設定 VARCHAR 在合理的長度範圍的話，他的儲存讀取速度會比 TEXT 速度快，所以應該要盡量使用 VARCHAR ，只有在真的不知道最長長度的時候才用 TEXT。


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是一個讓 session 機制更容易實現的工具，他讓 session 不用透過網址或是在 form 裡面加上 hidden 的欄位等複雜或是不安全的方式執行。
Cookie 本身是一個小型文字檔，在 HTTP 當中，Server 可以透過Set-cookie 這個 response header 把 session 資料回傳給瀏覽器讓瀏覽器可以在下次發 request 的時候放在 request header 裡面夾帶到 Server 裡面去，這樣 Server 就可以知道這一個 request 的一些資本資料，從而達到 session 的目的！


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 現在的使用者密碼沒有限制長度或者大小寫等等，讓這些密碼很容易被猜出來！
2. 好像大部分的網站登入的時候都需要做驗證，但是我們沒有做！

