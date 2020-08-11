<?php
header('content-type:text/html;charset=utf-8');//设置字符编码。

define('host','localhost');//主机名
define('username','root');//用户名
define('password','');//密码
define('dbname','2005');//数据库

$conn = @new mysqli(host,username,password,dbname);
if($conn->connect_error){
    die('数据库连接失败'.$conn->connect_error);
}
// else{
//     echo '数据库连接成功！';
// };

// $conn->query('insert registr_user values()');
