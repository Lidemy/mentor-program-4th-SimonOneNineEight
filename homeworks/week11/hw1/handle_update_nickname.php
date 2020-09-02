<?php 
  session_start();
  require_once('conn.php');
?>

<?php 
  if (empty($_POST["nickname"])) {
    header("Location: index.php?errCode=5");
    die();
  }
  
  $nickname = $_POST["nickname"];
  $user_id = $_SESSION["user_id"];

  $sql = "UPDATE `simon198_board_users` SET `nickname`=? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $nickname, $user_id);
  $result = $stmt->execute();
  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode === 1062) {
      header("Location: index?errCode=2");
    }
    die($conn->error);
  }
  header("Location: index.php");

?>