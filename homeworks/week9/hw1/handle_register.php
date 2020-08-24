<?php 
  require_once('conn.php');
?>

<?php 
  if (empty($_POST["nickname"]) || empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location: register.php?errCode=1");
    die("資料不齊全");
  }
  
  $nickname = $_POST["nickname"];
  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = sprintf(
    "INSERT INTO simon198_board_users (username, `password`, nickname) VALUES ('%s','%s','%s')",
    $username, $password, $nickname 
  );

  $result = $conn->query($sql);
  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode === 1062) {
      header("Location: register.php?errCode=2");
    }
    die($conn->error);
  }

  header("Location: index.php");

?>