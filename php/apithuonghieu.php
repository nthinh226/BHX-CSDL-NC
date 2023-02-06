<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
$event = $_POST['event'];
switch ($event) {
    case "insertTH":
        $math = $_POST['math'];
        $tenth = $_POST['tenth'];
        $emailth = $_POST['emailth'];
        $sdtth = $_POST['sdtth'];
        $faxth = $_POST['faxth'];
        $diachith = $_POST['diachith'];
        $websiteth = $_POST['websiteth'];
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  thuonghieu where math='" . $math . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO thuonghieu(math, tenth, email, sdt, fax, diachi, website) VALUE ('" . $math . "', '" . $tenth . "','" . $emailth ."','" . $sdtth ."','" . $faxth ."','" . $diachith ."','" . $websiteth . "')";
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
    case "updateTH":
        $math = $_POST['math'];
        $tenth = $_POST['tenth'];
        $emailth = $_POST['emailth'];
        $sdtth = $_POST['sdtth'];
        $faxth = $_POST['faxth'];
        $diachith = $_POST['diachith'];
        $websiteth = $_POST['websiteth'];
        $sql = "UPDATE thuonghieu SET tenth = '" . $tenth . "', email = '" . $emailth . "', sdt = '" . $sdtth ."', fax = '" . $faxth ."', diachi = '" . $diachith ."', website = '" . $websiteth . "' WHERE math = '" . $math . "'";
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
    case "deleteTH":
        $math = $_POST['math'];
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from thuonghieusanpham where mathuonghieu='" . $math . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là matth đã được dùng trong bảng thuonghieu
        } else {
            $sql = "DELETE FROM thuonghieu WHERE math = '" . $math . "'";
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
    case "getALLTH":
        $mang = array();
        $sql = mysqli_query($conn, "select * from thuonghieu");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['math'] = $rows['math']; 
            $usertemp['tenth'] = $rows['tenth'];  
            $usertemp['emailth'] = $rows['email'];
            $usertemp['sdtth'] = $rows['sdt']; 
            $usertemp['faxth'] = $rows['fax'];  
            $usertemp['diachith'] = $rows['diachi'];
            $usertemp['websiteth'] = $rows['website'];
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
