<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
// $event = $_POST['event'];
$event = "getALLSP";
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
    case "insertSP":
        // $masp = $_POST['masp'];
        $masp = '';
        $manccsp = $_POST['manccsp'];
        $tensp = $_POST['tensp'];
        $maloaisp = $_POST['maloaisp'];
        $mathsp = $_POST['mathsp'];
        $giasp = floatval($_POST['giasp']);
        $giakhuyenmaisp = floatval($_POST['giakhuyenmaisp']);
        $motasp = $_POST['motasp'];
        $hinhanhsp = $_POST['hinhanhsp'];

        //tăng số tự động
        $tang_so_tt = mysqli_query($conn, "SELECT max(ExtractNumber(sanpham.masp)) AS maxstt from sanpham where sanpham.maloai like '" . $maloaisp . "%'");
        $row = mysqli_fetch_array($tang_so_tt);
        if ($row > 0) {
            $stt = intval($row['maxstt']);
            $stt += 1;
            $masp = $maloaisp . $mathsp . $stt;
        } else {
            $masp = $maloaisp . $mathsp . "1";
        }
        //tăng số tự động

        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  sanpham where masp='" . $masp . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO sanpham(masp, mancc, tensp, maloai, giasp, giakhuyenmai, mota, hinhanhsp) VALUES ('" . $masp . "','" . $manccsp . "','" . $tensp . "','" . $maloaisp . "'," . $giasp . "," . $giakhuyenmaisp . ",'" . $motasp . "','" . $hinhanhsp . "')";
            if (mysqli_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) { //có thay đổi dữ liệu
                    if ($mathsp == "") {
                        $res["success"] = 3; //Insert dữ liệu sản phẩm không có thương hiệu thành công
                    } else {
                        $sql1 = "INSERT INTO thuonghieusanpham(mathuonghieu, masanpham) VALUE ('" . $mathsp . "','" . $masp . "')";
                        if (mysqli_query($conn, $sql1)) {
                            $res["success"] = 1; //Insert dữ liệu thành công
                        } else {
                            $res["success"] = 0; //Không thành công
                        }
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
    case "updateSP":
        $masp = $_POST['masp'];
        $manccsp = $_POST['manccsp'];
        $tensp = $_POST['tensp'];
        $maloaisp = $_POST['maloaisp'];
        $mathsp = $_POST['mathsp'];
        $giasp = floatval($_POST['giasp']);
        $giakhuyenmaisp = floatval($_POST['giakhuyenmaisp']);
        $motasp = $_POST['motasp'];
        $hinhanhsp = $_POST['hinhanhsp'];

        //update or insert thuonghieusanpham
        $rsthsp = mysqli_query($conn, "select COUNT(*) as 'total' from  sanpham s, thuonghieusanpham thsp where s.masp = thsp.masanpham and masp='" . $masp . "' ");
        $row = mysqli_fetch_array($rsthsp);
        if ((int)$row['total'] > 0) { // kiểm tra mã sp có trong thuonghieusanpham chưa
            $sql1 = "UPDATE thuonghieusanpham SET mathuonghieu = '" . $mathsp . "' WHERE masanpham = '" . $masp . "'";
            if (mysqli_query($conn, $sql1)) {
                if (mysqli_affected_rows($conn)) {
                    $res["success"] = 1; //update dữ liệu thành công
                } else {
                    $rsmasp = mysqli_query($conn, "select thsp.mathuonghieu from  sanpham s, thuonghieusanpham thsp where s.masp = thsp.masanpham and masp='" . $masp . "' ");
                    $row = mysqli_fetch_array($rsmasp);
                    if ($row['mathuonghieu'] == $mathsp) {
                        $res["success"] = 1; //update dữ liệu thành công
                    } else {
                        $res["success"] = 0; //Không thành công
                    }
                }
            } else {
                $res["success"] = 0; //Không thành công
            }
        } else { //nếu chưa thì insert
            $sql1 = "INSERT INTO thuonghieusanpham(mathuonghieu, masanpham) VALUE ('" . $mathsp . "','" . $masp . "')";
            if (mysqli_query($conn, $sql1)) {
                if (mysqli_affected_rows($conn)) {
                    $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                    $res["success"] = 0; //Không thành công
                }
            } else {
                $res["success"] = 0; //Không thành công
            }
        }

        //update thông tin sanpham
        $sql = "UPDATE sanpham SET mancc = '" . $manccsp . "', tensp = '" . $tensp . "', maloai = '" . $maloaisp . "', giasp = '" . $giasp . "', giakhuyenmai = '" . $giakhuyenmaisp . "', mota = '" . $motasp . "', hinhanhsp = '" . $hinhanhsp ."', ngaycapnhat = '" . $currentTime . "' WHERE masp = '" . $masp . "'";
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
    case "deleteSP":
        $masp = $_POST['masp'];
        $hinhanhsp = $_POST['hinhanhsp'];
        $rs = mysqli_query($conn, "select count(*) as 'total' from (select masanpham as masp from thuonghieusanpham UNION select masp as sp from chitietdh) as truyvancon1 where masp = '" . $masp . "' ");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //có nghĩa là matth đã được dùng trong bảng sanpham
        } else {
            $sql = "DELETE FROM sanpham WHERE masp = '" . $masp . "'";
            if (mysqli_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) {
                    $res["success"] = 1; //xoá dữ liệu thành công
                    //xoá hình trong thư mục
                    if ($hinhanhsp == "" || $hinhanhsp == "null") {
                        $res["success"] = 1;
                    } else {
                        $hinhanhsp = "../images/" . $hinhanhsp;
                        if (unlink($hinhanhsp)) {
                            $res["success"] = 1;
                        }
                    }
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
    case "getALLSP":
        $mang = array();
        //phân trang
        // $record = $_POST['record']; //số dòng sẽ lấy về từ server
        // $page = $_POST['page']; //số số trang mà client
        // $search = $_POST['search']; //Tìm kiếm dữ liệu
        // $vt = $page * $record;  //page=1,record=2
        // $limit = 'limit ' . $vt . ' , ' . $record;
        // $sql = mysqli_query($conn, "select s.*, ncc.tenncc, tl.tentl, th.tenth, th.math from sanpham s, thuonghieusanpham thsp, thuonghieu th, theloai tl, nhacungcap ncc WHERE s.mancc = ncc.mancc and thsp.masanpham = s.masp and th.math = thsp.mathuonghieu and s.maloai = tl.matl");
        // $sql = mysqli_query($conn, "select s.masp, s.mancc, s.tensp, s.maloai, s.giasp, s.giakhuyenmai, s.mota, s.hinhanhsp, ncc.tenncc, tl.tentl from sanpham s ,nhacungcap ncc, theloai tl where s.maloai = tl.matl and s.mancc = ncc.mancc and (s.masp like '%" . $search . "%' or s.tensp like '%" . $search . "%') order by s.masp asc " . $limit);
        $query = "select s.mamh, s.tenmh, s.loaimh, s.dvtinh, s.hinhanh from sanpham s";
        $sql = sqlsrv_query($conn,$query,array(), array( "Scrollable" => 'static' ));
        if (!$stmt) {
            die(print_r(sqlsrv_errors(), true));
        }

        header("Content-Type: application/json");

        if (sqlsrv_num_rows($stmt ) > 0) {
            while ($rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
                //thuonghieusanpham
                /*
                hàm mysqli_fetch_array() sẽ tìm và trả về một dòng kết quả 
                của một truy vấn MySQL nào đó dưới dạng một mảng kết hợp, mảng liên tục hoặc cả hai.
                */

                $usertemp['mamh'] = $rows['mamh'];
                $usertemp['tenmh'] = $rows['tenmh'];
                $usertemp['loaimh'] = $rows['loaimh'];
                $usertemp['dvtinh'] = $rows['dvtinh'];
                $usertemp['hinhanh'] = $rows['hinhanh'];
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
        //select s.masp, s.mancc, s.tensp, s.maloai, s.giasp, s.giakhuyenmai, s.mota, s.hinhanhsp, ncc.tenncc, tl.tentl from sanpham s ,nhacungcap ncc, theloai tl where s.maloai = tl.matl and s.mancc = ncc.mancc and (s.masp like '%" . $search . "%' or s.tensp like '%" . $search . "%') order by s.masp asc "
        // $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sanpham s ,nhacungcap ncc, theloai tl where s.maloai = tl.matl and s.mancc = ncc.mancc and (s.masp like '%" . $search . "%' or s.tensp like '%" . $search . "%') order by s.masp asc");
        // $row = mysqli_fetch_array($rs);
        // $jsonData['total'] = (int)$row['total'];
        // $jsonData['totalpage'] = ceil($row['total'] / $record);
        // $jsonData['page'] = (int)$page;
        // $jsonData['items'] = $mang;
        // echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        # code...
        break;
}
