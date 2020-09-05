<?php 
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST["username"]) || empty($_POST["password"])) {
    header("Location:login.php?errCode=1");
    exit;
  }

  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = "SELECT * FROM simon198_blog_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();

  if(!$result) {
    header("Location:login.php?errCode=2");
    exit;
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($row["password"] === $password) {
    $_SESSION["user_id"] = $row["id"];
    header("Location:index.php");
  } else {
    header("Location:login.php?errCode=3");
  }
?>