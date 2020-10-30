## 什麼是反向代理（Reverse proxy）？
#### 代理（proxy)
Proxy 的作用就是把 client 跟 server 區隔開來，讓所有的 request 和 response 都必需要經過 Proxy。因此對外面網路世界中的 client 和 server 都只看的到這道牆，而看不到對方。

#### 正向代理 (forward proxy)
正向代理就是讓所有對 server 發出 request 的 client 都先發到 proxy，再經由 proxy 處理之後發給 server，同樣的 server 在發 response 的時候也是發給 proxy，然後由 proxy 發回給 client。這樣可以讓 server 不知道到底是哪個 client 發出來的 request 而達到保護使用者的目的。

##### 優點：
1. 匿名: 就像上面說的，server 不知道是誰發的 request，所以就不會出現不同 client 給不同回覆的情況，client 的資料也比較不會被 server 拿走！

2. 過濾: 可以直接過濾掉不該發給 server 的 request（e.g. 惡意攻擊），也可以過濾掉不該發給 client 的 response（e.g. 未成年不可以看到 18 禁內容）。

3. 統計: 可以統計所有的 request，了解大家都發了什麼樣的 request 給 server。

4. 可以改變request（e.g.改變header, 加解密等等）: 如果 request 內容不齊全，可以在 proxy 把它補進預設的內容再傳給 server。

5. Caching: 一樣的 request 就可以不用經過 server 跑這麼多次，直接讀取 proxy 的 cache 就可以解決。

#### 反向代理 (reverse proxy)
反向代理和正向代理相反，是讓每個 request 都傳到 proxy 之後才決定要發給哪一個 server，已達到讓 client 不知道 server 是誰的目的。

##### 優點：
1. 分攤 Loading : Proxy 可以依照哪個 server 處理最少事情而將 request 發到他那邊，這樣可以避免特定 server 超載的問題。

2. Caching: 同上

3. 你的server可以做任何你想做的事而不用讓Client知道（e.g. 今天想要換 port 也只要跟 proxy 說就好，不用讓每個 client 都知道）

## 什麼是 ORM？
ORM，英文叫 Object Relational Mapping，中文是物件關聯對映。  
ORM 在網站開發結構中，透過程式語言，去操作資料庫語言，把資料庫和 MVC 架構中的 Model 串接起來，幫助使用者更簡便、安全的從資料庫操作資料。

##### 優點：
1. 安全性：因為 ORM 是利用物件來進行操作的，所以可以避免掉 SQL 中最常見的 SQL injection 的攻擊。

2. 簡便性：比起 SQL 語法 ORM 的寫法顯得簡短，而且更容易讀取。

3. 通用性：就算是不同的資料庫語言，ORM 寫法也大同小異，比較不會因為換資料庫語言而出現改寫程式的問題。

##### 缺點：
1. 效能：ORM 語言是把寫好的程式翻譯成 SQL 語言後去資料庫執行，所以勢必會比只用 SQL 語言來的慢
2. 複查的查詢比較不易懂：太複雜的 SELECT 還是需要在 ORM 當中寫 SQL 語法，導致整個程式會變得複雜且交為不易讀。 

## 什麼是 N+1 problem？
N+1 Problem 發生在我們使用 ORM 時，當查詢的條件（e.g. where) ，呈現一對多導致返回條件可能是多個結果時，當我們再對得到的 Collect 做 SELECT 取得關連資料時，ORM 會對應每次的關連查詢下一次條件。  
(e.g.也就是說當使用者有十筆訂單，查出使用者的十筆訂單後，想接著取得訂單商品的資訊，若我們直接遍歷查詢訂單商品，就會產生十筆查詢訂單商品的 Query)
而每一次的 query 都會造成效能的損耗，所以 n+1 problem 的發生，就代表著效能正在大量耗損。

#### 解決方法
利用 `join` 或是 `include` 的方式在第一次查詢的時候就把後面需要用到的資料預先拿出來，這樣就可以避免掉後續使用時還要重新去資料庫拿資料的情況發生。