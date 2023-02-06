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
    case "updatepass":
        $tendangnhapnv = $_POST['tendangnhap'];
        $matkhaunv = md5($_POST['matkhau']);
        $sql = "update nhanvien set matkhau='$matkhaunv' where tendangnhap='" . $tendangnhapnv . "'";

        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        } else {
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "insertNV":
        // $manv = $_POST['manv'];
        $hotennv = $_POST['hotennv'];
        $ngaysinhnv = $_POST['ngaysinhnv'];
        $gioitinhnv = $_POST['gioitinhnv'];
        $sdtnv = $_POST['sdtnv'];
        $emailnv = $_POST['emailnv'];
        $tendangnhapnv = $_POST['tendangnhapnv'];
        $matkhaunv = md5($_POST['matkhaunv']);
        $avatarnv = $_POST['avatarnv'];

        //tăng số tự động
        $tang_so_tt = mysqli_query($conn, "SELECT max(ExtractNumber(nv.manv)) AS maxstt from nhanvien nv");
        $row = mysqli_fetch_array($tang_so_tt);
        if ($row > 0) {
            $stt = intval($row['maxstt']);
            $stt += 1;
            $manv = "NV" . $stt;
        } else {
            $manv = "NV1";
        }
        //tăng số tự động

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from nhanvien where manv='" . $manv . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO nhanvien(manv, hotennv, ngaysinh, gioitinh, sdt, email, tendangnhap, matkhau, avatar) VALUES ('" . $manv . "','" . $hotennv . "','" . $ngaysinhnv . "','" . $gioitinhnv . "','" . $sdtnv . "','" . $emailnv . "','" . $tendangnhapnv . "','" . $matkhaunv . "','" . $avatarnv . "')";
            if (mysqli_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) { //có thay đổi dữ liệu
                    if (mysqli_affected_rows($conn)) {
                        $res["success"] = 1; //Insert dữ liệu thành công
                    } else {
                        $res["success"] = 0; //Không thành công
                    }
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
    case "updateNV":
        $manv = $_POST['manv'];
        $hotennv = $_POST['hotennv'];
        $ngaysinhnv = $_POST['ngaysinhnv'];
        $gioitinhnv = $_POST['gioitinhnv'];
        $sdtnv = $_POST['sdtnv'];
        $emailnv = $_POST['emailnv'];
        $tendangnhapnv = $_POST['tendangnhapnv'];
        $avatarnv = $_POST['avatarnv'];

        //update thông tin nhanvien
        $sql = "UPDATE nhanvien SET hotennv = '" . $hotennv . "', ngaysinh = '" . $ngaysinhnv . "', gioitinh = '" . $gioitinhnv . "', sdt = '" . $sdtnv . "', email = '" . $emailnv . "', avatar = '" . $avatarnv . "' WHERE manv = '" . $manv . "'";
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
    case "deleteNV":
        $manv = $_POST['manv'];
        $rs = mysqli_query($conn, "select count(*) as 'total' from dondathang where manv = '" . $manv . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là manv đã được dùng trong bảng dondathang
        } else {
            $sql = "DELETE FROM nhanvien WHERE manv = '" . $manv . "'";
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
    case "getALLNV":
        $mang = array();
        //phân trang
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số số trang mà client
        $search = $_POST['search']; //Tìm kiếm dữ liệu
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "select nv.manv, nv.hotennv, nv.ngaysinh, nv.gioitinh, nv.sdt, nv.email, nv.tendangnhap, nv.matkhau, nv.avatar from nhanvien nv where (nv.manv like '%" . $search . "%' or nv.hotennv like '%" . $search . "%') order by nv.manv asc " . $limit);

        while ($rows = mysqli_fetch_array($sql)) {
            /*
            hàm mysqli_fetch_array() sẽ tìm và trả về một dòng kết quả 
            của một truy vấn MySQL nào đó dưới dạng một mảng kết hợp, mảng liên tục hoặc cả hai.
            */

            $usertemp['manv'] = $rows['manv'];
            $usertemp['hotennv'] = $rows['hotennv'];
            $usertemp['ngaysinhnv'] = $rows['ngaysinh'];
            $usertemp['gioitinhnv'] = $rows['gioitinh'];
            $usertemp['sdtnv'] = $rows['sdt'];
            $usertemp['emailnv'] = $rows['email'];
            $usertemp['tendangnhapnv'] = $rows['tendangnhap'];
            $usertemp['matkhaunv'] = $rows['matkhau'];
            $usertemp['avatarnv'] = $rows['avatar'];

            array_push($mang, $usertemp);
        }
        //select s.manv, s.mancc, s.tennv, s.maloai, s.gianv, s.giakhuyenmai, s.mota, s.hinhanhnv, ncc.tenncc, tl.tentl from nhanvien s ,nhacungcap ncc, theloai tl where s.maloai = tl.matl and s.mancc = ncc.mancc and (s.manv like '%" . $search . "%' or s.tennv like '%" . $search . "%') order by s.manv asc "
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from nhanvien nv where (nv.manv like '%" . $search . "%' or nv.hotennv like '%" . $search . "%') order by nv.manv asc");
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
