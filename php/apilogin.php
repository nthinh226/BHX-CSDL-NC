<?php
require_once("server.php"); //add code php file server vào trong file api.php
$mang = array();

// $tendangnhap = "0837560022";
$tendangnhap = $_POST['tendangnhap'];


// SELECT query
$sql = "select * from nhanvien where sdt='$tendangnhap'";
$stmt = sqlsrv_query($conn, $sql, array(), array( "Scrollable" => 'static' ));
// Check for errors
if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
}
echo(sqlsrv_num_rows($stmt ));

if (sqlsrv_num_rows($stmt ) > 0) {

    while ($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $usertemp['manv'] = $rows['MaNV'];
        $usertemp['hotennv'] = $rows['TenNV'];
        $usertemp['sdt'] = $rows['SDT'];
        $usertemp['macn'] = $rows['MaCN'];
        array_push($mang, $usertemp);
    }
    $jsondata['success'] = 1;
    $jsondata['items'] = $mang;
    echo json_encode($jsondata);
} else {
    $jsondata['success'] = 0;
    $jsondata['items'] = $mang;
    echo json_encode($jsondata);
}
sqlsrv_close($conn);
