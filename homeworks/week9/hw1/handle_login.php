<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');
?>

<?php 
  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: login.php?errCode=4");
    die();
  }
  
  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = sprintf(
    "SELECT * FROM simon198_board_users WHERE username='%s' AND `password`='%s'",
    $username, $password
  );

  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $user_id = $row["id"];
  
  if (!$result) {
    die($conn->error);
  }

  if ($result->num_rows) { 
    $_SESSION["user_id"] = $user_id;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=5");
    die();
  }
?>
