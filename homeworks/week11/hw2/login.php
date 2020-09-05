<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <div class='navbar'>
    <div class='nav_site-name_and_catalog'>
      <h1><a href='index.php'>198's BLOG</a></h1>
      <div class='nav_catalog'>
        <a href='index.php'>文章列表</a>
        <a href='#'>分類專區</a>
        <a href='#'>關於我</a>
      </div>
    </div>
  </div>
  <div class='welcome-block'>
    <h1>存放技術之地</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <div class="login-wrapper">
    <h2>Login</h2>
    <form method="POST" action="handle_login.php">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <?php 
        if (!empty($_GET["errCode"])) {
          $code = $_GET["errCode"];
          $errMsg = NULL;
          if ($code === "1") { 
            $errMsg = "錯誤：請輸入帳號及密碼";
          } else if ($code === "2") {
            $errMsg = "錯誤：請輸入正確帳號或密碼";
          } else if ($code === "3") {
            $errMsg = "錯誤：請輸入正確密碼";
          }
          echo "<h3 class='error_message'>".$errMsg."</h3>";
        }
      ?>
      <input type='submit' value="登入" />
    </form>
  </div>
</body>
</html>