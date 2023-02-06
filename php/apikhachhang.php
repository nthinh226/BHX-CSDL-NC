<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
$event = $_POST['event'];
switch ($event) {
    case "deleteImage":
        $filelinkanh = $_POST['linkdata'];
        if ($filelinkanh == "") {
            $res["success"] = 1;
        } else {
            $filelinkanh = "../images/" . $filelinkanh;
            if (unlink($filelinkanh)) {
                $res["success"] = 1;
            } else {
                $res["success"] = 2; //file not exsit
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "insertKH":
        // $makh = $_POST['makh'];
        $hotenkh = $_POST['hotenkh'];
        $gioitinhkh = $_POST['gioitinhkh'];
        $ngaysinhkh = $_POST['ngaysinhkh'];
        $sdtkh = $_POST['sdtkh'];
        $emailkh = $_POST['emailkh'];
        $matkhaukh = md5($_POST['matkhaukh']);
        $diachigiaohangkh = $_POST['diachigiaohangkh'];
        $avatarkh = $_POST['avatarkh'];

        //tăng số tự động
        $tang_so_tt = mysqli_query($conn, "SELECT max(ExtractNumber(k.makh)) AS maxstt from khachhang k");
        $row = mysqli_fetch_array($tang_so_tt);
        if ($row > 0) {
            $stt = intval($row['maxstt']);
            $stt += 1;
            $makh = "KH" . $stt;
        } else {
            $makh = "KH1";
        }
        //tăng số tự động

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from khachhang where makh='" . $makh . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO khachhang(makh,hotenkh,gioitinh,ngaysinh,sdt,email,matkhau,diachigiaohang,avatar) VALUES ('" . $makh . "','" . $hotenkh . "','" . $gioitinhkh . "','" . $ngaysinhkh . "','" . $sdtkh . "','" . $emailkh . "','" . $matkhaukh . "','" . $diachigiaohangkh . "','" . $avatarkh . "')";
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
    case "updateKH":
        $makh = $_POST['makh'];
        $hotenkh = $_POST['hotenkh'];
        $gioitinhkh = $_POST['gioitinhkh'];
        $ngaysinhkh = $_POST['ngaysinhkh'];
        $sdtkh = $_POST['sdtkh'];
        $emailkh = $_POST['emailkh'];
        $matkhaukh = md5($_POST['matkhaukh']);
        $diachigiaohangkh = $_POST['diachigiaohangkh'];
        $avatarkh = $_POST['avatarkh'];

        //update thông tin khachhang
        $sql = "UPDATE khachhang SET hotenkh = '" . $hotenkh .  "', gioitinh = '" . $gioitinhkh . "', ngaysinh = '" . $ngaysinhkh . "', sdt = '" . $sdtkh . "', email = '" . $emailkh . "', matkhau = '" . $matkhaukh . "', diachigiaohang = '" . $diachigiaohangkh ."', avatar = '" . $avatarkh . "' WHERE makh = '" . $makh . "'";
        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) { //có thay đổi dữ liệu
                $res["success"] = 1;
            } else {

                $res["success"] = 0; //Không thành công
            }
        } else {
            $res["success"] = 0;  //Không thành công
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "deleteKH":
        $makh = $_POST['makh'];
        $rs = mysqli_query($conn, "select count(*) as 'total' from dondathang where makh = '" . $makh . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là makh đã được dùng trong bảng dondathang
        } else {
            $sql = "DELETE FROM khachhang WHERE makh = '" . $makh . "'";
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
    case "getALLKH":
        $mang = array();
        //phân trang
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số số trang mà client
        $search = $_POST['search']; //Tìm kiếm dữ liệu
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "select kh.makh, kh.hotenkh, kh.gioitinh, kh.ngaysinh, kh.sdt, kh.email, kh.matkhau, kh.diachigiaohang, kh.avatar from khachhang kh where (kh.makh like '%" . $search . "%' or kh.hotenkh like '%" . $search . "%') order by kh.makh asc " . $limit);

        while ($rows = mysqli_fetch_array($sql)) {
            /*
            hàm mysqli_fetch_array() sẽ tìm và trả về một dòng kết quả 
            của một truy vấn MySQL nào đó dưới dạng một mảng kết hợp, mảng liên tục hoặc cả hai.
            */

            $usertemp['makh'] = $rows['makh'];
            $usertemp['hotenkh'] = $rows['hotenkh'];
            $usertemp['gioitinhkh'] = $rows['gioitinh'];
            $usertemp['ngaysinhkh'] = $rows['ngaysinh'];
            $usertemp['sdtkh'] = $rows['sdt'];
            $usertemp['emailkh'] = $rows['email'];
            $usertemp['matkhaukh'] = $rows['matkhau'];
            $usertemp['diachigiaohangkh'] = $rows['diachigiaohang'];
            $usertemp['avatarkh'] = $rows['avatar'];

            array_push($mang, $usertemp);
        }
        //select s.makh, s.mancc, s.tennv, s.maloai, s.gianv, s.giakhuyenmai, s.mota, s.hinhanhnv, ncc.tenncc, tl.tentl from khachhang s ,nhacungcap ncc, theloai tl where s.maloai = tl.matl and s.mancc = ncc.mancc and (s.makh like '%" . $search . "%' or s.tennv like '%" . $search . "%') order by s.makh asc "
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from khachhang kh where (kh.makh like '%" . $search . "%' or kh.hotenkh like '%" . $search . "%') order by kh.makh asc");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        # code...
        break;
}
