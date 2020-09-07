<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
require 'conn.php'; //连接数据库

//验证手机号
if(isset($_POST['tel'])){
    $tel = $_POST['tel'];
    // $password = $_POST['pass'];
    $relut=$conn->query("SELECT * FROM registr_user WHERE tel='$tel'");
    // echo $relut->fetch_assoc();
    if($relut->fetch_assoc()){
        // echo count($relut);
        // echo $relut->fetch_array();
        // echo $relut[0];
        echo true;
    }else{
        echo false;
    }
}

//验证账号密码
if(isset($_POST['name'])&&isset($_POST['pass'])){
    $username = $_POST['name'];
    $password = $_POST['pass'];
    $relut=$conn->query("SELECT * FROM registr_user WHERE username='$username' and password='$password'");
    if($relut->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

