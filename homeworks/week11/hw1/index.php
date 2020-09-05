<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $page = 1;
  if (!empty($_GET["page"])) {
    $page = $_GET["page"];
  }
  $comment_per_page = 5;
  $offset = ($page - 1 )* $comment_per_page;
  
  $sql = "SELECT c.id AS 'id',u.id AS 'user_id',
          u.nickname AS 'nickname', 
          u.username AS 'username', c.content AS 'content', c.created_at AS 'created_at' 
          FROM simon198_board_comments AS c 
          LEFT JOIN simon198_board_users AS u ON u.id = c.user_id
          WHERE c.is_deleted IS NULL 
          ORDER BY c.id DESC
          LIMIT ?
          OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $comment_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die("資料庫錯誤(index.php)".$conn->connect_error);
  }
  
  $result = $stmt->get_result();
  
  $user_id = NULL;
  $user_auth = 1;
  if(!empty($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
    $user_info = getUserInfoFromUserId($user_id);
    $user_auth = $user_info["auth_type"];
  }

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='./style.css' rel='stylesheet' />
  <title>留言板</title>
</head>
<body>
  <header class='test-warning'>
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>  
  <div class='board'>
    <div class='login_and_register_btn'>
      <?php if (!$user_id) {?>
        <a class='board_btn' href='register.php'>註冊</a>
        <a class='board_btn' href='login.php'>登入</a>
      <?php } else { ?>
        <?php if ($user_auth === 2) {?> 
          <a class='board_btn' href='admin.php'>管理</a>
        <?php }?>
        <a class='board_btn' href='logout.php'>登出</a>
        <span class='board_btn update_nickname_btn'> 編輯暱稱 </span>
      <?php } ?>
    </div>
    <section class='leave_comments'>
      <h1>Comments</h1>
      <?php if ($user_id && $user_auth !== 3) {?>
        <div class='say_hello'><?php echo escape($user_info["nickname"]) ?> 你好！</div>
        <form class='update_nickname hide' method='POST' action='handle_update_nickname.php'>
          <div>請輸入新暱稱：<input class='new_nickname' type='text' name='nickname'></div>
          <input class='btn_comment_submit' type='submit' name='comment_submit' value='更改暱稱'>
          <?php
              if (!empty($_GET["errCode"])) {
                $code = $_GET["errCode"];
                if ($code === '5') {
                  $errMsg = "資料不齊全，請輸入暱稱";
                  echo "<h3 class='error'>錯誤:".$errMsg."</h3>";
                }
              }
            ?>
        </form>
        <form class='leave_comment_form' method='POST' action='handle_add_comment.php'>
          <textarea name='content' rows='5' placeholder='請輸入留言內容'></textarea>
          <div class='submit'>
            <input class='btn_comment_submit' type='submit' name='comment_submit' value='提交'>
            <?php
              if (!empty($_GET["errCode"])) {
                $code = $_GET["errCode"];
                if ($code === '1') {
                  $errMsg = "資料不齊全，請輸入暱稱及內容";
                  echo "<h3 class='error'>錯誤:".$errMsg."</h3>";
                }
              }
            ?>
          </div class='submit'>
        </form>
      <?php } else if ($user_id && $user_auth == 3)  { ?>
        <h3>遭停權使用者，無法新增留言</h3>
      <?php } else { ?>
        <h3>登入後即可留下評論</h3>
      <?php } ?>
      <div class='divider'></div>
    </section>
    <div class='comment_display'>
      <?php 
        while ($row = $result->fetch_assoc()) {?>
          <div class='comments'>
            <div class='comment_photo'>
            </div>
            <div class='comment_detail'>
              <div class='comment_info'>
                <div class='comment_nickname'>
                  <?php echo escape($row['nickname']);?>
                  (@<?php echo escape($row['username']);?>)
                </div>
                <div class='comment_created_at'>
                  <?php echo $row['created_at'];?>
                </div>
                <?php if($row["user_id"] === $user_id || $user_auth === 2) { ?>
                <div class='modify_comment'>
                  <a href='update_comment.php?id=<?php echo escape($row["id"]);?>'>編輯</a>
                  <a href='delete_comment.php?id=<?php echo escape($row["id"]);?>'>刪除</a>
                </div>
                <?php } ?>
              </div>
              <div class='comment_content'><?php echo escape($row['content']);?></div>
            </div>
          </div>
      <?php }?>
    </div>
    <div class='page-info'>
      <?php
        $sql = "SELECT count(id) AS 'count' FROM simon198_board_comments WHERE is_deleted IS NULL";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if (!$result) {
          die("資料庫錯誤(index.php)".$conn->connect_error);
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        $count = $row["count"];
        $total_page = ceil($count / $comment_per_page);
      ?>
      <div class='page-detail'>
        總共有<?php echo $count?>筆留言，目前在第 <?php echo $page?> 頁
      </div>
      <div class='paginator'>
        <?php
          if ($page != 1) { ?>
            <a href="index.php?page=1"><<</a>
            <a href="index.php?page=<?php echo ($page - 1) ?>"><</a>
          <?php }
        ?>
        <div> <?php echo $page ?> </div>
        <?php
          if ($page != $total_page) { ?>
            <a href="index.php?page=<?php echo ($page + 1) ?>">></a>
            <a href="index.php?page=<?php echo $total_page ?>">>></a>
          <?php }
        ?>
      </div>
    </div>
  </div>  
  <script>
    const form = document.querySelector('.update_nickname_btn');
    form.addEventListener('click', (e)=> {
      document.querySelector('.update_nickname').classList.toggle('hide');
    })
  </script>
</body>
</html>