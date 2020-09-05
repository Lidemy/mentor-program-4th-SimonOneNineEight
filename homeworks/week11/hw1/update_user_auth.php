<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (!empty($_GET["uid"])) {
    $user_id = $_GET["uid"];
  }


  $sql = "SELECT * FROM simon198_board_users
          WHERE id=?";
          
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $user_id);
  $result = $stmt->execute();
  if (!$result) {
    die("資料庫錯誤(index.php)".$conn->connect_error);
  }
  
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  
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
      <a class='board_btn' href='admin.php'>回到管理頁面</a>
    </div>
    <section class='leave_comments'>
      <h1>更改會員權限</h1>
    </section>
    <div class='users_display'>
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
            </div>
            
            <form class='update_user_auth_form' method='POST' action='handle_update_user_auth.php'>
              <div> 更改權限：</div>
              <div><label><input name='user_auth' value='1' type='radio' checked>  一般會員</input></label></div>
              <div><label><input name='user_auth' value='2' type='radio'>  管理員</input></label></div>
              <div><label><input name='user_auth' value='3' type='radio'>  遭停權會員</input></label></div>
              <input type='hidden' name='uid' value='<?php echo $user_id?>' />
              <input class='btn_comment_submit' type='submit' name='comment_submit' value='提交'>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>  
</body>
</html>