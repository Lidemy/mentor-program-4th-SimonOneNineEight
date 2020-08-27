<?php
  require_once("conn.php");

  function generateToken() {
    $s = '';
    for ($i = 1; $i < 16; $i ++ ) {
      $s.= chr(rand(65,90));
    }
    return $s;
  }

  function getUserInfoFromUserId($id) {
    global $conn;
    $user_sql = $conn->query(sprintf("SELECT * FROM simon198_board_users WHERE id = '%s'", $id));
    $user_info = $user_sql->fetch_assoc();
    return $user_info;
  }
?>