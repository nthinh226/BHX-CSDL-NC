var urlimagesanpham = ""; //biến lưu tên hình ảnh sản phẩm
$(document).ready(function () {
    showDataSanPham(0,5);
    var flag = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemsp").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemsp").prop("disabled", true);
        $(".btnluusp").prop("disabled", false);
        $(".btnsuasp").prop("disabled", true);
        $(".txtmasp").prop("disabled", true);

        //2.Xóa các ô text field 
        resetViewSP();
        flag = 1;
        //ẩn ảnh
        urlimagesanpham = "";
        $(".imgsanpham").addClass("is-hidden");
        $("#imgsanpham").val("");

        document.querySelector("#imgsanpham").addEventListener('change', initUploadAllCommon);
    });
    $(".btnsuasp").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemsp").prop("disabled", true);
        $(".btnluusp").prop("disabled", false);
        $(".btnsuasp").prop("disabled", true);
        flag = 2;
        //cập nhật ảnh mới
        document.querySelector("#imgsanpham").addEventListener('change', initUploadAllCommon);
    });
    $(".btnlamlaisp").on('click', function () {
        resetViewSP();
        resetButtonSP();
        if (flag == 1) {
            xoaHinhAnhSP(urlimagesanpham);
        } else if (flag == 3) {
            xoaHinhAnhSP("");
        }
        resetThemHinhAnhSP();

        urlimagesanpham = "";

    });
    //Bắt sự kiện xoá hình ảnh
    $(".btndeletefilesanpham").click(function () {
        var dataSend = {
            event: "deleteImage",
            linkdata: urlimagenhanvien
        }
        queryDataPost_JSON("php/apisanpham.php", dataSend, function (res) {
            if (res.success == 1) {
                urlimagesanpham = "";
                //hiển thị lên 
                $(".progresscommon").html("Ảnh sản phẩm");
                $(".imgsanpham").addClass("is-hidden");
                $("#imgPreviewSanPham").attr("src", "");
            } else {
                alert_info("Lỗi xóa file");
            }
        });
    });


    $(".btnluusp").on('click', function () {
        if (flag == 1) {
            //1.Lấy dữ liệu trên form
            var manccsp = $(".cbmanccsp").val();
            var tensp = $(".txttensp").val();
            var maloaisp = $(".cbmaloaisp").val();
            var mathsp = $(".cbmathsp").val();
            var giasp = $(".txtgiasp").val();
            var giakhuyenmaisp = $(".txtgiakhuyenmaisp").val();
            var motasp = $(".txtmotasp").val();
            
            if (manccsp == "") {
                alert_info("Vui lòng chọn 1 nhà cung cấp!!");
            } else if (tensp == "") {
                alert_info("Vui lòng nhập tên sản phẩm!!");
                $(".txttensp").focus();
            } else if (maloaisp == "") {
                alert_info("Vui lòng chọn 1 thể loại!!");

            } else if (mathsp == "") {
                alert_info("Vui lòng chọn 1 thương hiệu!!");

            } else if (giasp == "") {
                alert_info("Vui lòng nhập giá sản phẩm!!");
                $(".txtsdtth").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    manccsp: manccsp,
                    tensp: tensp,
                    maloaisp: maloaisp,
                    mathsp: mathsp,
                    giasp: giasp,
                    giakhuyenmaisp: giakhuyenmaisp,
                    motasp: motasp,
                    hinhanhsp: urlimagesanpham,
                    event: "insertSP"
                }
                queryDataPost_JSON("php/apisanpham.php", dataclient, function (dataserver) {

                    if (dataserver.success == 2) {
                        alert_error("Bị trùng khóa");
                    } else if (dataserver.success == 3) {
                        showDataSanPham(0, record);
                        resetViewSP();
                        resetButtonSP();
                        //xoá sự kiện thêm ảnh
                        resetThemHinhAnhSP();
                        alert_success("Bạn vừa thêm sản phẩm chưa có thương hiệu thành công!!");

                    } else if (dataserver.success == 1) {
                        showDataSanPham(0, record);
                        resetViewSP();
                        resetButtonSP();
                        //xoá sự kiện thêm ảnh
                        resetThemHinhAnhSP();
                        alert_success("Bạn vừa thêm sản phẩm thành công!!");
                    } else {
                        alert_error();
                    }
                });
            }
        } else if (flag == 2) {
            //1.Lấy dữ liệu trên form
            var masp = $(".txtmasp").val();
            var manccsp = $(".cbmanccsp").val();
            var tensp = $(".txttensp").val();
            var maloaisp = $(".cbmaloaisp").val();
            var mathsp = $(".cbmathsp").val();
            var giasp = $(".txtgiasp").val();
            var giakhuyenmaisp = $(".txtgiakhuyenmaisp").val();
            var motasp = $(".txtmotasp").val();

            if (manccsp == "") {
                alert_info("Vui lòng chọn 1 nhà cung cấp!!");
            } else if (tensp == "") {
                alert_info("Vui lòng nhập tên sản phẩm!!");
                $(".txttensp").focus();
            } else if (maloaisp == "") {
                alert_info("Vui lòng chọn 1 thể loại!!");

            } else if (mathsp == "") {
                alert_info("Vui lòng chọn 1 thương hiệu!!");

            } else if (giasp == "") {
                alert_info("Vui lòng nhập giá sản phẩm!!");
                $(".txtsdtth").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    masp: masp,
                    manccsp: manccsp,
                    tensp: tensp,
                    maloaisp: maloaisp,
                    mathsp: mathsp,
                    giasp: giasp,
                    giakhuyenmaisp: giakhuyenmaisp,
                    motasp: motasp,
                    hinhanhsp: urlimagesanpham,
                    event: "updateSP"
                }
                queryDataPost_JSON("php/apisanpham.php", dataclient, function (dataserver) {
                    if (dataserver.success == 3) {
                        showDataSanPham(0, record);
                        resetViewSP();
                        resetButtonSP();
                        //xoá sự kiện thêm ảnh
                        resetThemHinhAnhSP();
                        alert_success("Bạn cập nhật thành công!!<br>Chưa có thương hiệu");
                    } else if (dataserver.success == 1) {
                        showDataSanPham(0, record);
                        resetViewSP();
                        resetButtonSP();
                        //xoá sự kiện thêm ảnh
                        resetThemHinhAnhSP();
                        alert_success("Bạn vừa cập nhật sản phẩm thành công!!");
                    } else {
                        alert_error("Thất bại!!");
                    }
                });
            }
        } else {
            console.log("bạn chưa thao tác thêm hoặc sửa");
        }
    });
    $(".btnxoasp").on('click', function () {
        var masp = $(".txtmasp").val();
        var tensp = $(".txttensp").val();
        var hinhanhsp = $("#imgPreviewSanPham").attr("src").substring(7);
        if (masp == "") {
            alert_info("Bạn chưa chọn sản phẩm nào!!!")
        } else {
            //sweetalert Y/N
            Swal.fire({
                title: 'Bạn có chắc là xoá sản phẩm [' + tensp + '] không?',
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
                        event: "deleteSP",
                        masp: masp,
                        hinhanhsp: hinhanhsp
                    };
                    queryDataPost_JSON("php/apisanpham.php", dataSend, function (data) {
                        if (data.success == 1) {
                            showDataSanPham(0, record);
                            resetViewSP();
                            resetButtonSP();
                            resetThemHinhAnhSP();
                            alert_success("Bạn đã xoá nhà cung cấp thành công");
                            resetThemHinhAnhSP();
                        } else if (data.success == 2) {
                            alert_info("Bạn cần xoá sản phẩm trong mục Thương Hiệu Sản Phẩm<br>Vui lòng thử lại sau!!");
                        } else {
                            alert_error("Sản phẩm không tồn tại!!");
                        }
                    });
                }
            })
        }
    });

    ///Xử lý các nút mà phân trang
    $(".pagenumbersanpham").on('click', 'button', function () {
        showDataSanPham($(this).val(), record);
    });

    $(".txtfindsanpham").on('keyup', function () {
        showDataSanPham(0, record);
    })
    $(".addListSanPham").on('click', 'td', function () {
        flag = 3;
        $(".btndeletefilesanpham").addClass("is-hidden");
        var masp = $(this).parent().attr("data-masp");
        var manccsp = $(this).parent().attr("data-manccsp");
        var tensp = $(this).parent().attr("data-tensp");
        var maloaisp = $(this).parent().attr("data-maloaisp");
        var mathsp = $(this).parent().attr("data-mathsp");
        var giasp = $(this).parent().attr("data-giasp");
        var giakhuyenmaisp = $(this).parent().attr("data-giakhuyenmaisp");
        var motasp = $(this).parent().attr("data-motasp");
        var hinhanhsp = $(this).parent().attr("data-hinhanhsp");
        urlimagesanpham = hinhanhsp;

        $(".txtmasp").val(masp);
        $(".cbmanccsp").val(manccsp)
        $(".txttensp").val(tensp);
        $(".cbmaloaisp").val(maloaisp);
        $(".cbmathsp").val(mathsp);
        $(".txtgiasp").val(giasp);
        $(".txtgiakhuyenmaisp").val(giakhuyenmaisp);
        $(".txtmotasp").val(motasp);

        $(".btnthemsp").prop("disabled", true);
        $(".btnluusp").prop("disabled", true);
        $(".btnsuasp").prop("disabled", false);
        $(".txtmasp").prop("disabled", true);

        $(".cbmathsp").prop("disabled", true);
        $(".cbmaloaisp").prop("disabled", true);

        $(".txttensp").focus();
        $(".row-masanpham").removeClass("is-hidden");

        //hiển thị lên 
        if (hinhanhsp == "" || hinhanhsp == "null") {
            $(".imgsanpham").addClass("is-hidden");
        } else {
            $(".imgsanpham").removeClass("is-hidden");
            $("#imgPreviewSanPham").attr("src", "images/" + hinhanhsp);
        }

    });

    $(".addListSanPham").on('click', '.click_view_sanpham', function () {
        var masp = $(this).parent().attr("data-masp");
        var manccsp = $(this).parent().attr("data-manccsp");
        var tensp = $(this).parent().attr("data-tensp");
        var maloaisp = $(this).parent().attr("data-maloaisp");
        var mathsp = $(this).parent().attr("data-mathsp");
        var giasp = $(this).parent().attr("data-giasp");
        var giakhuyenmaisp = $(this).parent().attr("data-giakhuyenmaisp");
        var motasp = $(this).parent().attr("data-motasp");
        var hinhanhsp = $(this).parent().attr("data-hinhanhsp");
        urlimagesanpham = hinhanhsp;

        $(".txtmasp").val(masp);
        $(".cbmanccsp").val(manccsp)
        $(".txttensp").val(tensp);
        $(".cbmaloaisp").val(maloaisp);
        $(".cbmathsp").val(mathsp);
        $(".txtgiasp").val(giasp);
        $(".txtgiakhuyenmaisp").val(giakhuyenmaisp);
        $(".txtmotasp").val(motasp);
        $("#imgPreviewSanPham").html('<img src="images/' + urlimagesanpham + '" width="300" height="300">')

        $(".btnthemsp").prop("disabled", true);
        $(".btnluusp").prop("disabled", true);
        $(".btnsuasp").prop("disabled", false);
        $(".txtmasp").prop("disabled", true);

    });
})

