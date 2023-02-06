var urlimagekhachhang = "";
$(document).ready(function () {
    var flag = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemkh").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemkh").prop("disabled", true);
        $(".btnluukh").prop("disabled", false);
        $(".btnsuakh").prop("disabled", true);
        $(".txtmakh").prop("disabled", false);
        //2.Xóa các ô text field 
        resetViewKH();
        flag = 1;
        urlimagekhachhang = "";
        $(".imgkhachhang").addClass("is-hidden");
        $("#imgkhachhang").val("");
        document.querySelector("#imgkhachhang").addEventListener('change', initUploadAllCommon);

    });
    $(".btnsuakh").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemkh").prop("disabled", true);
        $(".btnluukh").prop("disabled", false);
        $(".btnsuakh").prop("disabled", true);
        flag = 2;
        document.querySelector("#imgkhachhang").addEventListener('change', initUploadAllCommon);

    });
    $(".btnlamlaikh").on('click', function () {
        resetViewKH();
        resetButtonKH();
        if (flag == 1) {
            xoaHinhAnhKH(urlimagekhachhang);
        } else if (flag == 3) {
            xoaHinhAnhKH("");
        }
        resetThemHinhAnhKH();

        urlimagekhachhang = "";
    });
    //Bắt sự kiện xoá hình ảnh
    $(".btndeletefilekhachhang").click(function () {
        var dataSend = {
            event: "deleteImage",
            linkdata: urlimagekhachhang
        }
        queryDataPost_JSON("php/apikhachhang.php", dataSend, function (res) {
            if (res.success == 1) {
                urlimagesanpham = "";
                //hiển thị lên 
                $(".progresscommonkhachhang").html("Ảnh đại diện");
                $(".imgkhachhang").addClass("is-hidden");
                $("#imgPreviewKhachHang").attr("src", "");
            } else {
                alert_info("Lỗi xóa file");
            }
        });
    });
    $(".btnluukh").on('click', function () {
        if (flag == 1) {
            //1.Lấy dữ liệu trên form
            var hotenkh = $(".txthotenkh").val();
            var gioitinhkh = $(".cbgioitinhkh").val();
            var ngaysinhkh = $(".ngaysinhkh").val();
            var sdtkh = $(".txtsdtkh").val();
            var emailkh = $(".txtemailkh").val();
            var matkhaukh = $(".txtmatkhaukh").val();
            var diachigiaohangkh = $(".txtdiachigiaohangkh").val();

            if (hotenkh == "") {
                alert_info("Vui lòng điền tên khách hàng");
            } else if (gioitinhkh == "") {
                alert_info("Vui lòng chọn giới tính");
            } else if (ngaysinhkh == "") {
                alert_info("Vui lòng chọn ngày sinh!!");
            } else if (sdtkh == "") {
                alert_info("Vui lòng điền số điền số điện thoại!!");
                $(".txtsdtkh").focus();
            } else if (emailkh == "") {
                alert_info("Vui lòng điền email!!");
                $(".txtemailkh").focus();
            } else if (matkhaukh == "") {
                alert_info("Vui lòng điền mật khẩu!!");
                $(".txtmatkhaukh").focus();

            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    makh: makh,
                    hotenkh: hotenkh,
                    gioitinhkh: gioitinhkh,
                    ngaysinhkh: ngaysinhkh,
                    sdtkh: sdtkh,
                    emailkh: emailkh,
                    matkhaukh: matkhaukh,
                    diachigiaohangkh: diachigiaohangkh,
                    avatarkh: urlimagekhachhang,
                    event: "insertKH"
                }
                queryDataPost_JSON("php/apikhachhang.php", dataclient, function (res) {
                    if (res.success == 2) {
                        alert_error("Bị trùng khóa");
                    } else if (res.success == 1) {
                        showDataKhachHang(0, record);
                        alert_success("Bạn vừa thêm khách hàng thành công!!");
                        resetViewKH();
                        resetButtonKH();
                        resetThemHinhAnhKH();
                    } else {
                        alert_error();
                    }
                });
            }
        } else if (flag == 2) {
            //1.Lấy dữ liệu trên form
            var makh = $(".txtmakh").val();
            var hotenkh = $(".txthotenkh").val();
            var gioitinhkh = $(".cbgioitinhkh").val();
            var ngaysinhkh = $(".ngaysinhkh").val();
            var sdtkh = $(".txtsdtkh").val();
            var emailkh = $(".txtemailkh").val();
            var matkhaukh = $(".txtmatkhaukh").val();
            var diachigiaohangkh = $(".txtdiachigiaohangkh").val();
            if (makh == "") {
                alert_info("Mã khách hàng phải khác rỗng");
                $(".txtmakh").focus();
            } else if (hotenkh == "") {
                alert_info("Vui lòng điền tên khách hàng");
            } else if (gioitinhkh == "") {
                alert_info("Vui lòng chọn giới tính");
            } else if (ngaysinhkh == "") {
                alert_info("Vui lòng chọn ngày sinh!!");
            } else if (sdtkh == "") {
                alert_info("Vui lòng điền số điền số điện thoại!!");
                $(".txtsdtkh").focus();
            } else if (emailkh == "") {
                alert_info("Vui lòng điền email!!");
                $(".txtemailkh").focus();
            } else if (matkhaukh == "") {
                alert_info("Vui lòng điền mật khẩu!!");
                $(".txtmatkhaukh").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    makh: makh,
                    hotenkh: hotenkh,
                    gioitinhkh: gioitinhkh,
                    ngaysinhkh: ngaysinhkh,
                    sdtkh: sdtkh,
                    emailkh: emailkh,
                    matkhaukh: matkhaukh,
                    diachigiaohangkh: diachigiaohangkh,
                    avatarkh: urlimagekhachhang,
                    event: "updateKH"
                }
                queryDataPost_JSON("php/apikhachhang.php", dataclient, function (res) {
                    if (res.success == 1) {
                        showDataKhachHang(0, record);
                        alert_success("Bạn vừa cập nhật khách hàng thành công!!");
                        resetViewKH();
                        resetButtonKH();
                        resetThemHinhAnhKH();
                    } else {
                        alert_error();
                    }
                });
            }
        } else {
            console.log("bạn chưa thao tác thêm hoặc sửa");
        }
    });
    $(".btnxoakh").on('click', function () {
        var makh = $(".txtmakh").val();
        var hotenkh = $(".txthotenkh").val();

        if (makh == "") {
            alert_info("Bạn chưa chọn khách hàng!!!");
            $(".txtmakh").focus();
        } else {
            //sweetalert Y/N
            Swal.fire({
                title: 'Bạn có chắc là xoá khách hàng [' + hotenkh + '] không?',
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
                        event: "deleteKH",
                        makh: makh,
                    };
                    queryDataPost_JSON("php/apikhachhang.php", dataSend, function (res) {
                        if (res.success == 1) {
                            xoaHinhAnhKH(urlimagekhachhang);
                            showDataKhachHang(0, record);
                            resetViewKH();
                            resetButtonKH();
                            resetThemHinhAnhKH();
                            alert_success("Bạn đã xoá khách hàng thành công");
                        } else if (res.success == 2) {
                            alert_info("Có khách hàng trong đơn đặt hàng!!");
                        } else {
                            alert_error("khách hàng không tồn tại!!");
                        }
                    });
                }
            })
        }
    });

    $(".toggle-password").click(function () {
        showHidePassword("matkhaukh");
    })

    ///Xử lý các nút mà phân trang
    $(".pagenumbernhanvien").on('click', 'button', function () {
        showDataKhachHang($(this).val(), record);
    });

    $(".txtfindnhanvien").on('keyup', function () {
        showDataKhachHang(0, record);
    })
    $(".addListKhachHang").on('click', 'td', function () {
        flag = 3;
        $(".row-makhachhang").removeClass("is-hidden");
        $(".txttendangnhapnv").prop("readonly", true);
        var makh = $(this).parent().attr("data-makh");
        var hotenkh = $(this).parent().attr("data-hotenkh");
        var ngaysinhkh = $(this).parent().attr("data-ngaysinhkh");
        var gioitinhkh = $(this).parent().attr("data-gioitinhkh");
        var sdtkh = $(this).parent().attr("data-sdtkh");
        var emailkh = $(this).parent().attr("data-emailkh");
        var matkhaukh = $(this).parent().attr("data-matkhaukh");
        var diachigiaohangkh = $(this).parent().attr("data-diachigiaohangkh");
        var avatarkh = $(this).parent().attr("data-avatarkh");
        urlimagekhachhang = avatarkh;

        $(".txtmakh").val(makh);
        $(".txthotenkh").val(hotenkh);
        $(".ngaysinhkh").val(ngaysinhkh);
        $(".cbgioitinhkh").val(gioitinhkh);
        $(".txtsdtkh").val(sdtkh);
        $(".txtemailkh").val(emailkh);
        $(".txtmatkhaukh").val(matkhaukh);
        $(".txtdiachigiaohangkh").val(diachigiaohangkh);

        $(".btnthemkh").prop("disabled", true);
        $(".btnluukh").prop("disabled", true);
        $(".btnsuakh").prop("disabled", false);
        $(".txtmakh").prop("disabled", true);
        $(".txthotenkh").focus();

        $(".btndeletefilekhachhang").addClass("is-hidden");
        $(".content-matkhaukh").addClass("is-hidden");

        //hiển thị lên 
        if (avatarkh == "" || avatarkh == "null") {
            $(".imgkhachhang").addClass("is-hidden");
        } else {
            $(".imgkhachhang").removeClass("is-hidden");
            $("#imgPreviewKhachHang").attr("src", "images/" + avatarkh);
        }
    });

})

