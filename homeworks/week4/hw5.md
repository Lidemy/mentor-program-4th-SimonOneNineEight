## 請以自己的話解釋 API 是什麼
  API 全名是 Application Programming Interface。因為他名字裡面就寫著介面了，所以他就是一個讓不同的工程師以一個標準化過後的方式交換資料的一個介面。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
1. `401 Unauthorized` 這個代表著可能需要登入或是拿取 Token 之後才能處理。 
2. `418 I'm a teapot` Server 很疑惑為什麼你要很疑惑為什麼你要試著用茶壺泡咖啡。(1998年的愚人節笑話)
3. `304 Not modified` 表示這個東西在快取裡面已經有資料了！直接從那裡拿取就可以了！


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Restaurant.com API v1
`Base URL`: https://api.restaurant.com/
  
 說明          | Method | path             | 參數                  | 範例                   |  
:------------:|:------:|:----------------:|:--------------------:|:---------------------:|  
獲得所有餐廳資訊 | Get    | /restaurants     | _limit:限制回傳資料數量 | /restaurants?_limit=5 |
獲得單一餐廳資訊 | Get    | /restaurants/:id |                      | /restaurants/2        |
刪除單一餐廳資訊 | Delete | /restaurants/:id |                      | 無                    |
新增單一餐廳資訊 | Post   | /restaurants     | name: 書名            | 無                    |
修改單一餐廳資訊 | Patch  | /restaurants     | name: 新書名          | 無                     |