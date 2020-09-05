<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
  require_once("admin_check.php");

  if (empty($_POST["title"]) || empty($_POST["tag_id"])) {
    header("Location:add_article.php?errCode=4");
    exit;
  }

  $user_id = $_SESSION["user_id"];
  $title = $_POST["title"];
  $tag_id = $_POST["tag_id"];
  $content = $_POST["content"];


  $sql = "INSERT INTO simon198_blog_articles(`user_id`, `title`, `content`, `tag_id`) VALUES (?,?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("issi", $user_id, $title, $content, $tag_id);
  $result = $stmt->execute();

  if(!$result) {
    header("Location:login.php?errCode=2");
    exit;
  }

  header("Location: admin.php");

?>