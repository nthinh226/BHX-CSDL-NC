<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
$event = $_POST['event'];
switch ($event) {
    case "insertTL":
        $matl = $_POST['matl'];
        $tentl = $_POST['tentl'];
        $motatl = $_POST['motatl'];
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  theloai where matl='" . $matl . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO theloai(matl, tentl, mota) VALUE ('" . $matl . "', '" . $tentl . "','" . $motatl . "')";
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
    case "updateTL":
        $matl = $_POST['matl'];
        $tentl = $_POST['tentl'];
        $motatl = $_POST['motatl'];
        //Viết câu lệnh update có điều kiện where matl=biến client
        $sql = "UPDATE theloai SET tentl = '" . $tentl . "', mota = '" . $motatl . "' WHERE matl = '" . $matl . "'";
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
    case "deleteTL":
        $matl = $_POST['matl'];
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sanpham where maloai='" . $matl . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là matl đã được dùng trong bảng sách
        } else {
            $sql = "DELETE FROM theloai WHERE matl = '" . $matl . "'";
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
    case "getALLTL":
        $mang = array();
        $sql = mysqli_query($conn, "select * from theloai");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['matl'] = $rows['matl']; //{'matl':'TH','tentl':'tin hoc'}
            $usertemp['tentl'] = $rows['tentl'];  //{'matl':'TH','tentl':'tin hoc'}
            $usertemp['motatl'] = $rows['mota'];
            array_push($mang, $usertemp); //[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]
        }
        $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        # code...
        break;
}
