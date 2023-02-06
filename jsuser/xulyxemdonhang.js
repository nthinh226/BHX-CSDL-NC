$(document).ready(function () {
    $(".txtfinddonhangtrongngay").on('keyup', function () {
        showDataDonDatHang();
    })
    $(".txtfinddonhangdangxuly").on('keyup', function () {
        showDataDonDatHang();
    })
    $(".txtfinddonhanghoanthanh").on('keyup', function () {
        showDataDonDatHang();
    })
    $(".addListDonDatHangTrongNgay").on('click', '.btn_edit_donhang', function () {
        $(".btn_save_trangthaidh").prop("disabled", false);
        $(".cbtrangthaidh").prop("disabled", false);

        var sodh = $(this).parents("tr").attr("data-sodh");
        var makh = $(this).parents("tr").attr("data-makh");
        var hotenkh = $(this).parents("tr").attr("data-hotenkh");
        var emailkh = $(this).parents("tr").attr("data-email");
        var sdtkh = $(this).parents("tr").attr("data-sdt");
        var diachigiaohang = $(this).parents("tr").attr("data-diachigiaohang");
        var ngaydh = $(this).parents("tr").attr("data-ngaydh");
        var tongtien = $(this).parents("tr").attr("data-tongtien");
        var trangthaidh = $(this).parents("tr").attr("data-trangthaidh");
        //điền thông tin vào modal
        $(".ctdh_sodh").html(sodh);
        $(".cthd_ngaydh").html('<i class="fas fa-globe"></i> NT226 Computer');
        $(".ctdh_thongtincuahang").html('From' +
            '<address>' +
            '<strong>NT226 Computer</strong><br>' +
            '79/8G, Quốc lộ 13<br>' +
            'Phường 26, Quận Bình Thạnh, TP. HCM<br>' +
            'Điện thoại: (+84) 384-735-254<br>' +
            'Email: ngocthinh1126@gmail.com' +
            '</address>');
        $(".ctdh_thongtinkhachhang").html('To' +
            '<address>' +
            '<strong>' + hotenkh + '</strong><br>' + diachigiaohang +
            '<br>' +
            'Điện thoại: ' + sdtkh + '<br>' +
            'Email: ' + emailkh +
            '</address>');
        $(".ctdh_thongtinhoadon").html('<b>Số hoá đơn: ' + sodh + '</b><br>' +
            '<b>Ngày đặt hàng:</b> ' + ngaydh + '<br>');
        //body
        showDataSPDonHang(sodh);
        $(".cthd_tongtien").html('<tr>' +
            '<th style="width:50%">Thành tiền:</th>' +
            '<td>' + tongtien + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Phí vận chuyển:</th>' +
            '<td>0 VNĐ</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Tổng tiền:</th>' +
            '<td>' + tongtien + '</td>' +
            '</tr>')
        $(".cbtrangthaidh").val(trangthaidh);
        $('.showmodalchitietdh').modal('show');
    })
    $(".addListDonDatHangDangXuLy").on('click', '.btn_edit_donhang', function () {
        $(".btn_save_trangthaidh").prop("disabled", false);
        $(".cbtrangthaidh").prop("disabled", false);

        var sodh = $(this).parents("tr").attr("data-sodh");
        var makh = $(this).parents("tr").attr("data-makh");
        var hotenkh = $(this).parents("tr").attr("data-hotenkh");
        var emailkh = $(this).parents("tr").attr("data-email");
        var sdtkh = $(this).parents("tr").attr("data-sdt");
        var diachigiaohang = $(this).parents("tr").attr("data-diachigiaohang");
        var ngaydh = $(this).parents("tr").attr("data-ngaydh");
        var tongtien = $(this).parents("tr").attr("data-tongtien");
        var trangthaidh = $(this).parents("tr").attr("data-trangthaidh");
        //điền thông tin vào modal
        $(".ctdh_sodh").html(sodh);
        $(".cthd_ngaydh").html('<i class="fas fa-globe"></i> NT226 Computer');
        $(".ctdh_thongtincuahang").html('From' +
            '<address>' +
            '<strong>NT226 Computer</strong><br>' +
            '79/8G, Quốc lộ 13<br>' +
            'Phường 26, Quận Bình Thạnh, TP. HCM<br>' +
            'Điện thoại: (+84) 384-735-254<br>' +
            'Email: ngocthinh1126@gmail.com' +
            '</address>');
        $(".ctdh_thongtinkhachhang").html('To' +
            '<address>' +
            '<strong>' + hotenkh + '</strong><br>' + diachigiaohang +
            '<br>' +
            'Điện thoại: ' + sdtkh + '<br>' +
            'Email: ' + emailkh +
            '</address>');
        $(".ctdh_thongtinhoadon").html('<b>Số hoá đơn: ' + sodh + '</b><br>' +
            '<b>Ngày đặt hàng:</b> ' + ngaydh + '<br>');
        //body
        showDataSPDonHang(sodh);
        $(".cthd_tongtien").html('<tr>' +
            '<th style="width:50%">Thành tiền:</th>' +
            '<td>' + tongtien + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Phí vận chuyển:</th>' +
            '<td>0 VNĐ</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Tổng tiền:</th>' +
            '<td>' + tongtien + '</td>' +
            '</tr>')
        $(".cbtrangthaidh").val(trangthaidh);
        $('.showmodalchitietdh').modal('show');
        //thêm
        
    })
    //thay đổi trạng thái đh
    $(".btn_save_trangthaidh").click(function () {
        var trangthaidh = $(".cbtrangthaidh").val();
        var sodh = $(".ctdh_sodh").text();
        var manv = $(".ctdh_manv").text();
        var dataSend = {
            sodh: sodh,
            trangthaidh: trangthaidh,
            manv: manv,
            event: "updateTrangThaiDH"
        }
        console.log(dataSend);
        queryDataPost_JSON("php/apixemdonhang.php", dataSend, function (res) {
            if (res["success"] == 1) {
                
                alert_success("Cập nhật thành công!!");
                $('.showmodalchitietdh').modal('hide');
                showDataDonDatHang();
            } else {
                alert_error("Cập nhật thất bại!!");
            }
        })

    });

    //xem đơn hàng
    $(".addListDonDatHangHoanThanh").on('click', '.btn_view_donhang', function () {
        var sodh = $(this).parents("tr").attr("data-sodh");
        var makh = $(this).parents("tr").attr("data-makh");
        var hotenkh = $(this).parents("tr").attr("data-hotenkh");
        var emailkh = $(this).parents("tr").attr("data-email");
        var sdtkh = $(this).parents("tr").attr("data-sdt");
        var diachigiaohang = $(this).parents("tr").attr("data-diachigiaohang");
        var ngaydh = $(this).parents("tr").attr("data-ngaydh");
        var tongtien = $(this).parents("tr").attr("data-tongtien");
        var trangthaidh = $(this).parents("tr").attr("data-trangthaidh");
        //điền thông tin vào modal
        $(".ctdh_sodh").html(sodh);
        $(".cthd_ngaydh").html('<i class="fas fa-globe"></i> NT226 Computer');
        $(".ctdh_thongtincuahang").html('From' +
            '<address>' +
            '<strong>NT226 Computer</strong><br>' +
            '79/8G, Quốc lộ 13<br>' +
            'Phường 26, Quận Bình Thạnh, TP. HCM<br>' +
            'Điện thoại: (+84) 384-735-254<br>' +
            'Email: ngocthinh1126@gmail.com' +
            '</address>');
        $(".ctdh_thongtinkhachhang").html('To' +
            '<address>' +
            '<strong>' + hotenkh + '</strong><br>' + diachigiaohang +
            '<br>' +
            'Điện thoại: ' + sdtkh + '<br>' +
            'Email: ' + emailkh +
            '</address>');
        $(".ctdh_thongtinhoadon").html('<b>Số hoá đơn: ' + sodh + '</b><br>' +
            '<b>Ngày đặt hàng:</b> ' + ngaydh + '<br>');
        //body
        
        showDataSPDonHang(sodh);
        $(".cthd_tongtien").html('<tr>' +
            '<th style="width:50%">Thành tiền:</th>' +
            '<td>' + tongtien + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Phí vận chuyển:</th>' +
            '<td>0 VNĐ</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Tổng tiền:</th>' +
            '<td>' + tongtien + '</td>' +
            '</tr>')
        $(".cbtrangthaidh").val(trangthaidh);
        $(".cbtrangthaidh").prop("disabled", true);
        $(".btn_save_trangthaidh").prop("disabled", true);
        $('.showmodalchitietdh').modal('show');
    })


})


