<?php

require 'conn.php'; //连接数据库

$sid = $_POST['sid'];

$result = $conn->query("SELECT * FROM taobaogoods WHERE sid=$sid");
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
};
echo json_encode($arr);