var urlimagenhanvien = "";
$(document).ready(function () {
    showDataNhanVien(0, 5);
    var flag = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemnv").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemnv").prop("disabled", true);
        $(".btnluunv").prop("disabled", false);
        $(".btnsuanv").prop("disabled", true);
        $(".txtmanv").prop("disabled", false);
        //2.Xóa các ô text field 
        resetViewNV();
        flag = 1;
        urlimagenhanvien = "";
        $(".imgnhanvien").addClass("is-hidden");
        $("#imgnhanvien").val("");
        document.querySelector("#imgnhanvien").addEventListener('change', initUploadAllCommon);
    });
    $(".btnsuanv").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemnv").prop("disabled", true);
        $(".btnluunv").prop("disabled", false);
        $(".btnsuanv").prop("disabled", true);
        flag = 2;
        document.querySelector("#imgnhanvien").addEventListener('change', initUploadAllCommon);

    });
    $(".btnlamlainv").on('click', function () {
        resetViewNV();
        resetButtonNV();
        if (flag == 1) {
            xoaHinhAnhNV(urlimagenhanvien);
        } else if (flag == 3) {
            xoaHinhAnhNV("");
        }
        resetThemHinhAnhNV();

        urlimagenhanvien = "";
    });

    //Bắt sự kiện xoá hình ảnh
    $(".btndeletefilenhanvien").click(function () {
        var dataSend = {
            event: "deleteImage",
            linkdata: urlimagenhanvien
        }
        queryDataPost_JSON("php/apinhanvien.php", dataSend, function (res) {
            if (res.success == 1) {
                urlimagesanpham = "";
                //hiển thị lên 
                $(".progresscommonnhanvien").html("Ảnh đại diện");
                $(".imgnhanvien").addClass("is-hidden");
                $("#imgPreviewNhanVien").attr("src", "");
            } else {
                alert_info("Lỗi xóa file");
            }
        });
    });
    $(".btnluunv").on('click', function () {
        if (flag == 1) {
            //1.Lấy dữ liệu trên form
            var hotennv = $(".txthotennv").val();
            var ngaysinhnv = $(".ngaysinhnv").val();
            var gioitinhnv = $(".cbgioitinhnv").val();
            var sdtnv = $(".txtsdtnv").val();
            var emailnv = $(".txtemailnv").val();
            var tendangnhapnv = $(".txttendangnhapnv").val();
            var matkhaunv = $(".txtmatkhaunv").val();

            if (hotennv == "") {
                alert_info("Họ tên cấp nhân viên phải khác rỗng");
            } else if (gioitinhnv == "") {
                alert_info("Vui lòng chọn giới tính");
                $(".cbgioitinhnv").focus();
            } else if (ngaysinhnv == "") {
                alert_info("Vui lòng nhập ngày sinh");
                $(".ngaysinhnv").focus();
            } else if (sdtnv == "") {
                alert_info("Số điện thoại phải khác rỗng");
                $(".txtsdtnv").focus();
            } else if (emailnv == "") {
                alert_info("Email phải khác rỗng");
                $(".txtemailnv").focus();
            } else if (tendangnhapnv == "") {
                alert_info("tên đăng nhập phải khác rỗng");
                $(".txttendangnhapnv").focus();
            } else if (matkhaunv == "") {
                alert_info("Mật khẩu phải khác rỗng");
                $(".txtmatkhaunv").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    hotennv: hotennv,
                    ngaysinhnv: ngaysinhnv,
                    gioitinhnv: gioitinhnv,
                    sdtnv: sdtnv,
                    emailnv: emailnv,
                    tendangnhapnv: tendangnhapnv,
                    matkhaunv: matkhaunv,
                    avatarnv: urlimagenhanvien,
                    event: "insertNV"
                }
                queryDataPost_JSON("php/apinhanvien.php", dataclient, function (dataserver) {
                    if (dataserver.success == 2) {
                        alert_error("Bị trùng khóa");
                    } else if (dataserver.success == 1) {
                        showDataNhanVien(0, record);
                        alert_success("Bạn vừa thêm nhân viên thành công!!");
                        resetViewNV();
                        resetButtonNV();
                        resetThemHinhAnhNV();
                    } else {
                        alert_error();
                    }
                });
            }
        } else if (flag == 2) {
            //1.Lấy dữ liệu trên form
            var manv = $(".txtmanv").val();
            var hotennv = $(".txthotennv").val();
            var ngaysinhnv = $(".ngaysinhnv").val();
            var gioitinhnv = $(".cbgioitinhnv").val();
            var sdtnv = $(".txtsdtnv").val();
            var emailnv = $(".txtemailnv").val();
            var tendangnhapnv = $(".txttendangnhapnv").val();

            if (manv == "") {
                alert_info("Mã nhân viên phải khác rỗng");
                $(".txtmanv").focus();
            } else if (hotennv == "") {
                alert_info("Họ tên cấp nhân viên phải khác rỗng");
            } else if (gioitinhnv == "") {
                alert_info("Vui lòng chọn giới tính");
                $(".cbgioitinhnv").focus();
            } else if (ngaysinhnv == "") {
                alert_info("Vui lòng nhập ngày sinh");
                $(".ngaysinhnv").focus();
            } else if (sdtnv == "") {
                alert_info("Số điện thoại phải khác rỗng");
                $(".txtsdtnv").focus();
            } else if (emailnv == "") {
                alert_info("Email phải khác rỗng");
                $(".txtemailnv").focus();
            } else if (tendangnhapnv == "") {
                alert_info("tên đăng nhập phải khác rỗng");
                $(".txttendangnhapnv").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    manv: manv,
                    hotennv: hotennv,
                    ngaysinhnv: ngaysinhnv,
                    gioitinhnv: gioitinhnv,
                    sdtnv: sdtnv,
                    emailnv: emailnv,
                    tendangnhapnv: tendangnhapnv,
                    avatarnv: urlimagenhanvien,
                    event: "updateNV"
                }
                queryDataPost_JSON("php/apinhanvien.php", dataclient, function (dataserver) {
                    if (dataserver.success == 1) {
                        showDataNhanVien(0, record);
                        alert_success("Bạn vừa cập nhật nhân viên thành công!!");
                        resetViewNV();
                        resetButtonNV();
                        resetThemHinhAnhNV();
                    } else {
                        alert_error();
                    }
                });
            }
        } else {
            console.log("bạn chưa thao tác thêm hoặc sửa");
        }
    });
    $(".btnxoanv").on('click', function () {
        var manv = $(".txtmanv").val();
        var hotennv = $(".txthotennv").val();
        
        if (manv == "") {
            alert_info("Bạn chưa chọn nhân viên nào!!")
        } else {
            //sweetalert Y/N
            Swal.fire({
                title: 'Bạn có chắc là xoá nhân viên [' + hotennv + '] không?',
                text: "Sau khi xoá không thể khôi phục!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Chắc chắn rồi!'
            }).then((result) => {
                if (result.isConfirmed) {
                    //khi người dùng chọn ok
                    var dataSend = {
                        event: "deleteNV",
                        manv: manv,
                    };
                    queryDataPost_JSON("php/apinhanvien.php", dataSend, function (data) {
                        if (data.success == 1) {
                            xoaHinhAnhNV(urlimagenhanvien);
                            showDataNhanVien(0, record);
                            resetViewNV();
                            resetButtonNV();
                            resetThemHinhAnhNV();
                            alert_success("Bạn đã xoá nhân viên thành công");
                        } else if (data.success == 2) {
                            alert_info("Có nhân viên trong đơn đặt hàng!!");
                        } else {
                            alert_error("Nhân viên không tồn tại!!");
                        }
                    });
                }
            })
        }
    });

    $(".toggle-password").click(function () {
        showHidePassword("matkhaunv");
    })

    ///Xử lý các nút mà phân trang
    $(".pagenumbernhanvien").on('click', 'button', function () {
        showDataNhanVien($(this).val(), record);
    });

    $(".txtfindnhanvien").on('keyup', function () {
        showDataNhanVien(0, record);
    })
    $(".addListNhanVien").on('click', 'td', function () {
        flag = 3;
        $(".row-manhanvien").removeClass("is-hidden");
        $(".txttendangnhapnv").prop("readonly", true);
        var manv = $(this).parent().attr("data-manv");
        var hotennv = $(this).parent().attr("data-hotennv");
        var ngaysinhnv = $(this).parent().attr("data-ngaysinhnv");
        var gioitinhnv = $(this).parent().attr("data-gioitinhnv");
        var sdtnv = $(this).parent().attr("data-sdtnv");
        var emailnv = $(this).parent().attr("data-emailnv");
        var tendangnhapnv = $(this).parent().attr("data-tendangnhapnv");
        var matkhaunv = $(this).parent().attr("data-matkhaunv");
        var avatarnv = $(this).parent().attr("data-avatarnv");
        urlimagenhanvien = avatarnv;

        $(".txtmanv").val(manv);
        $(".txthotennv").val(hotennv);
        $(".ngaysinhnv").val(ngaysinhnv);
        $(".cbgioitinhnv").val(gioitinhnv);
        $(".txtsdtnv").val(sdtnv);
        $(".txtemailnv").val(emailnv);
        $(".txttendangnhapnv").val(tendangnhapnv);
        $(".txtmatkhaunv").val(matkhaunv);

        $(".btnthemnv").prop("disabled", true);
        $(".btnluunv").prop("disabled", true);
        $(".btnsuanv").prop("disabled", false);
        $(".txtmanv").prop("disabled", true);
        $(".txthotennv").focus();

        $(".btndeletefilenhanvien").addClass("is-hidden");
        $(".content-matkhaunv").addClass("is-hidden");
        

        //hiển thị lên 
        if (avatarnv == "" || avatarnv == "null") {
            $(".imgnhanvien").addClass("is-hidden");
        } else {
            $(".imgnhanvien").removeClass("is-hidden");
            $("#imgPreviewNhanVien").attr("src", "images/" + avatarnv);
        }
    });

})

