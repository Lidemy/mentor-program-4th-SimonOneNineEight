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
  $content = $_POST["content"];

  $sql = "INSERT INTO simon198_board_comments (`user_id`, content) VALUES (?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $user_id, $content);
  $result = $stmt->execute();
  if (!$result) {
    die("資料庫錯誤（handle_add_comment.php)".$conn->error);
  }

  header("Location: index.php");

?>
