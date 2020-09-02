<?php
  if (!session_id()) session_start();
  require_once("conn.php");
  require_once("utils.php");

  $user_id = NULL;
  if(!empty($_SESSION["user_id"])) {
    $user_id = intval($_SESSION["user_id"]);
  }
  
  $user_info = getUserInfoFromId($user_id);
  if ($user_info["auth_type"] !== "管理員") {
    header("Location: index.php");
    exit;
  }
?>