function resetViewKH() {
    $(".row-makhachhang").addClass("is-hidden");
    $(".txtmakh").val("");
    $(".txthotenkh").val("");
    $(".cbgioitinhkh").val("");
    $(".ngaysinhkh").val("");
    $(".txtsdtkh").val("");
    $(".txtemailkh").val("");
    $(".txtmatkhaukh").val("");
    $(".txtdiachigiaohangkh").val("");
    $(".avatarkhdaco").html("");

    $(".txthotenkh").focus();
    $(".content-matkhaukh").removeClass("is-hidden");
}
function resetButtonKH() {
    flag = 0;
    $(".btnthemkh").prop("disabled", false);
    $(".btnluukh").prop("disabled", true);
    $(".btnsuakh").prop("disabled", true);
    $(".txtmakh").prop("disabled", false);
    //xoá sự kiện thêm ảnh
    document.querySelector("#imgsanpham").removeEventListener('change', initUploadAllCommon);

}
//viết hàm hiển thị dữ liệu lên table
function showDataKhachHang(page, record) {
    var find = $('.txtfindnhanvien').val();
    var dataSendnv = {
        page: page,
        record: record,
        search: find,
        event: "getALLKH"
    }
    queryDataPost_JSON("php/apikhachhang.php", dataSendnv, function (res) {
        if (res.items.length == 0) {

            $(".addListKhachHang").html("<tr><td colspan=5>Không tìm thấy record</td><tr>");
            $('.pagenumberkhachhang').html("");
        } else {
            var stt = printSTT(record, res.page);
            var htmls = '';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr data-makh="' + d.makh +
                    '" data-hotenkh="' + d.hotenkh +
                    '" data-gioitinhkh="' + d.gioitinhkh +
                    '" data-ngaysinhkh="' + d.ngaysinhkh +
                    '" data-sdtkh="' + d.sdtkh +
                    '" data-emailkh="' + d.emailkh +
                    '" data-matkhaukh="' + d.matkhaukh +
                    '" data-diachigiaohangkh="' + d.diachigiaohangkh +
                    '" data-avatarkh="' + d.avatarkh + '">' +

                    '<td>' + stt + '</td>' +
                    '<td>' + d.makh + '</td>' +
                    '<td>' + d.hotenkh + '</td>' +
                    '<td>' + d.sdtkh + '</td>' +
                    '<td>' + d.emailkh + '</td>' +
                    '<td>' + d.diachigiaohangkh + '</td>' +
                    '</tr>';
                stt++;
            }
            $(".addListKhachHang").html(htmls);
            buildSlidePage($('.pagenumberkhachhang'), 5, res.page, res.totalpage);
        }
    });

}

