<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");
  require_once("admin_check.php");

  $user_id = NULL;
  if(!empty($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
  }
  
  $user_info = getUserInfoFromId($user_id);
  if ($user_info["auth_type"] !== "管理員") {
    header("Location: index.php");
    exit;
  }

  $article_id = intval($_GET["aid"]);


  $sql = "UPDATE simon198_blog_articles SET is_deleted = 1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $article_id);
  $result = $stmt->execute();

  if(!$result) {
    header("Location:login.php?errCode=2");
    exit;
  }

  header("Location: admin.php");

?>