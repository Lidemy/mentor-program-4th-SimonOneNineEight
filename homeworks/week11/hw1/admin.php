<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $page = 1;
  if (!empty($_GET["page"])) {
    $page = $_GET["page"];
  }
  $comment_per_page = 5;
  $offset = ($page - 1 )* $comment_per_page;
  
  $sql = "SELECT * FROM simon198_board_users
          ORDER BY id DESC
          LIMIT ?
          OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $comment_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die("資料庫錯誤(index.php)".$conn->connect_error);
  }
  
  $result = $stmt->get_result();
  
  $user_id = NULL;
  $user_auth = 1;
  if(!empty($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];
    $user_info = getUserInfoFromUserId($user_id);
    $user_auth = $user_info["auth_type"];
  }

  if ($user_id === NULL || $user_auth != 2) {
    header ("Location: index.php");
    exit;
  }

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='./style.css' rel='stylesheet' />
  <title>留言板</title>
</head>
<body>
  <header class='test-warning'>
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>  
  <div class='board'>
    <div class='login_and_register_btn'>
      <a class='board_btn' href='index.php'>回到留言板</a>
      <a class='board_btn' href='logout.php'>登出</a>
    </div>
    <section class='leave_comments'>
      <h1>管理員後台 - 會員資訊</h1>
      <?php if ($user_id && $user_auth !== 3) {?>
        <div class='say_hello'><?php echo escape($user_info["nickname"]) ?> 你好！</div>
      <?php } ?>
    </section>
    <div class='users_display'>
      <?php 
        while ($row = $result->fetch_assoc()) {?>
          <div class='users'>
            <div class='user_detail'>
              <div class='user_info'>
                <div class='user_id'>
                  ID: <?php echo escape($row["id"]);?>
                </div>
                <div class='username'>
                  帳號： <?php echo escape($row["username"]);?>
                </div>
                <div class='user_auth'>
                  <?php if (escape($row["auth_type"]) == 1) { ?>
                    會員權限：<?php echo "一般會員";?>
                  <?php } else if (escape($row["auth_type"]) == 2) { ?>
                    會員權限：<?php echo "管理員";?>
                  <?php } else if  (escape($row["auth_type"]) == 3) { ?>
                    會員權限：<?php echo "遭停權會員";?>
                  <?php } ?>
                  <a href='update_user_auth.php?uid=<?php echo $row["id"]; ?>' 
                    class='update_user_auth'>更改</a>
                </div>
                <div class='user_created_at'>
                  建立時間： <?php echo $row['created_at'];?>
                </div>
              </div>
            </div>
          </div>
      <?php }?>
    </div>
    <div class='page-info'>
      <?php
        $sql = "SELECT count(id) AS 'count' FROM simon198_board_users";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if (!$result) {
          die("資料庫錯誤(index.php)".$conn->connect_error);
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        $count = $row["count"];
        $total_page = ceil($count / $comment_per_page);
      ?>
      <div class='page-detail'>
        總共有 <?php echo $count?> 位會員
      </div>
      <div class='paginator'>
        <?php
          if ($page != 1) { ?>
            <a href="index.php?page=1"><<</a>
            <a href="index.php?page=<?php echo ($page - 1) ?>"><</a>
          <?php }
        ?>
        <div> <?php echo $page ?> </div>
        <?php
          if ($page != $total_page) { ?>
            <a href="index.php?page=<?php echo ($page + 1) ?>">></a>
            <a href="index.php?page=<?php echo $total_page ?>">>></a>
          <?php }
        ?>
      </div>
    </div>
  </div>  
</body>
</html>