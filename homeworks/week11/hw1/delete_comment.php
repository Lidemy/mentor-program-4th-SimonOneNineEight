<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php")
?>

<?php 
  $id = $_GET["id"];
  $user_id = $_SESSION["user_id"];
  $user_info = getUserInfoFromUserId($user_id);
  $user_auth = $user_info["auth_type"];
  if (empty($_GET["id"])) {
    header("Location: index.php");
    die();
  }

  
  
  if ($user_auth === 2) {
    $sql = "UPDATE `simon198_board_comments` SET `is_deleted`= 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
  } else {
    $sql = "UPDATE `simon198_board_comments` SET `is_deleted`= 1 WHERE id = ? AND `user_id`=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $id, $user_id);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  header("Location: index.php");

?>