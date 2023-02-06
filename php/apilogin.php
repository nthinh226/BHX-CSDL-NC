<?php
require_once("server.php"); //add code php file server vào trong file api.php
$mang = array();

$tendangnhap = "0837560022";
// $tendangnhap = $_POST['tendangnhap'];


// SELECT query
$sql = "select * from nhanvien where sdt='".$tendangnhap."'";
$stmt = sqlsrv_query($conn, $sql, array(), array( "Scrollable" => 'static' ));
// Check for errors
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}
// echo(sqlsrv_num_rows($stmt ));

header("Content-Type: application/json");
$tram = "";
if (sqlsrv_num_rows($stmt ) > 0) {

    while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $usertemp['manv'] = $rows['MaNV'];
        $usertemp['hotennv'] = $rows['TenNV'];
        $usertemp['sdt'] = $rows['SDT'];
        $usertemp['macn'] = $rows['MaCN'];
        $tram = $rows['MaCN'];

        array_push($mang, $usertemp);
    }
    $jsondata['success'] = 1;
    $jsondata['items'] = $mang;

    echo json_encode($jsondata);

    // connect db con
    // Close the connection
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
    if($tram=="CN_BT_01"){
        $serverName = "DESKTOP-H3U5N9G\CON_1"; 
       
    }else if($tram=="CN_BT_02"){
        $serverName = "DESKTOP-H3U5N9G\CON_2"; 
    };
    $connectionInfo = array( "Database"=>"DB_BinhThanh", "UID"=>"sa", "PWD"=>"0","CharacterSet" =>"UTF-8");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);
        if ( $conn ) {
            // echo "Connection established.";
        } else{
        die( print_r( sqlsrv_errors(), true));
    }

} else {
    $jsondata['success'] = 0;
    $jsondata['items'] = $mang;
    echo json_encode($jsondata);
}
sqlsrv_close($conn);
