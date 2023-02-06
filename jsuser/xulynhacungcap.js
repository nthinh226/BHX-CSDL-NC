$(document).ready(function () {
  var flag = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
  $(".btnthemncc").on('click', function () {
    //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
    $(".btnthemncc").prop("disabled", true);
    $(".btnluuncc").prop("disabled", false);
    $(".btnsuancc").prop("disabled", true);
    $(".txtmancc").prop("disabled", false);
    //2.Xóa các ô text field 
    resetViewNCC();
    flag = 1;
  });
  $(".btnsuancc").on('click', function () {
    //1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
    $(".btnthemncc").prop("disabled", true);
    $(".btnluuncc").prop("disabled", false);
    $(".btnsuancc").prop("disabled", true);
    flag = 2;
  });
  $(".btnlamlaincc").on('click', function () {
    resetViewNCC();
    resetButtonNCC();
  });
  $(".btnluuncc").on('click', function () {
    if (flag == 1) {
      //1.Lấy dữ liệu trên form
      var mancc = $(".txtmancc").val();
      var tenncc = $(".txttenncc").val();
      var diachincc = $(".txtdiachincc").val();
      var sdtncc = $(".txtsdtncc").val();
      var faxncc = $(".txtfaxncc").val();
      var emailncc = $(".txtemailncc").val();

      if (mancc == "") {
        alert_info("Vui lòng nhập mã nhà cung cấp!!");
        $(".txtmancc").focus();
      } else if (tenncc == "") {
        alert_info("Vui lòng nhập tên nhà cung cấp!!");
        $(".txttenncc").focus();
      } else if (sdtncc == "") {
        alert_info("Vui lòng nhập số điện thoại!!");
        $(".txtsdtncc").focus();
      } else if (emailncc == "") {
        alert_info("Vui lòng nhập email!!");
        $(".txtemailncc").focus();
      } else { ///dữ liệu ta thỏa mản
        var dataclient = {
          mancc: mancc,
          tenncc: tenncc,
          diachincc: diachincc,
          sdtncc: sdtncc,
          faxncc: faxncc,
          emailncc: emailncc,
          event: "insertNCC"
        }
        queryDataPost_JSON("php/apinhacungcap.php", dataclient, function (dataserver) {
          if (dataserver.success == 2) {
            alert_error("Bị trùng khóa");
          } else if (dataserver.success == 1) {
            showDataNhaCungCap();
            alert_success("Bạn vừa thêm nhà cung cấp thành công!!");
            resetViewNCC();
            resetButtonNCC();
          } else {
            alert_error();
          }
        });
      }
    } else if (flag == 2) {
      //1.Lấy dữ liệu trên form
      var mancc = $(".txtmancc").val();
      var tenncc = $(".txttenncc").val();
      var diachincc = $(".txtdiachincc").val();
      var sdtncc = $(".txtsdtncc").val();
      var faxncc = $(".txtfaxncc").val();
      var emailncc = $(".txtemailncc").val();

      if (mancc == "") {
        alert_info("Vui lòng nhập mã thương hiệu!!");
        $(".txtmancc").focus();
      } else if (tenncc == "") {
        alert_info("Vui lòng nhập tên thương hiệu!!");
        $(".txttenncc").focus();
      } else if (sdtncc == "") {
        alert_info("Vui lòng nhập số điện thoại!!");
        $(".txtsdtncc").focus();
      } else if (emailncc == "") {
        alert_info("Vui lòng nhập email!!");
        $(".txtemailncc").focus();

      } else { ///dữ liệu ta thỏa mản
        var dataclient = {
          mancc: mancc,
          tenncc: tenncc,
          diachincc: diachincc,
          sdtncc: sdtncc,
          faxncc: faxncc,
          emailncc: emailncc,
          event: "updateNCC"
        }
        queryDataPost_JSON("php/apinhacungcap.php", dataclient, function (dataserver) {
          if (dataserver.success == 1) {
            alert_success("Bạn vừa cập nhật nhà cung cấp thành công!!");
            showDataNhaCungCap();
            resetViewNCC();
            resetButtonNCC();
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
  $(".btnxoancc").on('click', function () {
    var mancc = $(".txtmancc").val();
    var tenncc = $(".txttenncc").val();
    if (mancc == "") {
      alert_info("Bạn chưa chọn nhà cung cấp!!");
      mancc.focus();
    } else {
      //sweetalert Y/N
      Swal.fire({
        title: 'Bạn có chắc là xoá nhà cung cấp [' + tenncc + '] không?',
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
            event: "deleteNCC",
            mancc: mancc,
          };
          queryDataPost_JSON("php/apinhacungcap.php", dataSend, function (data) {
            if (data.success == 1) {
              showDataNhaCungCap();
              resetViewNCC();
              resetButtonNCC();
              alert_success("Bạn đã xoá nhà cung cấp thành công");
            } else if (data.success == 2) {
              alert_info("Có sản phẩm của nhà cung cấp!!");
            } else {
              alert_error("Mã nhà cung cấp không tồn tại!!");
            }
          });
        }
      })
    }
  });

  $(".addListNhaCungCap").on('click', 'td', function () {
    var mancc = $(this).parent().attr("data-mancc");
    var tenncc = $(this).parent().attr("data-tenncc");
    var diachincc = $(this).parent().attr("data-diachincc");
    var sdtncc = $(this).parent().attr("data-sdtncc");
    var faxncc = $(this).parent().attr("data-faxncc");
    var emailncc = $(this).parent().attr("data-emailncc");

    $(".txtmancc").val(mancc);
    $(".txttenncc").val(tenncc);
    $(".txtdiachincc").val(diachincc);
    $(".txtsdtncc").val(sdtncc);
    $(".txtfaxncc").val(faxncc);
    $(".txtemailncc").val(emailncc);

    $(".txttenncc").focus();

    $(".btnthemncc").prop("disabled", true);
    $(".btnluuncc").prop("disabled", true);
    $(".btnsuancc").prop("disabled", false);
    $(".txtmancc").prop("disabled", true);
  });
})

function resetViewNCC() {
  $(".txtmancc").prop("disabled", false);
  $(".txtmancc").val("");
  $(".txttenncc").val("");
  $(".txtdiachincc").val("");
  $(".txtsdtncc").val("");
  $(".txtfaxncc").val("");
  $(".txtemailncc").val("");
  $(".txtmancc").focus();
}
function resetButtonNCC() {
  flag = 0;
  $(".btnthemncc").prop("disabled", false);
  $(".btnluuncc").prop("disabled", true);
  $(".btnsuancc").prop("disabled", true);
  $(".txtmancc").prop("disabled", false);
}
//viết hàm hiển thị dữ liệu lên table
function showDataNhaCungCap() {
  var dataSend = {
    event: "getALLNCC"
  }
  queryDataPost_JSON("php/apinhacungcap.php", dataSend, function (data) {

    if (data.items.length == 0) {

      $(".addListNhaCungCap").html("<tr><td colspan=5>Không tìm thấy record</td><tr>");
    } else {
      var htmls = '';
      var list = data.items;
      var stt = 1;
      for (var item in list) {
        var d = list[item];
        htmls = htmls + '<tr data-mancc="' + d.mancc +
          '" data-tenncc="' + d.tenncc +
          '" data-diachincc="' + d.diachincc +
          '" data-emailncc="' + d.emailncc +
          '" data-sdtncc="' + d.sdtncc +
          '" data-faxncc="' + d.faxncc + '">' +
          '<td>' + stt + '</td>' +
          '<td>' + d.mancc + '</td>' +
          '<td>' + d.tenncc + '</td>' +
          '<td>' + d.diachincc + '</td>' +
          '<td>' + d.emailncc + '</td>' +
          '<td>' + d.sdtncc + '</td>' +
          '<td>' + d.faxncc + '</td>' +
          '</tr>';
        stt++;
      }
      $(".addListNhaCungCap").html(htmls);
    }
  });
}