function resetViewSP() {
    $(".txtmasp").prop("disabled", false);
    $(".txtmasp").val("")
    $(".cbmanccsp").val("");
    $(".txttensp").val("");
    $(".cbmaloaisp").val("");
    $(".cbmathsp").val("");
    $(".txtgiasp").val("");
    $(".txtgiakhuyenmaisp").val("");
    $(".txtmotasp").val("");
    $(".hinhanhspdaco").html("");

    $(".cbmathsp").prop("disabled", false);
    $(".cbmaloaisp").prop("disabled", false);

    $(".txttensp").focus();
    $(".row-masanpham").addClass("is-hidden");
    $(".btndeletefilesanpham").removeClass("is-hidden");
}
function resetButtonSP() {
    flag = 0;
    $(".btnthemsp").prop("disabled", false);
    $(".btnluusp").prop("disabled", true);
    $(".btnsuasp").prop("disabled", true);
    $(".txtmasp").prop("disabled", false);

    //xoá sự kiện thêm ảnh
    document.querySelector("#imgsanpham").removeEventListener('change', initUploadAllCommon);
}
//viết hàm hiển thị dữ liệu lên table
function showDataSanPham(page, record) {
    var find = $('.txtfindsanpham').val();
    var dataSendSP = {
        page: page,
        record: record,
        search: find,
        event: "getALLSP"
    }
    queryDataPost_JSON("php/apisanpham.php", dataSendSP, function (res) {
        if (res.items.length == 0) {
            $(".addListSanPham").html("<tr><td colspan=5>Không tìm thấy record</td><tr>");
            $('.pagenumbersanpham').html("");
        } else {
            var htmls = '';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr data-mamh="' + d.mamh +
                    '" data-tenmh="' + d.tenmh +
                    '" data-loaimh="' + d.loaimh +
                    '" data-dvtinh="' + d.dvtinh +
                    '" data-hinhanh="' + d.hinhanh + '">' +

                    '<td>' + d.mamh + '</td>' +
                    '<td>' + d.tenmh + '</td>' +
                    '<td>' + d.loaimh + '</td>' +
                    '<td>' + d.dvtinh + '</td>' +
                '<td data-image="'+d.hinhanh+'" class="text-danger click_image"><img class="img-xs " src="fileanh/'+d.hinhanh+'" alt="Profile image" style ="width:4rem"></td>' +
                    '</tr>';
            }

            $(".addListSanPham").html(htmls);
            // buildSlidePage($('.pagenumbersanpham'), 5, res.page, res.totalpage);
        }
    });

    //get nhà cung cấp
    var dataSendNCC = {
        event: "getALLNCC"

    }
    queryDataPost_JSON("php/apinhacungcap.php", dataSendNCC, function (res) {
        if (res.items.length == 0) {
            $(".cbmanccsp").html('<option value="">Bạn chưa tạo nhà cung cấp nào</option>');
        } else {
            var htmls = '<option value="">Chọn nhà cung cấp</option>';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<option value="' + d.mancc + '">' + d.tenncc + '</option>';
            }
            $(".cbmanccsp").html(htmls);
        }
    });

    //get thể loại
    var dataSendTL = {
        event: "getALLTL"
    }
    queryDataPost_JSON("php/apitheloai.php", dataSendTL, function (res) {
        if (res.items.length == 0) {
            $(".cbmaloaisp").html('<option value="">Bạn chưa tạo thể loại nào</option>');
        } else {
            var htmls = '<option value="">Chọn thể loại</option>';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<option value="' + d.matl + '">' + d.tentl + '</option>'
            }
            $(".cbmaloaisp").html(htmls);
        }
    });

    //get thương hiệu
    var dataSendTH = {
        event: "getALLTH"
    }
    queryDataPost_JSON("php/apithuonghieu.php", dataSendTH, function (res) {
        if (res.items.length == 0) {
            $(".cbmathsp").html('<option value="">Bạn chưa tạo thương hiệu nào</option>');
        } else {
            var htmls = '<option value="">Chọn thương hiệu</option>';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<option value="' + d.math + '">' + d.tenth + '</option>'
            }
            $(".cbmathsp").html(htmls);
        }
    });
}

