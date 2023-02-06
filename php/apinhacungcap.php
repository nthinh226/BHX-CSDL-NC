<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
// $event = $_POST['event'];
$event = 'getALLNCC';

switch ($event) {
    case "insertNCC":
        $mancc = $_POST['mancc'];
        $tenncc = $_POST['tenncc'];
        $diachincc = $_POST['diachincc'];
        $emailncc = $_POST['emailncc'];
        $sdtncc = $_POST['sdtncc'];
        $faxncc = $_POST['faxncc'];
        $rs = sqlsrv_query($conn, "select COUNT(*) as 'total' from  nhacungcap where mancc='" . $mancc . "' ");
        $row = sqlsrv_fetch_array($rs);
        if ((int) $row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO nhacungcap(mancc,tenncc,diachi,email,sdt,fax) VALUE ('" . $mancc . "', '" . $tenncc . "','" . $diachincc . "','" . $emailncc . "','" . $sdtncc . "','" . $faxncc . "')";
            if (sqlsrv_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) { //có thay đổi dữ liệu

                    $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                    $res["success"] = 0; //Không thành công
                }
            } else {
                $res["success"] = 0; //Không thành công
            }
        }
        echo json_encode($res);
        sqlsrv_close($conn);
        break;

    case "updateNCC":
        $mancc = $_POST['mancc'];
        $tenncc = $_POST['tenncc'];
        $diachincc = $_POST['diachincc'];
        $emailncc = $_POST['emailncc'];
        $sdtncc = $_POST['sdtncc'];
        $faxncc = $_POST['faxncc'];
        $sql = "UPDATE nhacungcap SET tenncc = '" . $tenncc . "', diachi = '" . $diachincc . "', email = '" . $emailncc . "', sdt = '" . $sdtncc . "', fax = '" . $faxncc . "' WHERE mancc = '" . $mancc . "'";
        if (sqlsrv_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) {
                $res["success"] = 1; //update dữ liệu thành công
            } else {
                $res["success"] = 0; //Không thành công
            }
        } else {
            $res["success"] = 0; //Không thành công
        }
        echo json_encode($res);
        sqlsrv_close($conn);
        break;

    case "deleteNCC":
        $mancc = $_POST['mancc'];
        $rs = sqlsrv_query($conn, "select COUNT(*) as 'total' from sanpham where mancc='" . $mancc . "' ");
        $row = sqlsrv_fetch_array($rs);
        if ((int) $row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là matth đã được dùng trong bảng sanpham
        } else {
            $sql = "DELETE FROM nhacungcap WHERE mancc = '" . $mancc . "'";
            if (sqlsrv_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) {
                    $res["success"] = 1; //xoá dữ liệu thành công
                } else {
                    $res["success"] = 0; //không thành công
                }
            } else {
                $res["success"] = 0; //không thành công
            }
        }
        echo json_encode($res);
        sqlsrv_close($conn);
        break;

    case "getALLNCC":
        $mang = array();
        $sql = sqlsrv_query($conn, "select * from nhacungcap");
        while ($rows = sqlsrv_fetch_array($sql)) {
            $usertemp['mancc'] = $rows['MaNCC'];
            $usertemp['tenncc'] = $rows['TenNCC'];
            $usertemp['diachincc'] = $rows['DiaChi'];
            $usertemp['sdtncc'] = $rows['SDT'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        sqlsrv_close($conn);
        break;

    default:
        # code...
        break;
}