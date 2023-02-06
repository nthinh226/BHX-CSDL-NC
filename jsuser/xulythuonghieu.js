$(document).ready(function () {
    var flag = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemth").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemth").prop("disabled", true);
        $(".btnluuth").prop("disabled", false);
        $(".btnsuath").prop("disabled", true);
        $(".txtmath").prop("disabled", false);
        //2.Xóa các ô text field 
        resetViewTH();
        flag = 1;
    });
    $(".btnsuath").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemth").prop("disabled", true);
        $(".btnluuth").prop("disabled", false);
        $(".btnsuath").prop("disabled", true);
        flag = 2;
    });
    $(".btnlamlaith").on('click', function () {
        resetViewTH();
        resetButtonTH();
    });
    $(".btnluuth").on('click', function () {
        if (flag == 1) {
            //1.Lấy dữ liệu trên form
            var math = $(".txtmath").val();
            var tenth = $(".txttenth").val();
            var emailth = $(".txtemailth").val();
            var sdtth = $(".txtsdtth").val();
            var faxth = $(".txtfaxth").val();
            var diachith = $(".txtdiachith").val();
            var websiteth = $(".txtwebsiteth").val();

            if (math == "") {
                alert_info("Vui lòng nhập mã thương hiệu!!");
                $(".txtmath").focus();
            } else if (tenth == "") {
                alert_info("Vui lòng nhập tên thương hiệu!!");
                $(".txttenth").focus();
            } else if (emailth == "") {
                alert_info("Vui lòng nhập email thương hiệu!!");
                $(".txtemailth").focus();
            } else if (sdtth == "") {
                alert_info("Vui lòng nhập số điện thoại!!");
                $(".txtsdtth").focus();
            } else if (diachith == "") {
                alert_info("Vui lòng nhập địa chỉ!!");
                $(".txtdiachith").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    math: math,
                    tenth: tenth,
                    emailth: emailth,
                    sdtth: sdtth,
                    faxth: faxth,
                    diachith: diachith,
                    websiteth: websiteth,
                    event: "insertTH"
                }
                queryDataPost_JSON("php/apithuonghieu.php", dataclient, function (dataserver) {
                    if (dataserver.success == 2) {
                        alert_error("Bị trùng khóa");
                    } else if (dataserver.success == 1) {
                        showDataThuongHieu();
                        alert_success("Bạn vừa thêm thương hiệu thành công!!");
                        resetViewTH();
                        resetButtonTH();
                    } else {
                        alert_error();
                    }
                });
            }
        } else if (flag == 2) {
            var math = $(".txtmath").val();
            var tenth = $(".txttenth").val();
            var emailth = $(".txtemailth").val();
            var sdtth = $(".txtsdtth").val();
            var faxth = $(".txtfaxth").val();
            var diachith = $(".txtdiachith").val();
            var websiteth = $(".txtwebsiteth").val();

            if (math == "") {
                alert_info("Vui lòng nhập mã thương hiệu!!");
                $(".txtmath").focus();
            } else if (tenth == "") {
                alert_info("Vui lòng nhập tên thương hiệu!!");
                $(".txttenth").focus();
            } else if (emailth == "") {
                alert_info("Vui lòng nhập email thương hiệu!!");
                $(".txtemailth").focus();
            } else if (sdtth == "") {
                alert_info("Vui lòng nhập số điện thoại!!");
                $(".txtsdtth").focus();
            } else if (diachith == "") {
                alert_info("Vui lòng nhập địa chỉ!!");
                $(".txtdiachith").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    math: math,
                    tenth: tenth,
                    emailth: emailth,
                    sdtth: sdtth,
                    faxth: faxth,
                    diachith: diachith,
                    websiteth: websiteth,
                    event: "updateTH"
                }
                queryDataPost_JSON("php/apithuonghieu.php", dataclient, function (dataserver) {
                    if (dataserver.success == 1) {
                        alert_success("Bạn vừa cập nhật thương hiệu thành công!!");
                        showDataThuongHieu();
                        resetViewTH();
                        resetButtonTH();
                        flag = 0;
                    } else {
                        alert_error("Thất bại!!");
                    }
                });
            }
        } else {
            console.log("bạn chưa thao tác thêm hoặc sửa");
        }
    });
    $(".btnxoath").on('click', function () {
        var math = $(".txtmath").val();
        var tenth = $(".txttenth").val();
        if (math == "") {
            alert_info("Bạn chưa chọn thương hiệu!!");
        } else {
            //sweetalert Y/N
            Swal.fire({
                title: 'Bạn có chắc là xoá thương hiệu[' + tenth + '] không?',
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
                        event: "deleteTH",
                        math: math,
                    };
                    queryDataPost_JSON("php/apithuonghieu.php", dataSend, function (data) {
                        if (data.success == 1) {
                            showDataThuongHieu();
                            resetViewTH();
                            resetButtonTH();
                            alert_success("Bạn đã xoá thương hiệu thành công");
                        } else if (data.success == 2) {
                            alert_info("Có sản phẩm của thương hiệu!!");
                        } else {
                            alert_error("Mã thương hiệu không tồn tại!!");
                        }
                    });
                }
            })
        }
    });

    $(".addListThuongHieu").on('click', 'td', function () {
        var math = $(this).parent().attr("data-math");
        var tenth = $(this).parent().attr("data-tenth");
        var emailth = $(this).parent().attr("data-emailth");
        var sdtth = $(this).parent().attr("data-sdtth");
        var faxth = $(this).parent().attr("data-faxth");
        var diachith = $(this).parent().attr("data-diachith");
        var websiteth = $(this).parent().attr("data-websiteth");
        $(".txtmath").val(math);
        $(".txttenth").val(tenth);
        $(".txtemailth").val(emailth);
        $(".txtsdtth").val(sdtth);
        $(".txtfaxth").val(faxth);
        $(".txtdiachith").val(diachith);
        $(".txtwebsiteth").val(websiteth);

        $(".txttenth").focus();

        $(".btnthemth").prop("disabled", true);
        $(".btnluuth").prop("disabled", true);
        $(".btnsuath").prop("disabled", false);
        $(".txtmath").prop("disabled", true);
    });
})

