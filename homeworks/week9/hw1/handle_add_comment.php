<?php
  session_start();
  require_once('conn.php');
  require_once("utils.php");
?>

<?php 
  if (empty($_POST["content"])) {
    header("Location: index.php?errCode=1");
    die("資料不齊全");
  }
  
  $user_id = $_SESSION["user_id"];
  $user_info = getUserInfoFromUserId($user_id);
  $nickname = $user_info["nickname"];
  $content = $_POST["content"];

  $sql = sprintf(
    "INSERT INTO simon198_board_comments (nickname, content) VALUES ('%s','%s')",
    $nickname, $content
  );

  $result = $conn->query($sql);
  if (!$result) {
    die("資料庫錯誤（handle_add_comment.php)".$conn->error);
  }

  header("Location: index.php");

?>