<?php
  require_once("conn.php");
  header('Content-Type: application/json; charset=utf-8');
  header("Access-Control-Allow-Origin: *");

  if(empty($_POST["todo"])) {
    $json = array(
      "ok" => false,
      "message" => "please input all fields",
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST["todo"];
  $sql = "INSERT INTO `simon198_todo`(`todo`) VALUES (?)
  ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $todo);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => "sql error",
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $respId = $conn->insert_id;
  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $respId,
  );

  $response = json_encode($json);
  echo $response;
?>