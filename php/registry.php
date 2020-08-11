<?php

require 'conn.php'; //连接数据库

// 检测用户名是否存在
if (isset($_POST["name"])) {
    $name = $_POST["name"];
    // echo $name;
    $relut = $conn->query("SELECT * FROM registr_user WHERE username='$name'");
    // echo $relut->fetch_assoc();
    if ($relut->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}

//存入数据库
if(isset($_POST['submit'])){
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    // print("$username,$password,$tel,$email");
    $conn->query("INSERT registr_user VALUES(null,'$username','$password','$tel','$email',NOW())");

    //设置页面跳转
    header('location:http://localhost/js2005/login_registry/src/html/login.html');
}
