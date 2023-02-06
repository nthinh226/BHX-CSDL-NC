<?php
$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = "cuahangmaytinh";
$conn = mysqli_connect($hostname, $username, $password, $dbname,3307);

// tránh bị lỗi font khi update
mysqli_set_charset($conn, 'UTF8');
// Check connection
if (mysqli_connect_errno())
{
 echo "Kết nối thất bại vì: " . mysqli_connect_error();
}