function ketquauploadkhachhang(oj) {
    if (oj.status == true) {
        $(".progresscommonkhachhang").html("Ảnh đại diện: Tải thành công!!");
        urlimagekhachhang = oj.attach;
        //hiển thị lên 
        $(".imgkhachhang").removeClass("is-hidden");
        $("#imgPreviewKhachHang").attr("src", "images/" + urlimagekhachhang);
        if (flag == 2) {
            showDataKhachHang(0, record);
        }
    } else {
        $(".progresscommonkhachhang").html("Ảnh đại diện: Tải thất bại");
    }
}
function resetThemHinhAnhKH() {
    urlimagekhachhang = "";
    $(".progresscommonkhachhang").html("Ảnh đại diện");
    $(".imgkhachhang").addClass("is-hidden");
    $("#imgPreviewkhachhang").attr("src", "");
    document.querySelector("#imgkhachhang").removeEventListener('change', initUploadAllCommon);

}

function xoaHinhAnhKH(urlimagekhachhang) {
    var dataSend = {
        event: "deleteImage",
        linkdata: urlimagekhachhang
    }
    queryDataPost_JSON("php/apikhachhang.php", dataSend, function (res) {
        if (res.success == 1) {
            //hiển thị lên 
            $(".progresscommonkhachhang").html("Ảnh đại diện");
            $(".imgkhachhang").addClass("is-hidden");
            $("#imgPreviewKhachHang").attr("src", "");
        } else {
            alert_info("Lỗi xóa file");
        }
    });

}