function ketquauploadsanpham(oj) {
    if (oj.status == true) {
        $(".progresscommon").html("Ảnh sản phẩm: Tải thành công!!");
        urlimagesanpham = oj.attach;
        //hiển thị lên 
        $(".imgsanpham").removeClass("is-hidden");
        $("#imgPreviewSanPham").attr("src", "images/" + urlimagesanpham);
        if (flag == 2) {
            showDataSanPham(0, record);
        }
    } else {
        $(".progresscommon").html("Ảnh sản phẩm: Tải thất bại");
    }
}
function resetThemHinhAnhSP() {
    urlimagesanpham = "";
    $(".progresscommon").html("Ảnh sản phẩm");
    $(".imgsanpham").addClass("is-hidden");
    $("#imgPreviewSanPham").attr("src", "");
    document.querySelector("#imgsanpham").removeEventListener('change', initUploadAllCommon);

}

function xoaHinhAnhSP(urlimagesanpham) {
    var dataSend = {
        event: "deleteImage",
        linkdata: urlimagesanpham
    }
    queryDataPost_JSON("php/apisanpham.php", dataSend, function (res) {
        if (res.success == 1) {
            //hiển thị lên 
            $(".progresscommon").html("Ảnh sản phẩm");
            $(".imgsanpham").addClass("is-hidden");
            $("#imgPreviewSanPham").attr("src", "");
        } else {
            alert_info("Lỗi xóa file");
        }
    });

}