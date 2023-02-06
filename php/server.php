<?php
// $hostname = 'localhost';
// $username = 'root';
// $password = '';
// $dbname = "cuahangmaytinh";
// $conn = mysqli_connect($hostname, $username, $password, $dbname,3307);

// // tránh bị lỗi font khi update
// mysqli_set_charset($conn, 'UTF8');
// // Check connection
// if (mysqli_connect_errno())
// {
//  echo "Kết nối thất bại vì: " . mysqli_connect_error();
// }

$serverName = "DESKTOP-H3U5N9G"; 
$connectionInfo = array( "Database"=>"DB_BinhThanh", "UID"=>"sa", "PWD"=>"0","CharacterSet" =>"UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
//     // SELECT query
// $sql = "select * from nhanvien where sdt='0837560022'";
// $stmt = sqlsrv_query($conn, $sql);

// // Check for errors
// if (!$stmt) {
//     die(print_r(sqlsrv_errors(), true));
// }

// // Fetch the result
// $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
// // Return the result as JSON
// header("Content-Type: application/json");
// echo json_encode($row);
// print_r($row);

     // echo "Connection established.";
}else{
     // echo "Connection could not be established.";
     die( print_r( sqlsrv_errors(), true));
}

?>