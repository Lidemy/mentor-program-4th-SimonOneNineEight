## 跟你朋友介紹 Git

## 基本概念

### Git 是什麼？

  Git 就是一個幫你做版本控制的工具

### 版本控制是什麼？

  版本控制就是讓你可以把每一次的版本更改都進行保存下來，不會因為下一次更新而喪失或更改之前版本的程式碼。

### 為什麼需要版本控制？

1. 讓大家可以同時很多個人一起運作同一個 project，而不需要大家輪流做。
2. 讓開發可以持續，不用因為要修前面的 bug 而導致新功能提前曝光。
3. 如果更新後出現大問題或成效不如預期，可以直接回到舊的版本。

### 如何做版本控制 = Git 如何運作（用資料夾解釋）？

1. 需要新版本： 開一個新資料夾
2. 不想加入版本控制：不要加入資料夾（e.g. 最新版本、版本歷史...）
3. 避免版本號衝突：利用類似亂數的東西當資料夾
4. 知道最新版本：建立名為最新版本的檔案，每次更新新版後更新
5. 想知道版本歷史：建立名為歷史的檔案，每次更新後更新

## Git 的基礎使用

### 基礎指令

1. git init → 開始使用對該專案做版本控制
2. git status → 檢視現在版本狀態
3. git add → 把檔案加入版本控制
    * 狀態：untrack：不加入版本控制 ← → staged ：加入版本控制
    * 加入/ 移除控制：
        - 加入單一檔案： git add. 檔名
        - 加入整個資料夾： git add.
        - 移除：git rm —cached 檔名
4. git commit → 建立一個新的版本
    1. 輸入 git commit 後輸入一個 commit message 來描述版本後建立新版本
    2. 輸入 git commit -m  " commit message " 來直接建立新版本和 commit message
    - Note.
        - git commit -am 如果沒有新檔案，可以用這個指令省略掉 git add. 的動作
        - 如果要改 commit message → git commit —amend
        - 如果想要刪除 commit → git reset HEAD^ —hard（直接刪除最新 commit 的整個檔案）/ git reset HEAD^ — soft（刪除 commit 這個動作）
5. git log → 歷史紀錄
    - git log —oneline → 比較簡約的歷史紀錄
6. git checkout → 切換到某個版本
    - git checkout + 版本號碼 → 切換到該版本
    - git checkout master → 切換到當前版本
    - git checkout — + name → 把檔案回復到上一次 commit 的狀態
7. git diff → 可以看更改的地方
- .gitignore → 一個放所以不想要加入版本控制的檔案

### 如何建立專案？

1. git init → 讓資料夾被 git 控制
2. git status → 檢視裡面的狀況
3. 建立 .gitignore 檔案，把不會用到的東西排除掉
4. git add. → 把所有要版本控制的檔案新增到 staged
5. git commit -am "commit message" → 建立第一個版本

Note. 如果有新檔案要記得把他 add  到 staged 裡面 

     什麼時候 commit? → 每完成一個段落就 commit 一下

## Branch

### 為什麼需要 Branch ?

讓大家可以同時對一個版本進行修改，修改完畢後再合併成為新的版本

Note. 主幹 = master

### Branch 指令

1. git branch + branch-name→ 建立名為...的新 branch
    - 更改名稱 → git branch -m + new-name
2. git branch -d + branch-name → 建立名為...的 branch
3. git branch -v  → 查看有哪些 branch & 自己在哪個 branch
4. git checkout + branch-name → 轉換到 branch-name 底下
5. git merge + branch-name → 把 branch-name 合併到 master 裡面  
    → 在 merge 的時候遇到衝突，看 git 說哪些檔案衝突，手動決定留下哪一個

## Git 連動 GitHub

### GitHub 是什麼？

  我們稱每一個 Git 存放的專案為一個 repository，而 GitHub 就是一個巨大的公開存放 repository 的地方。

### 把 repository 上傳之後：

1. git push →  把電腦的東西同步到 Github 上： git push origin + name （檔案或 branch 都可以）
2. git pull → 把 Github 上的東西同步回電腦：git pull origin + 要同步的東西

    Note. 抓下遠端（GitHub上）的 branch → git branch + name

3. pull request → 在 Github 上的 merge ( 有可能是別人請你 merge 進你的 master）