function resetViewNV() {
    $(".row-manhanvien").addClass("is-hidden");
    $(".txtmanv").val("");
    $(".txthotennv").val("");
    $(".cbgioitinhnv").val("");
    $(".ngaysinhnv").val("");
    $(".txtsdtnv").val("");
    $(".txtemailnv").val("");
    $(".txttendangnhapnv").val("");
    $(".txtmatkhaunv").val("");
    $(".avatarnvdaco").html("");

    $(".txthotennv").focus();
    $(".txttendangnhapnv").prop("readonly", false);
    $(".btndeletefilenhanvien").removeClass("is-hidden");
    $(".content-matkhaunv").removeClass("is-hidden");
}
function resetButtonNV() {
    flag = 0;
    $(".btnthemnv").prop("disabled", false);
    $(".btnluunv").prop("disabled", true);
    $(".btnsuanv").prop("disabled", true);
    

    //xoá sự kiện thêm ảnh
    document.querySelector("#imgsanpham").removeEventListener('change', initUploadAllCommon);

}
//viết hàm hiển thị dữ liệu lên table
function showDataNhanVien(page, record) {
    var find = $('.txtfindnhanvien').val();
    var dataSendnv = {
        page: page,
        record: record,
        search: find,
        event: "getALLNV",
    };
    // console.log(dataSendnv);
    queryDataPost_JSON("php/apinhanvien.php", dataSendnv, function (res) {
        if (res.items.length == 0) {
            $(".addListNhanVien").html("<tr><td colnvan=5>Không tìm thấy record</td><tr>");
            $('.pagenumbernhanvien').html("");
        } else {
            var stt = printSTT(record, res.page);
            var htmls = '';
            var list = res.items;
            console.log(list);
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr data-manv="' + d.manv +
                    '" data-tennv="' + d.tennv +
                    '" data-luong="' + d.luong +
                    '" data-gioitinh="' + d.gioitinh +
                    '" data-loainv="' + d.loainv +
                    '" data-diachi="' + d.diachi +
                    '" data-sdt="' + d.sdt +'">' +

                    '<td>' + (parseInt(item)+1) + '</td>' +
                    '<td>' + d.manv + '</td>' +
                    '<td>' + d.tennv + '</td>' +
                    '<td>' + d.luong + '</td>' +
                    '<td>' + d.gioitinh + '</td>' +
                    '<td>' + d.loainv + '</td>' +
                    '<td>' + d.diachi + '</td>' +
                    '<td>' + d.sdt + '</td>' +
                    '</tr>';
                // stt++;
            }
            $(".addListNhanVien").html(htmls);
            // buildSlidePage($('.pagenumbernhanvien'), 5, res.page, res.totalpage);
        }
    });

}
function ketquauploadnhanvien(oj) {
    if (oj.status == true) {
        $(".progresscommonnhanvien").html("Ảnh đại diện: Tải thành công!!");
        urlimagenhanvien = oj.attach;
        //hiển thị lên 
        $(".imgnhanvien").removeClass("is-hidden");
        $("#imgPreviewNhanVien").attr("src", "images/" + urlimagenhanvien);
        if (flag == 2) {
            showDataNhanVien(0, record);
        }
    } else {
        $(".progresscommonnhanvien").html("Ảnh đại diện: Tải thất bại");
    }
}
function resetThemHinhAnhNV() {
    urlimagenhanvien = "";
    $(".progresscommonnhanvien").html("Ảnh đại diện");
    $(".imgnhanvien").addClass("is-hidden");
    $("#imgPreviewNhanVien").attr("src", "");
    document.querySelector("#imgnhanvien").removeEventListener('change', initUploadAllCommon);

}

function xoaHinhAnhNV(urlimagenhanvien) {
    var dataSend = {
        event: "deleteImage",
        linkdata: urlimagenhanvien
    }
    queryDataPost_JSON("php/apinhanvien.php", dataSend, function (res) {
        if (res.success == 1) {
            //hiển thị lên 
            $(".progresscommonnhanvien").html("Ảnh đại diện");
            $(".imgnhanvien").addClass("is-hidden");
            $("#imgPreviewNhanVien").attr("src", "");
        } else {
            alert_info("Lỗi xóa file");
        }
    });

}




