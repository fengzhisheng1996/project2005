<?php

require 'conn.php'; //连接数据库

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
