<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
$event = $_POST['event'];
switch ($event) {
    case "insertNCC":
        $mancc = $_POST['mancc'];
        $tenncc = $_POST['tenncc'];
        $diachincc = $_POST['diachincc'];
        $emailncc = $_POST['emailncc'];
        $sdtncc = $_POST['sdtncc'];
        $faxncc = $_POST['faxncc'];
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  nhacungcap where mancc='" . $mancc . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO nhacungcap(mancc,tenncc,diachi,email,sdt,fax) VALUE ('" . $mancc . "', '" . $tenncc . "','" . $diachincc . "','" . $emailncc . "','" . $sdtncc . "','" . $faxncc . "')";
            if (mysqli_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) { //có thay đổi dữ liệu

                    $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                    $res["success"] = 0; //Không thành công
                }
            } else {
                $res["success"] = 0;  //Không thành công
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "updateNCC":
        $mancc = $_POST['mancc'];
        $tenncc = $_POST['tenncc'];
        $diachincc = $_POST['diachincc'];
        $emailncc = $_POST['emailncc'];
        $sdtncc = $_POST['sdtncc'];
        $faxncc = $_POST['faxncc'];
        $sql = "UPDATE nhacungcap SET tenncc = '" . $tenncc . "', diachi = '" . $diachincc . "', email = '" . $emailncc . "', sdt = '" . $sdtncc . "', fax = '" . $faxncc . "' WHERE mancc = '" . $mancc . "'";
        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) {
                $res["success"] = 1; //update dữ liệu thành công
            } else {
                $res["success"] = 0; //Không thành công
            }
        } else {
            $res["success"] = 0;  //Không thành công
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "deleteNCC":
        $mancc = $_POST['mancc'];
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sanpham where mancc='" . $mancc . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là matth đã được dùng trong bảng sanpham
        } else {
            $sql = "DELETE FROM nhacungcap WHERE mancc = '" . $mancc . "'";
            if (mysqli_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) {
                    $res["success"] = 1; //xoá dữ liệu thành công
                } else {
                    $res["success"] = 0; //không thành công
                }
            } else {
                $res["success"] = 0;  //không thành công
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
        
    case "getALLNCC":
        $mang = array();
        $sql = mysqli_query($conn, "select * from nhacungcap");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['mancc'] = $rows['mancc'];
            $usertemp['tenncc'] = $rows['tenncc'];
            $usertemp['diachincc'] = $rows['diachi'];
            $usertemp['emailncc'] = $rows['email'];
            $usertemp['sdtncc'] = $rows['sdt'];
            $usertemp['faxncc'] = $rows['fax'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        # code...
        break;
}
