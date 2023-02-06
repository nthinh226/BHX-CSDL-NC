$(document).ready(function () {
    $(".btnlamlaithsp").on('click', function () {
        resetViewTHSP();
    });

    $(".cbthuonghieusanpham").change(function () {
        var tenthuonghieu = $(".cbthuonghieusanpham option:selected").text();
        $(".title-thuonghieusanpham").html('<h3 class="card-title ">Các sản phẩm của thương hiệu <b>'+tenthuonghieu+'</b></h3>')
        showDataThuongHieuSanPham(0, record);
        
    })


    ///Xử lý các nút mà phân trang
    $(".pagenumberthuonghieusanpham").on('click', 'button', function () {
        showDataSanPham($(this).val(), record);
    });

    $(".txtfindthuonghieusanpham").on('keyup', function () {
        showDataThuongHieuSanPham(0, record);
    })

    $(".addListThuongHieuSanPham").on('click', 'td', function () {
        var tensp = $(this).parent().attr("data-tensp");
        var math = $(this).parent().attr("data-math");

        $(".txttenthsp").val(tensp);
        $(".cbthuonghieusanpham").val(math)
    });

    
    $(".addListThuongHieuSanPham").on('click', '.click_del_thuonghieusanpham', function () {
        var masp = $(this).parent().attr("data-masp");
        var math = $(this).parent().attr("data-math");
        var tensp = $(this).parent().attr("data-tensp");
        //sweetalert Y/N
        Swal.fire({
            title: 'Bạn có chắc là xoá thương hiệu của sản phẩm [' + tensp + '] không?',
            text: "Sau khi xoá bạn khổng thể thêm lại thương hiệu!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chắc chắn rồi!'
        }).then((result) => {
            if (result.isConfirmed) {
                //khi người dùng chọn ok
                var dataSend = {
                    event: "deleteTHSP",
                    masp: masp,
                    math: math,
                };
                queryDataPost_JSON("php/apithuonghieusanpham.php", dataSend, function (data) {
                    if (data.success == 1) {
                        showDataThuongHieuSanPham(0, record);
                        resetViewTHSP();
                        alert_success("Bạn đã xoá thương hiệu của sản phẩm thành công");
                    } else {
                        alert_error("Thương hiệu sản phẩm không tồn tại!!");
                    }
                });
            }
        })

    });
})

function resetViewTHSP() {
    $(".txttenthsp").prop("disabled", false);
    $(".cbthuonghieusanpham").val("");
    $(".txttenthsp").val("");

    $(".addListThuongHieuSanPham").html('<tr><td colspan=5>Không tìm thấy record</td><tr>');
}
//viết hàm hiển thị dữ liệu lên table
function showDataThuongHieuSanPham(page, record) {
    var find = $('.txtfindthuonghieusanpham').val();
    var math = $('.cbthuonghieusanpham').val();
    var dataSendTHSP = {
        page: page,
        record: record,
        search: find,
        math: math,
        event: "getALLTHSP"
    }
    queryDataPost_JSON("php/apithuonghieusanpham.php", dataSendTHSP, function (res) {
        if (res.items.length == 0) {
            $(".addListThuongHieuSanPham").html("<tr><td colspan=5>Không tìm thấy record</td><tr>");
            $('.pagenumberthuonghieusanpham').html("");
        } else {
            var stt = printSTT(record, res.page);
            var htmls = '';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr data-math="' + d.math +
                    '" data-masp="' + d.masp +
                    '" data-tensp="' + d.tensp + '">' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.masp + '</td>' +
                    '<td>' + d.tensp + '</td>' +
                    '<td><img src="images/' + d.hinhanhsp + '" width="100" height="100"></td>' +
                    '<td class="click_del_thuonghieusanpham text-center"><i class="fa fa-trash" aria-hidden="true"></i></td>' +
                    '</tr>';
                stt++;
            }
            $(".addListThuongHieuSanPham").html(htmls);
            buildSlidePage($('.pagenumberthuonghieusanpham'), 5, res.page, res.totalpage);
        }
    });
}
function getALLTH() {
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
            $(".cbthuonghieusanpham").html(htmls);
        }
    });
}
