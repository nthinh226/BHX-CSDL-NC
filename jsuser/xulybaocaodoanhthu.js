$(document).ready(function () {
    $(".txtdatestart").change(function () {
        $(".txtdateend").val("");
    })
    $(".txtdateend").change(function () {
        showDataDoanhThu();
    })
})

//viết hàm hiển thị dữ liệu lên table
function showDataDoanhThu() {
    $(".bangbaocaodoanhthu").removeClass("is-hidden");
    var datestart = $(".txtdatestart").val();
    var dateend = $(".txtdateend").val();
    if(datestart==""){
        datestart = dateend;
    }
    var dataSend = {
        datestart: datestart,
        dateend: dateend,
        event: "getBaoCaoDoanhThu"
    }
    queryDataPost_JSON("php/apixemdonhang.php", dataSend, function (res) {
        if (res.items.length == 0) {
            $(".addListBaoCaoDoanhThu").html("<tr><td colspan=3>Không tìm thấy record</td><tr>");
        } else {
            var htmls = '';
            var list = res.items;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr>' +
                    '<td>' + d.ngay + '</td>' +
                    '<td>' + d.sodon + '</td>' +
                    '<td>' + d.tongtien + '</td>' +
                    '</tr>';
            }
            htmls+='<tr class="bg-success"><td colspan=2>Tổng cộng</td><td>'+res.doanhthu+'</td><tr>'
            $(".addListBaoCaoDoanhThu").html(htmls);
        }
    });
}
