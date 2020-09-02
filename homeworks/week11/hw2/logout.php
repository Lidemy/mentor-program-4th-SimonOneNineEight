<?php
  if (!session_id()) session_start();
  require_once("admin_check.php");
  session_destroy();
  header("Location:index.php");
?>