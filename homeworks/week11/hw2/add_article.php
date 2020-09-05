<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
  require_once("admin_check.php");
?>

<?php 

  $user_id = NULL;
  if(!empty($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
  }
  
  $user_info = getUserInfoFromId($user_id);
  if ($user_info["auth_type"] !== "管理員") {
    header("Location: index.php");
    exit;
  }

  $sql = "SELECT *
          FROM simon198_blog_tags 
          ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    echo "資料庫錯誤";
  }
  $result = $stmt-> get_result();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='./style.css' rel='stylesheet'>
  <?php if ($user_id) { ?>
    <title><?php echo $user_info["nickname"]; ?>'s Blog</title>
  <?php } else { ?>
    <title>Blog - admin</title>
  <?php } ?>
</head>
<body>
  <div class='navbar'>
    <div class='nav_site-name_and_catalog'>
      <?php if ($user_id) { ?>
        <h1>BLOG 管理後台</a></h1>
      <?php } else { ?>
        <h1><a href='index.php'>BLOG</a></h1>
      <?php } ?>
      <div class='nav_catalog'>
        <a href='index.php'>文章列表</a>
        <a href='#'>分類專區</a>
        <a href='#'>關於我</a>
      </div>
    </div>
    <div class='user_option'>
      <?php if($user_id) {?>
        <a href='admin.php'>回到管理後台</a>
        <a href='logout.php'>登出</a>
      <?php } else { ?>
        <a href='register.php'>註冊</a>
        <a href='login.php'>登入</a>
      <?php } ?>
    </div>
  </div>
  <div class='welcome-block'>
    <h1>存放技術之地</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <div class='site-body'>
    <div class='board'>
      <section class='article'>
        <h1 class='add_article_h1'>發表文章 ：</h1>
        <form class='add_article_form' method='POST' action='handle_add_article.php'>
          <div><input name='title' placeholder='請輸入文章標題...'/></div>
          <div><select name='tag_id'>
            <option value='' disabled selected>請輸入文章分類</option>
            <?php while ($row = $result->fetch_assoc()) {?>
              <option value='<?php echo intval($row["id"]);?>'><?php echo $row["name"];?></option>
            <?php } ?>
          </select></div>
          <div><textarea name='content' rows='5'></textarea></div>
          <div class='submit-btn'>
            <?php 
              if (!empty($_GET["errCode"])) {
                $code = $_GET["errCode"];
                $errMsg = NULL;
                if ($code === "4") { 
                  $errMsg = "錯誤：請輸入文章標題和文章分類";
                } 
                echo "<h3 class='error_message'>".$errMsg."</h3>";
              }
            ?>
            <button type='submit'>送出文章</button>
          </div>
        </form>
      </section>
    </div>
  </div>
  <div class='footer'>
  Copyright © 2020 Who's Blog All Rights Reserved.
  </div>
</body>
</html>