<?php
  require_once("conn.php");

  function getUserInfoFromUserId($id) {
    global $conn;
    $sql = "SELECT * FROM simon198_board_users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $userInfo = $result->fetch_assoc();
    return $userInfo;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  } 
?>