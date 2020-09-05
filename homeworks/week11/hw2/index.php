<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
?>

<?php 

  $user_id = NULL;
  if(!empty($_SESSION["user_id"])) {
    $user_id = intval($_SESSION["user_id"]);
  }
  
  $user_info = getUserInfoFromId($user_id);

  $page = 1;
  if (!empty($_GET["page"])) {
    $page = intval($_GET["page"]);
  }
  $article_per_page = 5;
  $offset = ($page - 1) * $article_per_page;

  if (!$user_id) {
    $sql = "SELECT a.id, a.title, a.content, a.created_at, t.name AS tag_name
            FROM simon198_blog_articles AS a 
            LEFT JOIN simon198_blog_tags AS t ON a.tag_id = t.id
            WHERE a.is_deleted = 0
            ORDER BY a.id DESC
            LIMIT 5";
    $stmt = $conn->prepare($sql);
  } else {
    $sql = "SELECT a.id, a.title, a.content, a.created_at, t.name AS tag_name
            FROM simon198_blog_articles AS a 
            LEFT JOIN simon198_blog_tags AS t ON a.tag_id = t.id
            WHERE a.user_id = ? AND a.is_deleted = 0
            ORDER BY a.id DESC
            LIMIT ?
            OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $user_id, $article_per_page, $offset);
  }

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
    <title><?php echo escape($user_info["nickname"]); ?>'s Blog</title>
  <?php } else { ?>
    <title>Blog</title>
  <?php } ?>
</head>
<body>
  <div class='navbar'>
    <div class='nav_site-name_and_catalog'>
      <?php if ($user_id) { ?>
        <h1><a href='index.php'><?php echo escape($user_info["nickname"]); ?>'s BLOG</a></h1>
      <?php } else { ?>
        <h1><a href='index.php'>BLOG</a></h1>
      <?php } ?>
      <div class='nav_catalog'>
        <a href='article_list.php'>文章列表</a>
        <a href='#'>分類專區</a>
        <a href='#'>關於我</a>
      </div>
    </div>
    <div class='user_option'>
      <?php if($user_id) {?>
        <a href='admin.php'>管理後台</a>
        <a href='logout.php'>登出</a>
      <?php } else { ?>
        <a href='login.php'>登入</a>
      <?php } ?>
    </div>
  </div>
  <div class='welcome-block'>
    <h1>存放技術之地</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <div class='index_site-body'>
    <div class='board'>
      <?php while($row = $result->fetch_assoc()) { ?>
        <section class='article'>
          <div class='article_detail'>
            <h1><?php echo escape($row["title"]); ?></h1>
            <?php if ($user_info !== NULL && $user_info["auth_type"] === "管理員") { ?>
              <a class='update_article' href='update_article.php?aid=<?php echo $row["id"];?>'>編輯</a>
            <?php } ?>
            <div class='article_info'>
              <img src="./img/watch-later-24-px@2x.png" width='14px' height='14px' />
              <div><?php echo $row["created_at"]; ?></div>
              <img src="./img/folder-24-px@2x.png" width='14px' height='14px' />
              <div><?php echo escape($row["tag_name"]); ?></div>
            </div>
            <div class='article_content'>
              <?php echo escape($row["content"]); ?>
            </div>
            <a href='read_article.php?aid=<?php echo $row["id"]?>' class='read_more_btn'>READ MORE</a>
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