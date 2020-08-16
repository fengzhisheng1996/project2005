<?php

require 'conn.php'; //连接数据库

$pagesize = 15; //声明一个变量，单个页面展示的数据条数。

$result = $conn->query("SELECT * FROM taobaogoods"); //获取所有的数据的结果集(记录集)  

$num = $result->num_rows; //记录集的总条数 
$pagenum = ceil($num / $pagesize); //获取页数

//获取前端的传来的页码，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//获取前端传来的页码
    $pagevalue = $_GET['page'];//将页面赋值给$pagevalue
} else {//前端没有传入页面 赋值1
    $pagevalue = 1;
}
//计算limit第一个参数的结果。返回数据的偏移值。
$page = ($pagevalue - 1) * $pagesize;

//根据limit获取对应的条数的数据。
//$res:获取的结果集(输出json即可)
$res = $conn->query("SELECT * FROM taobaogoods LIMIT $page,$pagesize");


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口

// $result = $conn->query("SELECT * FROM taobaogoods");
// $arr = array();
// for($i=0;$i<$result->num_rows;$i++){
//     $arr[$i]=$result->fetch_assoc();
// };
// echo json_encode($arr);