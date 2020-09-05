<?php
  if (!session_id()) session_start();
  require_once("conn.php");


  function getUserInfoFromId($user_id) {
    global $conn;
    $sql = "SELECT * FROM simon198_blog_users WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
  }
?>