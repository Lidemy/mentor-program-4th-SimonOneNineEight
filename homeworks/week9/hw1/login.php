<?php
  require_once("conn.php");

  $result = $conn->query("SELECT * FROM simon198_board_comments ORDER BY id DESC");

  if (!$result) {
    die("資料庫錯誤(login.php)".$conn->connect_error);
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='./style.css' rel='stylesheet' />
  <title>留言板 - 會員登入</title>
</head>
<body>
  <header class='test-warning'>
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>  
  <div class='board'>
    <div class='login_and_register_btn'>
      <a class='board_btn' href='index.php'>回到留言板</a>
      <a class='board_btn' href='register.php'>註冊</a>
    </div>
    <section class='leave_comments'>
      <h1>會員登入</h1>
      <form class='leave_comment_form' method='POST' action='handle_login.php'>
        <div class='input_nickname'>
          <span>帳號： </span>
          <input type='text' name='username' />
        </div>
        <div class='input_nickname'>
          <span>密碼： </span>
          <input type='password' name='password' />
        </div>
        <div class='submit'>
          <input class='btn_comment_submit' type='submit' name='comment_submit' value='提交'>
          <?php
            if (!empty($_GET["errCode"])) {
              $code = $_GET["errCode"];
              if ($code === '4') {
                $errMsg = "登入失敗：請輸入帳號及密碼";
              } else if ($code === '5') {
                $errMsg = "登入失敗：請輸入正確帳號或密碼！";
              }
              echo "<h3 class='error'>".$errMsg."</h3>";
            }
          ?>
        </div class='submit'>
      </form>
    </section>
    </div>
  </div>  
</body>
</html>