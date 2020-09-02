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

  $sql = "SELECT * FROM simon198_board_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $user_id = $row["id"];
  $user_auth = $row["auth_type"];

  if (!$result->num_rows) {
    header("Location: login.php?errCode=5");
    die();
  }

  if (password_verify($password, $row["password"])) {
    $_SESSION["user_id"] = $user_id;
    header("Location: index.php?user_auth=".$user_auth);
  } else {
    header("Location: login.php?errCode=5");
    die();
  } 
?>
