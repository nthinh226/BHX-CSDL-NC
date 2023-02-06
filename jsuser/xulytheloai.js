$(document).ready(function () {
    var flag = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemtl").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemtl").prop("disabled", true);
        $(".btnluutl").prop("disabled", false);
        $(".btnsuatl").prop("disabled", true);
        $(".txtmatl").prop("disabled", false);
        //2.Xóa các ô text field 
        resetViewTL();
        flag = 1;
    });

    $(".btnsuatl").on('click', function () {
        //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
        $(".btnthemtl").prop("disabled", true);
        $(".btnluutl").prop("disabled", false);
        $(".btnsuatl").prop("disabled", true);
        flag = 2;
    });

    $(".btnlamlaitl").on('click', function () {
        resetViewTL();
        resetButtonTL();
    });

    $(".btnluutl").on('click', function () {
        if (flag == 1) {
            //1.Lấy dữ liệu trên form
            var matl = $(".txtmatl").val();
            var tentl = $(".txttentl").val();
            var motatl = $(".txtmotatl").val();
            if (matl == "") {
                alert_info("Vui lòng nhập mã thể loại!!");
                $(".txtmatl").focus();
            } else if (tentl == "") {
                alert_info("Vui lòng nhập tên thể loại!!");
                $(".txttentl").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    matl: matl,
                    tentl: tentl,
                    motatl: motatl,
                    event: "insertTL"
                }
                queryDataPost_JSON("php/apitheloai.php", dataclient, function (dataserver) {
                    if (dataserver.success == 2) {
                        alert_error("Bị trùng khóa");
                    } else if (dataserver.success == 1) {
                        showDataTheLoai();
                        alert_success("Bạn vừa thêm thể loại thành công!!");
                        resetViewTL();
                        resetButtonTL();
                    } else {
                        alert_error();
                    }
                });
            }
        } else if (flag == 2) {
            //1.Lấy dữ liệu trên form
            var matl = $(".txtmatl").val();
            var tentl = $(".txttentl").val();
            var motatl = $(".txtmotatl").val();
            if (matl == "") {
                alert_info("Vui lòng nhập mã thể loại!!");
                $(".txtmatl").focus();
            } else if (tentl == "") {
                alert_info("Vui lòng nhập tên thể loại!!");
                $(".txttentl").focus();
            } else { ///dữ liệu ta thỏa mản
                var dataclient = {
                    matl: matl,
                    tentl: tentl,
                    motatl: motatl,
                    event: "updateTL"
                }
                queryDataPost_JSON("php/apitheloai.php", dataclient, function (dataserver) {
                    if (dataserver.success == 1) {
                        alert_success("Bạn vừa cập nhật thể loại thành công!!");
                        showDataTheLoai();
                        resetViewTL();
                        resetButtonTL();
                        $(".txtmatl").prop("disabled", false);
                        flag = 0;
                    } else {
                        alert_error();
                    }
                });
            }
        } else {
            console.log("bạn chưa thao tác thêm hoặc sửa");
        }
    });
    
    $(".btnxoatl").on('click', function () {
        var matl = $(".txtmatl").val();
        var tentl = $(".txttentl").val();
        if (matl == "") {
            alert_info("Bạn chưa chọn thể loại!!");
        } else {
            //sweetalert Y/N
            Swal.fire({
                title: 'Bạn có chắc là xoá thể loại[' + tentl + '] không?',
                text: "Sau khi xoá không thể khôi phục!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Chắc chắn rồi!'
            }).then((result) => {
                if (result.isConfirmed) { //khi người dùng chọn ok
                    var dataSend = {
                        event: "deleteTL",
                        matl: matl,
                    };
                    queryDataPost_JSON("php/apitheloai.php", dataSend, function (data) {
                        if (data.success == 1) {
                            showDataTheLoai();
                            resetViewTL();
                            resetButtonTL();
                            alert_success("Bạn đã xoá thể loại thành công");
                        } else if (data.success == 2) {
                            alert_info("Thể loại đã được sử dụng trong bảng sách");
                        } else {
                            alert_error("Mã thể loại không tồn tại!!");
                        }
                    });
                }
            })
        }

    });

    $(".addListTheLoai").on('click', 'td', function () {
        var matl = $(this).parent().attr("data-matl");
        var tentl = $(this).parent().attr("data-tentl");
        var motatl = $(this).parent().attr("data-motatl");
        $(".txtmatl").val(matl);
        $(".txttentl").val(tentl);
        $(".txtmotatl").val(motatl);

        $(".btnthemtl").prop("disabled", true);
        $(".btnluutl").prop("disabled", true);
        $(".btnsuatl").prop("disabled", false);
        $(".txtmatl").prop("disabled", true);

        $(".txttentl").focus();
    });
})

function resetViewTL() {
    $(".txtmatl").prop("disabled", false);
    $(".txtmatl").val("");
    $(".txttentl").val("");
    $(".txtmotatl").val("");
    $(".txtmatl").focus();
}
function resetButtonTL() {
    flag = 0;
    $(".btnthemtl").prop("disabled", false);
    $(".btnluutl").prop("disabled", true);
    $(".btnsuatl").prop("disabled", true);
    $(".txtmatl").prop("disabled", false);
}
//viết hàm hiển thị dữ liệu lên table
function showDataTheLoai() {
    var dataSend = {
        event: "getALLTL"
    }

    queryDataPost_JSON("php/apitheloai.php", dataSend, function (data) {
        if (data.items.length == 0) {
            $(".addListTheLoai").html("<tr><td colspan=5>Không tìm thấy record</td><tr>");
        } else {
            var htmls = '';
            var list = data.items;
            var stt = 1;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr data-matl="' + d.matl + '" data-tentl="' + d.tentl + '" data-motatl="' + d.motatl + '">' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.matl + '</td>' +
                    '<td>' + d.tentl + '</td>' +
                    '<td>' + d.motatl + '</td>' +
                    '</tr>';
                stt++;
            }
            $(".addListTheLoai").html(htmls);
        }
    });
}

