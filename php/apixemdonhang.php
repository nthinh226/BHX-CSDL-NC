<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
$currentTimeStamp = date('Y-m-d H:i:s', time());
$event = $_POST['event'];
switch ($event) {
    case "updateTrangThaiDH":
        $sodh = $_POST['sodh'];
        $trangthaidh = intval($_POST['trangthaidh']);
        $manv = $_POST['manv'];
        if ($trangthaidh == 1) {
            $sql = "UPDATE dondathang SET manv = '" . $manv . "', trangthaidh = " . $trangthaidh . ", ngaythuctegiao = '" . $currentTimeStamp . "' WHERE sodh = '" . $sodh . "'";
        } else {
            $sql = "UPDATE dondathang SET manv = '" . $manv . "', trangthaidh = '" . $trangthaidh . "' WHERE sodh = '" . $sodh . "'";
        }
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

    case "getALLDonHangTrongNgay":
        $mang = array();
        // $search = $_POST['search']; //Tìm kiếm dữ liệu
        //định dạng giờ
        // $f1 = "00:00:00";
        // $from = date('Y-m-d') . " " . $f1;
        // $t1 = "23:59:59";
        // $to = date('Y-m-d') . " " . $t1;
        $sql = sqlsrv_query($conn, "select v.sodh, v.makh, v.hotenkh, v.email, v.sdt, v.diachigiaohang, v.ngaydh, v.tongtien, v.trangthaidh from view_donhang v", array(), array( "Scrollable" => 'static' ));
        if (!$sql) {
            die(print_r(sqlsrv_errors(), true));
        }
        header("Content-Type: application/json");

        if (sqlsrv_num_rows($sql) > 0) {

            while ($rows = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                // $mangctsp = array();
                // $sqlctsp = mysqli_query($conn, "select c.masp, s.tensp from chitietdh c, sanpham s where c.masp = s.masp and c.sodh = '" . $rows['sodh'] . "'");
                // while ($rowctsp = mysqli_fetch_array($sqlctsp)) {
                //     $usersp['masp'] = $rowctsp['masp'];
                //     $usersp['tensp'] = $rowctsp['tensp'];
                //     array_push($mangctsp, $usersp);
                // }

                $usertemp['sodh'] = $rows['sodh'];
                $usertemp['makh'] = $rows['makh'];
                $usertemp['hotenkh'] = $rows['hotenkh'];
                $usertemp['email'] = $rows['email'];
                $usertemp['sdt'] = $rows['sdt'];
                $usertemp['diachigiaohang'] = $rows['diachigiaohang'];
                $usertemp['ngaydh'] = $rows['ngaydh'];
                $usertemp['tongtien'] = $rows['tongtien'];
                $usertemp['trangthaidh'] = $rows['trangthaidh'];
                $usertemp['chitietdh'] = $mangctsp;
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


        
        // $jsonData['items'] = $mang;
        // echo json_encode($jsonData);
        sqlsrv_close($conn);
        break;

    case "getALLSPDonHang":
        $mang = array();
        // $sodh = $_POST['sodh'];
        $sql = sqlsrv_query($conn, "select c.masp, s.tensp, c.soluong, c.giatien, c.giamgia, thanhtien(c.soluong,c.giatien,c.giamgia) as thanhtien, v.tongtien from chitietdh c, sanpham s, view_donhang v where c.sodh = v.sodh and c.masp = s.masp", array(), array( "Scrollable" => 'static' ));
        if (!$sql) {
            die(print_r(sqlsrv_errors(), true));
        }
        header("Content-Type: application/json");

        if (sqlsrv_num_rows($sql) > 0) {

            while ($rows = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                $usertemp['masp'] = $rows['masp'];
                $usertemp['tensp'] = $rows['tensp'];
                $usertemp['soluong'] = $rows['soluong'];
                $usertemp['giatien'] = $rows['giatien'];
                $usertemp['giamgia'] = $rows['giamgia'];
                $usertemp['thanhtien'] = $rows['thanhtien'];
                $usertemp['tongtien'] = $rows['tongtien'];
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


        // $jsonData['items'] = $mang;
        // echo json_encode($jsonData);
        sqlsrv_close($conn);
        break;

    case "getALLDonHangDangXuLy":
        $mang = array();
        // $search = $_POST['search']; //Tìm kiếm dữ liệu
        $sql = sqlsrv_query($conn, "select v.sodh, v.makh, v.hotenkh, v.email, v.sdt, v.diachigiaohang, v.ngaydh, v.tongtien, v.trangthaidh from view_donhang v where (v.trangthaidh = 0 or v.trangthaidh = 1)", array(), array( "Scrollable" => 'static' ));
        if (!$sql) {
            die(print_r(sqlsrv_errors(), true));
        }
        header("Content-Type: application/json");

        if (sqlsrv_num_rows($sql) > 0) {

            while ($rows = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                // $mangctsp = array();
                // $sqlctsp = mysqli_query($conn, "select c.masp, s.tensp from chitietdh c, sanpham s where c.masp = s.masp and c.sodh = '" . $rows['sodh'] . "'");
                // while ($rowctsp = mysqli_fetch_array($sqlctsp)) {
                //     $usersp['masp'] = $rowctsp['masp'];
                //     $usersp['tensp'] = $rowctsp['tensp'];
                //     array_push($mangctsp, $usersp);
                // }
                $usertemp['sodh'] = $rows['sodh'];
                $usertemp['makh'] = $rows['makh'];
                $usertemp['hotenkh'] = $rows['hotenkh'];
                $usertemp['email'] = $rows['email'];
                $usertemp['sdt'] = $rows['sdt'];
                $usertemp['diachigiaohang'] = $rows['diachigiaohang'];
                $usertemp['ngaydh'] = $rows['ngaydh'];
                $usertemp['tongtien'] = $rows['tongtien'];
                $usertemp['trangthaidh'] = $rows['trangthaidh'];
                $usertemp['chitietdh'] = $mangctsp;
                array_push($mang, $usertemp);
                // $mangctsp = null;
            }
            $jsondata['success'] = 1;
            $jsondata['items'] = $mang;
        
            echo json_encode($jsondata);
        } else {
            $jsondata['success'] = 0;
            $jsondata['items'] = $mang;
            echo json_encode($jsondata);
        }

        
        // $jsonData['items'] = $mang;
        // echo json_encode($jsonData);
        sqlsrv_close($conn);
        break;

    case "getALLDonHangHoanThanh":
        $mang = array();
        // $search = $_POST['search']; //Tìm kiếm dữ liệu
        $sql = sqlsrv_query($conn, "select v.sodh, v.makh, v.hotenkh, v.email, v.sdt, v.diachigiaohang, v.ngaydh, v.tongtien, v.trangthaidh from view_donhang v where (v.trangthaidh = 2 or v.trangthaidh = 3)", array(), array( "Scrollable" => 'static' ));
        if (!$sql) {
            die(print_r(sqlsrv_errors(), true));
        }
        header("Content-Type: application/json");

        if (sqlsrv_num_rows($sql) > 0) {

            while ($rows = sqlsrv_fetch_array($sql, SQLSRV_FETCH_ASSOC)) {
                // $mangctsp = array();
                // $sqlctsp = mysqli_query($conn, "select c.masp, s.tensp from chitietdh c, sanpham s where c.masp = s.masp and c.sodh = '" . $rows['sodh'] . "'");
                // while ($rowctsp = mysqli_fetch_array($sqlctsp)) {
                //     $usersp['masp'] = $rowctsp['masp'];
                //     $usersp['tensp'] = $rowctsp['tensp'];
                //     array_push($mangctsp, $usersp);
                // }
                $usertemp['sodh'] = $rows['sodh'];
                $usertemp['makh'] = $rows['makh'];
                $usertemp['hotenkh'] = $rows['hotenkh'];
                $usertemp['email'] = $rows['email'];
                $usertemp['sdt'] = $rows['sdt'];
                $usertemp['diachigiaohang'] = $rows['diachigiaohang'];
                $usertemp['ngaydh'] = $rows['ngaydh'];
                $usertemp['tongtien'] = $rows['tongtien'];
                $usertemp['trangthaidh'] = $rows['trangthaidh'];
                $usertemp['chitietdh'] = $mangctsp;
                array_push($mang, $usertemp);
                // $mangctsp = null;
            }
            $jsondata['success'] = 1;
            $jsondata['items'] = $mang;
        
            echo json_encode($jsondata);
        } else {
            $jsondata['success'] = 0;
            $jsondata['items'] = $mang;
            echo json_encode($jsondata);
        }

       
        // $jsonData['items'] = $mang;
        // echo json_encode($jsonData);
        sqlsrv_close($conn);
        break;
        
    case "getBaoCaoDoanhThu":
        $mang = array();
        $datestart = $_POST['datestart'];
        $dateend = $_POST['dateend'];
        $sql = mysqli_query($conn, "select v.ngay, v.sodon, v.tongtien from view_baocaodoanhthutheongay v where v.ngay between '" . $datestart . "' and '" . $dateend . "' order by v.ngay asc ");

        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['ngay'] = $rows['ngay'];
            $usertemp['sodon'] = $rows['sodon'];
            $usertemp['tongtien'] = $rows['tongtien'];
            array_push($mang, $usertemp);
        }

        //tổng tiền từ ngày - đến ngày -
        $sql_tongtien = mysqli_query($conn, "select sum(v.tongtien) as doanhthu from view_baocaodoanhthutheongay v where v.ngay between '" . $datestart . "' and '" . $dateend . "'");
        $row_tongtien = mysqli_fetch_array($sql_tongtien);
        $doanhthu=$row_tongtien['doanhthu'];
        $jsonData['items'] = $mang;
        $jsonData['doanhthu'] = $doanhthu;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    default:
        # code...
        break;
}
