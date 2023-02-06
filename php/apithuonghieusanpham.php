<?php
require_once("server.php");
date_default_timezone_set('Asia/Ho_Chi_Minh'); // Thay đổi theo múi giờ
$currentTime = date('d-m-Y h:i:s A', time());
$event = $_POST['event'];
switch ($event) {
    case "deleteTHSP":
        $masp = $_POST['masp'];
        $math = $_POST['math'];
        $sql = "DELETE FROM thuonghieusanpham WHERE masanpham = '" . $masp . "' and mathuonghieu = '" . $math . "'";
        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) {
                $res["success"] = 1; //xoá dữ liệu thành công
            } else {
                $res["success"] = 0; //không thành công
            }
        } else {
            $res["success"] = 0;  //không thành công
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "getALLTHSP":
        $mang = array();
        //phân trang
        $math = $_POST['math']; //lấy mã thương hiệu
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số số trang mà client
        $search = $_POST['search']; //Tìm kiếm dữ liệu
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        // $sql = mysqli_query($conn, "select s.*, ncc.tenncc, tl.tentl, th.tenth, th.math from sanpham s, thuonghieusanpham thsp, thuonghieu th, theloai tl, nhacungcap ncc WHERE s.mancc = ncc.mancc and thsp.masanpham = s.masp and th.math = thsp.mathuonghieu and s.maloai = tl.matl");
        $sql = mysqli_query($conn, "select thsp.mathuonghieu, s.masp, s.tensp, s.hinhanhsp from thuonghieusanpham thsp, sanpham s where thsp.masanpham = s.masp and thsp.mathuonghieu = '" . $math . "' and (s.masp like '%" . $search . "%' or s.tensp like '%" . $search . "%' or thsp.mathuonghieu like '%" . $search . "%') order by s.masp asc " . $limit);

        while ($rows = mysqli_fetch_array($sql)) {
            //thuonghieusanpham
            /*
            hàm mysqli_fetch_array() sẽ tìm và trả về một dòng kết quả 
            của một truy vấn MySQL nào đó dưới dạng một mảng kết hợp, mảng liên tục hoặc cả hai.
            */
            $usertemp['masp'] = $rows['masp'];
            $usertemp['tensp'] = $rows['tensp'];
            $usertemp['hinhanhsp'] = $rows['hinhanhsp'];
            $usertemp['math'] = $rows['mathuonghieu'];
            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from thuonghieusanpham thsp, sanpham s where thsp.masanpham = s.masp and thsp.mathuonghieu = '" . $math . "' and (s.masp like '%" . $search . "%' or s.tensp like '%" . $search . "%' or thsp.mathuonghieu like '%" . $search . "%') order by s.masp asc");
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
