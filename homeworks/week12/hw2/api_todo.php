<?php
  require_once("conn.php");
  header('Content-Type: application/json; charset=utf-8'); 
  header("Access-Control-Allow-Origin: *");

  if (empty($_GET["id"])) {
    $json = array(
      "ok" => false,
      "message" => "please add id in url",
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = intval($_GET["id"]);

  $sql = "SELECT id, todo FROM simon198_todo WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => "sql fail".$conn->error,
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $comments = [
    "id" => $row["id"],
    "todo" => $row["todo"],];



  $json = array(
    "ok" => true,
    "message" => "success",
    "comments" => $comments,
  );

  $response = json_encode($json);
  echo $response;
?>