function resetViewTH() {
    $(".txtmath").prop("disabled", false);
    $(".txtmath").val("");
    $(".txttenth").val("");
    $(".txtemailth").val("");
    $(".txtsdtth").val("");
    $(".txtfaxth").val("");
    $(".txtdiachith").val("");
    $(".txtwebsiteth").val("");
    $(".txtmath").focus();
}
function resetButtonTH() {
    flag = 0;
    $(".btnthemth").prop("disabled", false);
    $(".btnluuth").prop("disabled", true);
    $(".btnsuath").prop("disabled", true);
    $(".txtmath").prop("disabled", false);
}
//viết hàm hiển thị dữ liệu lên table
function showDataThuongHieu() {
    var dataSend = {
        event: "getALLTH"
    }
    queryDataPost_JSON("php/apithuonghieu.php", dataSend, function (data) {
        if (data.items.length == 0) {
            $(".addListThuongHieu").html("<tr><td colspan=5>Không tìm thấy record</td><tr>");
        } else {
            var htmls = '';
            var list = data.items;
            var stt = 1;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr data-math="' + d.math + '" data-tenth="' + d.tenth + '" data-emailth="' + d.emailth + '" data-sdtth="' + d.sdtth + '" data-faxth="' + d.faxth + '" data-diachith="' + d.diachith + '" data-websiteth="' + d.websiteth + '">' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.math + '</td>' +
                    '<td>' + d.tenth + '</td>' +
                    '<td>' + d.emailth + '</td>' +
                    '<td>' + d.sdtth + '</td>' +
                    '<td>' + d.faxth + '</td>' +
                    '<td>' + d.diachith + '</td>' +
                    '<td>' + d.websiteth + '</td>' +
                    '</tr>';
                stt++;
            }
            $(".addListThuongHieu").html(htmls);
        }
    });
}
