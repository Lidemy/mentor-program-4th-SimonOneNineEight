<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $result = $conn->query("SELECT * FROM simon198_board_comments ORDER BY id DESC");

  if (!$result) {
    die("資料庫錯誤(index.php)".$conn->connect_error);
  }
  
  $user_id = NULL;
  if(!empty($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
    $user_info = getUserInfoFromUserId($user_id);
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
        <a class='board_btn' href='logout.php'>登出</a>
      <?php } ?>
    </div>
    <section class='leave_comments'>
      <h1>Comments</h1>
      <?php if ($user_id) {?>
        <div class='say_hello'>你好！<?php echo $user_info["nickname"] ?>，請留言</div>
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
      <?php } else { ?>
        <h3>登入後即可留下評論</h3>
      <?php } ?>
      <div class='divider'></div>
    </section>
    <?php 
      while ($row = $result->fetch_assoc()) { ?>
        <div class='comments'>
          <div class='comment_photo'>
          </div>
          <div class='comment_detail'>
            <div class='comment_info'>
              <div class='comment_nickname'>
                <?php echo $row['nickname'];?>
              </div>
              <div class='comment_created_at'>
                <?php echo $row['created_at'];?>
              </div>
            </div>
            <div class='comment_content'><?php echo $row['content'];?></div>
          </div>
        </div>
    <?php }?>
    </div>
  </div>  
</body>
</html>