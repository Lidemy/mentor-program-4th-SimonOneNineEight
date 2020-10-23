## 什麼是 MVC？

MVC 是在開發後端軟體常用的一種 Design Pattern，主要是把在開發時雜亂的 code 分成 `models`、`views` 和 `controllers` 三個種類。這三個種類的 code 各司其職，達到讓整個程式更整齊以及更好維護的目的。

### Models
在 MVC 架構中的 `models` 負責的是和資料庫溝通以及商業邏輯等等的功能，例如一個網站最常用到的 CRUD 都會利用到 `models` 來拿取或是更動資料庫的資料已達成新增、刪除、編輯、讀取等功能。另外像是確認會員身份給予不同權限或是電商平台的一定金額免運都需要透過 `models` 來得到結果。

### Views
MVC 架構中的 `views` 就是負責畫面呈現的部分了，裡面會放的就是各式各樣的 html 模板，在 `models` 拿到我們想要的結果之後，`controller` 就會把這些結果傳送到相對應的模板來讓使用者看見。

### Controllers
最後是負責協調所有工作的 `Controllers`，他會負責接收 request，之後傳送到 `models` 獲得需要的資料之後再把資料傳送到 `views` 來產生出頁面最後發 response 給使用者。可以把它視為整個 MVC 架構的中間人，它決定了應用程式的 `workflow`，並且蒐集不同元件的工作結果，統一回傳給使用者。