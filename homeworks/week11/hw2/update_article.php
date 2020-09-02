<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
?>

<?php 
  require_once("admin_check.php");

  $article_id = intval($_GET["aid"]);
  
  $sql = "SELECT a.*, t.`name` AS tag_name
          FROM simon198_blog_articles as a
          LEFT JOIN  simon198_blog_tags as t ON a.`tag_id` = t.`id`
          WHERE a.id = ?
          ORDER BY a.id DESC";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $article_id);
  $result = $stmt->execute();
  if (!$result) {
    echo "資料庫錯誤";
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $tag_sql = "SELECT *
          FROM simon198_blog_tags
          WHERE id != ?
          ORDER BY id DESC";
  $tag_stmt = $conn->prepare($tag_sql);
  $tag_stmt->bind_param("i", $row["tag_id"]);
  $tag_result = $tag_stmt->execute();
  if (!$tag_result) {
    echo "資料庫錯誤";
  }
  $tag_result = $tag_stmt->get_result();
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
      <h1><a href = 'index.php'>BLOG 管理後台</a></h1>
      <div class='nav_catalog'>
        <a href='index.php'>文章列表</a>
        <a href='#'>分類專區</a>
        <a href='#'>關於我</a>
      </div>
    </div>
    <div class='user_option'>
        <a href='admin.php'>回到管理後台</a>
        <a href='add_article.php'>新增文章</a>
    </div>
  </div>
  <div class='welcome-block'>
    <h1>存放技術之地</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <div class='site-body'>
    <div class='board'>
      <section class='article'>
        <h1 class='add_article_h1'>編輯文章 ：</h1>
        <form class='add_article_form' method='POST' action='handle_update_article.php'>
          <div><input name='title' value='<?php echo $row["title"]; ?>'/></div>
          <div><select name='tag_id'>
            <option value='<?php echo intval($row["tag_id"]);?>' selected><?php echo $row["tag_name"];?></option>
            <?php while ($tag_row = $tag_result->fetch_assoc()) { print_r($tag_row); ?>
              <option value='<?php echo intval($tag_row["id"]);?>'><?php echo $tag_row["name"];?></option>
            <?php } ?>
          </select></div>
          <div><textarea name='content' rows='5'><?php echo $row["content"]; ?></textarea></div>
          <input name='aid' type='hidden' value=<?php echo $row["id"]; ?> />
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
            <button type='submit'>確認編輯</button>
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