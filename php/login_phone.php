<?php

require 'conn.php'; //连接数据库

if(isset($_POST['tel'])){
    $tel = $_POST['tel'];
    // $password = $_POST['pass'];
    $relut=$conn->query("SELECT * FROM registr_user WHERE tel='$tel'");
    if($relut->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
