## 交作業流程

### 第一次交作業前準備
1. 進入 GitHub classroom
2. 把你的 repository 用 git clone 複製到電腦裡

### 寫作業 & 交作業
1. 開立一個新的 branch (永遠不要在 master 上做事情）
2. 切換到新 branch 開始寫作業
3. 把寫好的作業用 git push 丟到 GitHub 上面
4. 到 GitHub 點擊 compare and pull request
5. 確認自己寫的作業都有傳上去之後（or 又問題也可以寫在上面）  
`Note. 如果沒有 compare and pull request 可以自己開一個`

8. 點擊 Creat pull request
9. 到學習系統的作業列表，按新增作業
10. 選擇哪週的作業和 pull request 的連結，並且確認檢查過作業和看過自我檢討
11. 改完作業之後，老師會把 GitHub 上的 branch merge 進 master 裡面
12. 收到後到 terminal ，移動到 master 裡面，把最新的 master pull 到電腦裡
13. 用 git branch -d 把電腦裡的 branch 刪掉

### 當 Huli 說要跟他的 Master 同步 

1. 先 commit 自己正在做的東西
2. 切回 master，輸入 git pull **Huli的respository的網址**
3. git push origin master，把改動同步到 GitHub 上