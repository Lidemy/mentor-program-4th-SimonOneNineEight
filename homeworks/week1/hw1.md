## 交作業流程

### 第一次交作業前準備
1. 進入 GitHub classroom，複製 repository 的網址
2. 在 Terminal 輸入 `git clone + 網址` 把遠端的 repository 下載到電腦

### 寫作業 & 交作業
1. 輸入`git branch + 名稱`開立一個新的 branch (永遠不要在 master 上做事情）
2. 輸入`git checkout + 剛剛建立的 branch 名稱`切換到新 branch 開始寫作業
3. 寫完的作業並 commit 完之後，輸入`git push original + branch-name` 把寫好的作業丟到 GitHub 上面
4. 到 GitHub 點擊 compare and pull request
5. 確認自己寫的作業都有傳上去之後（or 又問題也可以寫在上面）  
`Note. 如果沒有 compare and pull request 可以自己開一個`

6. 點擊 Creat pull request
7. 到學習系統的作業列表，按新增作業
8. 選擇哪週的作業和 pull request 的連結，並且確認檢查過作業和看過自我檢討
9. 改完作業之後，老師會把 GitHub 上的 branch merge 進 master 裡面
10. 收到後回到 Terminal ，輸入`git checkout master`回到 master 裡面
11. 輸入 `git pull origin master` 把 merge 完的 repository 同步到電腦裡
12. 輸入 `git branch -d + branch-name` 把電腦裡的 branch 刪掉

### 當 Huli 說要跟他的 Master 同步 

1. 先 commit 自己正在做的東西
2. 切回 master，輸入 `git pull + Huli的respository的網址`
3. 輸入`git push origin master`，把改動同步到 GitHub 上