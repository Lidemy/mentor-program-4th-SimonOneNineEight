<?php 
  session_start();
  require_once('conn.php');
?>

<?php 
  if (empty($_POST["nickname"]) || empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: register.php?errCode=1");
    die("資料不齊全");
  }
  
  $nickname = $_POST["nickname"];
  $username = $_POST["username"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

  $sql = "INSERT INTO simon198_board_users (username, `password`, nickname) VALUES (?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $username, $password, $nickname);
  $result = $stmt->execute();
  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode === 1062) {
      header("Location: register.php?errCode=2");
    }
    die($conn->error);
  }

  $userIdStmt = $conn->prepare("SELECT id FROM simon198_board_users WHERE username=?");
  $userIdStmt->bind_param("s", $username);
  $userIdResult = $userIdStmt->execute();
  $userIdResult= $userIdStmt->get_result();
  $userIdRow = $userIdResult->fetch_assoc();

  $_SESSION["user_id"] = $userIdRow["id"];
  header("Location: index.php");

?>