//viết hàm hiển thị dữ liệu lên table
function showDataDonDatHang() {
    var finddonhangtrongngay = $('.txtfinddonhangtrongngay').val();
    var dataSendDHTrongNgay = {
        search: finddonhangtrongngay,
        event: "getALLDonHangTrongNgay"
    }
    queryDataPost_JSON("php/apixemdonhang.php", dataSendDHTrongNgay, function (res) {
        if (res.items.length == 0) {
            $(".addListDonDatHangTrongNgay").html("<tr><td colspan=6>Không tìm thấy record</td><tr>");
        } else {
            var stt = 1;
            var htmls = '';
            var list = res.items;
            var trangthai = "";
            for (var item in list) {
                var d = list[item];
                if (d.trangthaidh == 0) {
                    trangthai = "Đang xử lý";
                } else if (d.trangthaidh == 1) {
                    trangthai = "Đang giao";
                } else if (d.trangthaidh == 2) {
                    trangthai = "Hoàn thành";
                } else if (d.trangthaidh == 3) {
                    trangthai = "Đã huỷ";
                }
                htmls = htmls + '<tr data-sodh="' + d.sodh +
                    '" data-makh="' + d.makh +
                    '" data-hotenkh="' + d.hotenkh +
                    '" data-email="' + d.email +
                    '" data-sdt="' + d.sdt +
                    '" data-diachigiaohang="' + d.diachigiaohang +
                    '" data-ngaydh="' + d.ngaydh +
                    '" data-tongtien="' + d.tongtien +
                    '" data-trangthaidh="' + d.trangthaidh + '">' +

                    '<td>' + stt + '</td>' +
                    '<td>' + d.sodh + '</td>' +
                    '<td>' + d.ngaydh + '</td>' +
                    '<td>' + d.tongtien + '</td>' +
                    '<td>' + trangthai + '</td>' +
                    '<td class="text-center"><i class="fas fa-edit btn_edit_donhang"></i></td>' +
                    '</tr>';
                stt++;
            }
            $(".addListDonDatHangTrongNgay").html(htmls);
        }
    });

    //đơn hàng đang xử lý
    var finddonhangdangxuly = $('.txtfinddonhangdangxuly').val();
    var dataSendDHPending = {
        search: finddonhangdangxuly,
        event: "getALLDonHangDangXuLy"
    }
    queryDataPost_JSON("php/apixemdonhang.php", dataSendDHPending, function (res) {
        if (res.items.length == 0) {
            $(".addListDonDatHangDangXuLy").html("<tr><td colspan=6>Không tìm thấy record</td><tr>");
        } else {
            var stt = 1;
            var htmls = '';
            var list = res.items;
            var trangthai = "";
            for (var item in list) {
                var d = list[item];
                if (d.trangthaidh == 0) {
                    trangthai = "Đang xử lý";
                } else if (d.trangthaidh == 1) {
                    trangthai = "Đang giao";
                } else if (d.trangthaidh == 2) {
                    trangthai = "Hoàn thành";
                } else if (d.trangthaidh == 3) {
                    trangthai = "Đã huỷ";
                }
                htmls = htmls + '<tr data-sodh="' + d.sodh +
                    '" data-makh="' + d.makh +
                    '" data-hotenkh="' + d.hotenkh +
                    '" data-email="' + d.email +
                    '" data-sdt="' + d.sdt +
                    '" data-diachigiaohang="' + d.diachigiaohang +
                    '" data-ngaydh="' + d.ngaydh +
                    '" data-tongtien="' + d.tongtien +
                    '" data-trangthaidh="' + d.trangthaidh + '">' +

                    '<td>' + stt + '</td>' +
                    '<td>' + d.sodh + '</td>' +
                    '<td>' + d.ngaydh + '</td>' +
                    '<td>' + d.tongtien + '</td>' +
                    '<td>' + trangthai + '</td>' +
                    '<td class="text-center"><i class="fas fa-edit btn_edit_donhang"></i></td>' +
                    '</tr>';
                stt++;
            }
            $(".addListDonDatHangDangXuLy").html(htmls);
        }
    });

    //đơn hàng hoàn thành
    var finddonhanghoanthanh = $('.txtfinddonhanghoanthanh').val();
    var dataSendDHPending = {
        search: finddonhanghoanthanh,
        event: "getALLDonHangHoanThanh"
    }
    queryDataPost_JSON("php/apixemdonhang.php", dataSendDHPending, function (res) {
        if (res.items.length == 0) {
            $(".addListDonDatHangHoanThanh").html("<tr><td colspan=6>Không tìm thấy record</td><tr>");
        } else {
            var stt = 1;
            var htmls = '';
            var list = res.items;
            var trangthai = "";
            for (var item in list) {
                var d = list[item];
                if (d.trangthaidh == 0) {
                    trangthai = "Đang xử lý";
                } else if (d.trangthaidh == 1) {
                    trangthai = "Đang giao";
                } else if (d.trangthaidh == 2) {
                    trangthai = "Hoàn thành";
                } else if (d.trangthaidh == 3) {
                    trangthai = "Đã huỷ";
                }
                htmls = htmls + '<tr data-sodh="' + d.sodh +
                    '" data-makh="' + d.makh +
                    '" data-hotenkh="' + d.hotenkh +
                    '" data-email="' + d.email +
                    '" data-sdt="' + d.sdt +
                    '" data-diachigiaohang="' + d.diachigiaohang +
                    '" data-ngaydh="' + d.ngaydh +
                    '" data-tongtien="' + d.tongtien +
                    '" data-trangthaidh="' + d.trangthaidh + '">' +

                    '<td>' + stt + '</td>' +
                    '<td>' + d.sodh + '</td>' +
                    '<td>' + d.ngaydh + '</td>' +
                    '<td>' + d.tongtien + '</td>' +
                    '<td>' + trangthai + '</td>' +
                    '<td class="text-center"><i class="fas fa-eye btn_view_donhang"></i></i></td>' +
                    '</tr>';
                stt++;
            }
            $(".addListDonDatHangHoanThanh").html(htmls);
        }
    });

}

function showDataSPDonHang(sodh) {
    var dataDataSPDonHang = {
        sodh: sodh,
        event: "getALLSPDonHang"
    }
    queryDataPost_JSON("php/apixemdonhang.php", dataDataSPDonHang, function (res) {
        if (res.items.length == 0) {
            $(".addListSanPhamDH").html("<tr><td colspan=6>Không tìm thấy record</td><tr>");
        } else {
            var stt = 1;
            var htmls = '';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr>' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.tensp + '</td>' +
                    '<td>' + d.soluong + '</td>' +
                    '<td>' + d.giatien + '</td>' +
                    '<td>' + d.giamgia + '</td>' +
                    '<td>' + d.thanhtien + '</td>' +
                    '</tr>';
                stt++;
            }
            $(".addListSanPhamDH").html(htmls);
        }
    });
}
