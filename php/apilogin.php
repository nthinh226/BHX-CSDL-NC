<?php
require_once("server.php"); //add code php file server vào trong file api.php
$mang = array();
$tendangnhap = $_POST['tendangnhap'];
// $matkhau = md5($_POST['matkhau']);
$rs = mysqli_query($conn, "select * from nhanvien where  sdt='" . $tendangnhap . "'");
if (mysqli_num_rows($rs) > 0) {
    while ($rows = mysqli_fetch_array($rs)) {
        $usertemp['manv'] = $rows['manv'];
        $usertemp['hotennv'] = $rows['hotennv'];
        $usertemp['ngaysinh'] = $rows['ngaysinh'];
        $usertemp['gioitinh'] = $rows['gioitinh'];
        $usertemp['sdt'] = $rows['sdt'];
        $usertemp['email'] = $rows['email'];
        $usertemp['tendangnhap'] = $rows['tendangnhap'];
        $usertemp['matkhau'] = $rows['matkhau'];
        $usertemp['avatar'] = $rows['avatar'];
        $usertemp['quyen'] = $rows['quyen'];
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
mysqli_close($conn);
