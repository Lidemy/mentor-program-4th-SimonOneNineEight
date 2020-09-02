<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
  require_once("admin_check.php");
?>

<?php 
  $sql = "SELECT a.id, a.title, a.content, a.created_at, t.name AS tag_name
          FROM simon198_blog_articles AS a 
          LEFT JOIN simon198_blog_tags AS t ON a.tag_id = t.id
          WHERE a.user_id = ? AND is_deleted = 0
          ORDER BY a.id DESC";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $user_id);
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
        <h1><a href='index.php'>BLOG 管理後台</a></h1>
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
      <a href='add_article.php'>新增文章</a>
      <a href='logout.php'>登出</a>
    </div>
  </div>
  <div class='welcome-block'>
    <h1>存放技術之地</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <div class='site-body'>
    <div class='board'>
      <?php while($row = $result->fetch_assoc()) { ?>
        <section class='admin_article'>
          <div class='admin_article_detail'>
            <h1><a href='read_article.php?aid=<?php echo $row["id"]; ?>'><?php echo $row["title"]; ?></a></h1>
            <div class='modify-btn'>
              <span class='admin_created_at'><?php echo $row["created_at"]; ?></span>
              <a href='update_article.php?aid=<?php echo $row["id"];?>'>編輯</a>
              <a href='delete_article.php?aid=<?php echo $row["id"];?>'>刪除</a>
            </div>
          </div>
        </section>
      <?php } ?>
    </div>
  </div>
  <div class='footer'>
  Copyright © 2020 Who's Blog All Rights Reserved.
  </div>
</body>
</html>