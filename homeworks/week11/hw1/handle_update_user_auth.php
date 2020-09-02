<?php 
  session_start();
  require_once('conn.php');
?>

<?php 
  $user_auth = intval($_POST["user_auth"]);
  $user_id = intval($_POST["uid"]);

  $sql = "UPDATE `simon198_board_users` SET `auth_type`=? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $user_auth, $user_id);
  $result = $stmt->execute();
  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode === 1062) {
      header("Location: index?errCode=2");
    }
    die($conn->error);
  }
  header("Location: admin.php");

?>