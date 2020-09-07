<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
require 'conn.php'; //连接数据库

// 检测用户名是否存在
if (isset($_POST["name"])) {
    // echo $name;
    $name = $_POST["name"];
    $relut = $conn->query("SELECT * FROM registr_user WHERE username='$name'");
  
    // echo $relut->fetch_assoc();
    if ($relut->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}

// 检测手机号是否存在
if(isset($_POST["tel1"])){
    $tel = $_POST["tel1"];
    $relut = $conn->query("SELECT * FROM registr_user WHERE tel='$tel'");
     // echo $relut->fetch_assoc();
     if ($relut->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}

//存入数据库
// echo $_POST['submit'];
if(isset($_POST['submit'])){
    $username = $_POST['username'];
    // echo $username;
    $password = sha1($_POST['password']);
    // echo $password;
    $tel = $_POST['tel'];
    // echo $tel;
    $email = $_POST['email'];
    // echo $email;
    // print("$username,$password,$tel,$email");
    $conn->query("INSERT registr_user VALUES(null,'$username','$password','$tel','$email',NOW())");
    //设置页面跳转
    header('location:http://10.31.152.18/js2005/project/src/html/login.html');
}
