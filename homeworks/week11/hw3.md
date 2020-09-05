## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
  1. 雜湊（Hash）：
    雜湊通常是把不同長度也不同內容的文字轉換成一串有相同長度且不可逆的文字，並且為雜湊是多對一的，所以可能輸入不同的文字卻雜湊出一樣的結果。常用於只需要驗證而不需要還原的時候（e.g. 密碼驗證）。
  2. 加密 (Encrypt)：
    加密則是把字串中的每一個字母利用一定的密鑰進行處理，因此加密過後的文字長度會隨著加密前的文字長度不同而不同。另外，加密前後為一對一的狀態，輸入不同的字串就一定會加密出不同的文字，而且通常可以通過解密的方式還原為原本的樣子。所以如果被保護的資料需要被還原時，則會使用加密而非雜湊。
  3. 差別：
    這兩者的初始用意都是要保護文字，不讓別人輕易解讀。不同的點就是雜湊為多對一，所以一串雜湊後的文字可能是由很多個輸入轉換而來，因此無法猜出原本的輸入是什麼；但是加密則是一對一的關係，所以加密過後的文字是一定可以被還原的！

## `include`、`require`、`include_once`、`require_once` 的差別
  1. `include`：  
  使用 include 語句在 php 檔案中引入特定的檔案，並載入它的全部內容，在 php 程式碼中如果有使用到 include 檔案裡的東西時，php 就會去讀取 include 檔案並使用裡面的內容。但不論是否已經引入過待檔案，只要使用 include 指令，php 就會再次引入檔案，整個 php 檔就會直接壞掉。
  2. `include_once`：  
  php 會先去檢查在這個檔案中有沒有曾經 include 或 include_once 過這個檔案，如果有的話就會自動忽略掉這一行指令，就不會有引入兩次所以發生錯誤的情況發生。
  3. `require`：  
  require 則是在一開始就會直接讀取 require 檔案的內容並且把它變成自己的程式碼，所以在 php 程式碼跑到 require 裡面的東西的時候就會直接繼續跑下去，不用再重新跑一次 require 檔案，所以如果會常用到引入檔案的內容的時候，使用 require 會讓效能更好。  
  另外 require 和 include 另一個不一樣就是，當找不到要 require 的檔案的時候，會直接終止整個程式，而 include 則是只會有警告，但仍繼續執行下面的程式碼。
  4. `require_once`：  
  和 require 的功能相同，但一樣會檢查是不是曾經引入過這個檔案，如果有的話就會自動忽略掉這一行指令，就不會有引入兩次所以發生錯誤的情況發生。


## 請說明 SQL Injection 的攻擊原理以及防範方法

### SQL Injection 原理
SQL Injection 的本質就是把「 輸入的惡意資料」 變成「 程式的一部分 」，也就是說駭客可以在輸入資料的時候用一些惡意字串竄改 SQL 語法，以偷取、假冒別人資料或刪除資料庫裡的資料

e.g.   
帳號： ‘ or 1=1 –  
密碼： 隨便什麼都可以

這樣的話 sql 就會變成：
SELECT * FROM users WHERE user='' or 1=1 --' AND pwd ='隨便什麼都可以';   
因為 1=1 永遠是 true 而且 -- 之後的字會變成註解，所以攻擊
者就可以直接登入啦！

### SQL Injection 防範方法：
Prepare Statement ： 
有了 Prepare Statement 之後，Sql 就會把 bind 進去的變數當成是字串，所以就不會當成程式碼執行，也就可以避免掉影響 query 的情況啦！

##  請說明 XSS 的攻擊原理以及防範方法
### XSS 攻擊原理：  
在 input 的欄位中輸入 JavaScript 的語法，因為系統會直接把`<script></script>`的內容放到 HTML 裡面，所以瀏覽器就會以為你是在對他下 JavaScript 的指令所以就直接執行那行指令！常見的用法有利用 `location` 讓使用者在點進這個網站的時候就直接跳轉到其他釣魚網站或是用 document.cookie 來偷取你的 sessionId 和使用者身份等等！

### XSS 防範：  
要防範 XSS 就只在輸出的時候讓瀏覽器知道瀏覽器要 render 的這串的是字串而不是 HTML 標籤就可以了！所以在提取資料到瀏覽器的時候，會利用 `Htmlspecialchars` 來讓一些敏感的符號轉變成別的形式（e.g. > 變成 &gt ），這樣瀏覽器就會知道他們是字串而不是程式碼，也就不會執行下去讓攻擊者得逞啦！

## 請說明 CSRF 的攻擊原理以及防範方法

### CSRF原理：  
CSRF 全名是 `Cross Site Request Forgery`，他是一個利用你還沒有過期的 cookie 偷取你已經登入的身份，讓你在使用不同 domain 的時候再不知情的情況下發送 request 來執行攻擊者想要你做的事情。

### CSRF 防範：   
#### Client 端： 
記得在每次使用完之後登出就可以避免 CSRF 的問題產生。（ 但其實主要應該是 Server 端要處理這個問題 ）  
#### Server 端：  
  ##### 檢查 referer：  
  可以從 request 的 referer 來檢查 request 是從哪裡沒的。如果他是從不合法或是惡意網站的話就直接 reject 掉就好了。  
    
  缺點：   
    - 些瀏覽器可能不會帶 referer  
    - 有些使用者可能會關閉自動帶 referer 的這個功能，這時候你的 server 就會 reject 掉由真的使用者發出的 request。  
    - 判定是不是合法 domain 的程式碼必須要保證沒有 bug

  ##### 加上圖形驗證碼、簡訊驗證碼等等  
  這是非常完善的方法，因為他收不到簡訊也看不到你的圖片。

  缺點：  
  比較費時，所以如果在簡單的功能上加圖形或簡訊驗證使用者應該會感到很困擾。
  ##### 加上 CSRF token  
  在 form 裡面加入一個叫 token 的 hidden 欄位，他的值是由 server 亂數給他的。這樣在按下 submit 的時候去比對這個 token 跟 sessionId 就可以知道是不是真的是由使用者發出的 request。  
  
  缺點：  
    如果你的 server 支援 cross origin 的網站中包含攻擊者的網站，他就可以透過他的網站拿到 token 進行攻擊了。

  ##### Double Submit Cookie
  和上一個方法相同，但是同時在 client 端也設定一個 cookie 裡面也存一個 CSRF token。這樣在 submit 的時候，只要比對 server 上的 token 跟 cookie 上的 token 就可以知道是不是同一個使用者。

  缺點：  
  如果攻擊者掌握了其中一個 sidedomain 就可以寫 cookie 來攻擊你了。

  ##### Browser 本身的防禦：
  在這是 session 的時候後面加 samesite  
  >Set-Cookie: foo=bar; SameSite

  這樣這個 cookie 就只有在同一個 domain 之下發的 request 才會被加上去。

  缺點：  
  所有的 `<a href="">`, `<form>`, `new XMLHttpRequest` 的 request 都不會帶上登入的 cookie，所以使用者會常常需要重新登入，造成使用者體驗不佳。

  缺點解決：
  >Set-Cookie: foo=bar; SameSite=LAX  
  
  這樣的話瀏覽器就會放寬 SameSite 的限制，只限制 POST, PUT, DELETE 等等的方法。這樣就可以保有登入的彈性，但有可以防止 CSRF 的攻擊。