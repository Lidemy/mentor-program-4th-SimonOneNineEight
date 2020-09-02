<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");
?>

<?php 
  $id = $_POST["id"];
  $user_id = $_SESSION["user_id"];
  $user_info = getUserInfoFromUserId($user_id);
  $user_auth = $user_info["auth_type"];
  if (empty($_POST["content"])) {
    header("Location: update_comment.php?errCode=7&id=".$id);
    die();
  }
  
  $content = $_POST["content"];

  if ($user_auth === 2) {
    $sql = "UPDATE `simon198_board_comments` SET `content`=? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $content, $id);
  } else {
    $sql = "UPDATE `simon198_board_comments` SET `content`=? WHERE id = ? AND `user_id`=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $content, $id, $user_id);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");

?>