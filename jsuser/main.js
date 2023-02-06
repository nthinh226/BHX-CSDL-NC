var flag_pic = 0;
$(document).ready(function () {
	buildUserDropdown();
	$('.btn_log_out').click(function () {
		logout();
	});
	$('.btn_change_matkhau').click(function () {
		$('.showmodalchangematkhau').modal('show');
	});

	$('.btnthemnhanvien').click(function () {
		$('.showmodalthemnhanvien').modal('show');
	});

	$('.btnthemsanpham').click(function () {
		
		$('.showmodalthemsanpham').modal('show');
	});

	$('.btn_change_pass').click(function () {
		//var txtpassold=$('.txtpassold').val();
		var txtpassnew = $('.txtpassnew').val();
		var txtpassnewagain = $('.txtpassnewagain').val();
		if (txtpassnew == '' || txtpassnewagain == '') {
			alert_info('Mật khẩu không được trống');
		} else if (txtpassnew != txtpassnewagain) {
			alert_info('Mật khẩu cũ và mới không khớp');
		} else {
			var dataSend = {
				event: 'updatepass',
				matkhau: txtpassnew,
				tendangnhap: localStorage.getItem('usernamecomputerstore'),
			};
			$('.progesschangepass').html(
				"<img src='images/loading.gif' width='5px' height='5px'/>"
			);

			queryDataPost_JSON('php/apinhanvien.php', dataSend, function (res) {
				if (res['updatepass'] == 1) {
					alert_success('Thay đổi mật khẩu thành công');
					$('.showmodalchangematkhau').modal('hide');
				} else {
					alert_info('Thay đổi mật khẩu thất bại');
				}

				$('.progesschangepass').html('');
			});
		}
	});
	// ẩn các table và chỉ hiện khi nhấn vào mục sidebar tương ứng
	// ban đầu chạy trang chủ
	swapMain('formtrangchu');

	// trang chủ
	$('.menutrangchu').click(function () {
		console.log('abc');
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#"> Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formtrangchu');
	});

	// ke luong
	$('.menukeluong').click(function () {
		console.log('abc');
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formkeluong');
	});

	// nhanvien
	$('.menunhanvien').click(function () {
		console.log('abc');
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formnhanvien');
	});

	// dathang
	$('.menudathang').click(function () {
		console.log('abc');
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formdathang');
	});

	// thể loại
	$('.menutheloai').click(function () {
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this).parents('.danhmuc').children('.tendanhmuc').text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formtheloai');
		resetButtonTL();
		resetViewTL();
		showDataTheLoai(); //show bảng thể loại
	});

	// thương hiệu
	$('.menuthuonghieu').click(function () {
		// showdatatable('menuthuonghieu');
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this).parents('.danhmuc').children('.tendanhmuc').text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formthuonghieu');
		resetButtonTH();
		resetViewTH();
		showDataThuongHieu();
	});

	// nhà cung cấp
	$('.menunhacungcap').click(function () {
		// showdatatable('menunhacungcap'); //show bảng thương hiệU
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);

		swapMain('formnhacungcap');
		resetButtonNCC();
		resetViewNCC();
		showDataNhaCungCap();
	});

	// sản phẩm
	$('.menusanpham').click(function () {
		flag_pic = 0; //0 là đang trong sản phẩm
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formsanpham');
		resetButtonSP();
		resetViewSP();
		resetThemHinhAnhSP();
		showDataSanPham(0, record);
	});

	// sản phẩm
	$('.menudoanhthu').click(function () {
		flag_pic = 0; //0 là đang trong sản phẩm
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">Trang chủ ' +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formdoanhthu');
		resetButtonSP();
		resetViewSP();
		resetThemHinhAnhSP();
		showDataSanPham(0, record);
	});

	//thương hiệu sản phẩm
	$('.menuthuonghieusanpham').click(function () {
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this).parents('.danhmuc').children('.tendanhmuc').text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formthuonghieusanpham');
		getALLTH();
		resetViewTHSP();
		showDataThuongHieuSanPham(0, record);
	});
	//nghiệp vụ bán hàng
	$('.menuxemdonhang').click(function () {
		showDataDonDatHang();
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this)
					.parents('.tendanhmucnvbh')
					.children('.tennghiepvubanhang')
					.text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).children().text() +
				'</li>'
		);
		swapMain('formxemdonhang');
		$('.ctdh_manv').html(localStorage.getItem('manvlogin'));
	});
	$('.menubaocaodoanhthu').click(function () {
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this)
					.parents('.tendanhmucnvbh')
					.children('.tennghiepvubanhang')
					.text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).children().text() +
				'</li>'
		);
		swapMain('formbaocaodoanhthu');
		$('.bangbaocaodoanhthu').addClass('is-hidden');
	});
	//  tài khoản nhân viên
	$('.menutaikhoannhanvien').click(function () {
		flag_pic = 1; //1 là ở tài khoản nhân viên
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this)
					.parents('.menuquanlytaikhoan')
					.children('.tenmenuquanlytaikhoan')
					.text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formtaikhoannhanvien');
		showDataNhanVien(0, record);
		showHidePassword('matkhaunv');
		resetButtonNV();
		resetViewNV();
		resetThemHinhAnhNV();
	});

	//  tài khoản khách hàng
	$('.menutaikhoankhachhang').click(function () {
		flag_pic = 2; //2 là ở tài khoản khách hàng
		$('.titlestatus').html(
			' <li class="breadcrumb-item"><a href="#">' +
				$(this)
					.parents('.menuquanlytaikhoan')
					.children('.tenmenuquanlytaikhoan')
					.text() +
				'</a></li><li class="breadcrumb-item active">' +
				$(this).text() +
				'</li>'
		);
		swapMain('formtaikhoankhachhang');
		showHidePassword('matkhaukh');

		showDataKhachHang(0, record);
		resetButtonKH();
		resetViewKH();
		resetThemHinhAnhKH();
	});
});
var record = 5; //số dòng hiển thị trong bảng
/* ---- Hàm truy vấn AJAX ---- */
function queryDataPost_JSON(url, dataSend, callback) {
	$.ajax({
		type: 'POST',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'json',
		success: callback,
	});
}

function queryDataGet_JSON(url, dataSend, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'json',
		success: callback,
	});
}

/* ---- Hàm chuyển đổi ẩn/hiện các table ---- */
function swapMain(tenbien) {
	$('.formtrangchu').addClass('is-hidden'); //ẩn
	$('.formsanpham').addClass('is-hidden'); //ẩn
	$('.formnhacungcap').addClass('is-hidden'); //ẩn
	$('.formnhanvien').addClass('is-hidden'); //ẩn
	$('.formdathang').addClass('is-hidden'); //ẩn
	$('.formdoanhthu').addClass('is-hidden'); //ẩn
	$('.formkeluong').addClass('is-hidden'); //ẩn

	$('.formtheloai').addClass('is-hidden'); //ẩn
	$('.formthuonghieu').addClass('is-hidden'); //ẩn
	$('.formsanpham').addClass('is-hidden'); //ẩn
	$('.formtaikhoannhanvien').addClass('is-hidden'); //ẩn
	$('.formtaikhoankhachhang').addClass('is-hidden'); //ẩn
	$('.formnhacungcap').addClass('is-hidden'); //ẩn
	$('.formthuonghieusanpham').addClass('is-hidden'); //ẩn
	$('.formxemdonhang').addClass('is-hidden'); //ẩn
	$('.formbaocaodoanhthu').addClass('is-hidden'); //ẩn
	$('.' + tenbien).removeClass('is-hidden');
}

function showHidePassword(id) {
	var x = document.getElementById(id);
	if (x.type === 'password') {
		x.type = 'text';
	} else {
		x.type = 'password';
	}
}

/* ---- Hàm alert ---- */
function alert_success(mes) {
	Swal.fire('Thành công!', mes, 'success');
}

function alert_error(mes) {
	Swal.fire({
		icon: 'error',
		title: 'Thất bại...',
		text: mes,
	});
}

function sweetalert_info(thongbao) {
	Swal.fire(thongbao);
}

function alert_info(mes) {
	let timerInterval;
	Swal.fire({
		title: mes,
		html: '<br/><br/>I will close in <strong></strong> seconds.',
		timer: 4000,
		didOpen: () => {
			const content = Swal.getHtmlContainer();
			const $ = content.querySelector.bind(content);
			Swal.showLoading();
			timerInterval = setInterval(() => {
				Swal.getHtmlContainer().querySelector('strong').textContent = (
					Swal.getTimerLeft() / 1000
				).toFixed(0);
			}, 100);
		},
		willClose: () => {
			clearInterval(timerInterval);
		},
	});
}

//xử lý phân trang
function printSTT(record, pageCurr) {
	if (pageCurr + 1 == 1) {
		return 1;
	} else {
		return record * (pageCurr + 1) - (record - 1);
	}
}
function buildSlidePage(obj, codan, pageActive, totalPage) {
	var html = '';
	pageActive = parseInt(pageActive);
	for (i = 1; i <= codan; i++) {
		if (pageActive - i < 0) break;
		html =
			'<button type="button" class="btn btn-outline btn-default" value="' +
			(pageActive - i) +
			'">' +
			(pageActive - i + 1) +
			'</button>' +
			html;
	}
	if (pageActive > codan) {
		html =
			'<button type="button" class="btn btn-outline btn-default" value="' +
			(pageActive - i) +
			'">...</button>' +
			html;
	}
	html +=
		'<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' +
		pageActive +
		'">' +
		(pageActive + 1) +
		'</button>';
	for (i = 1; i <= codan; i++) {
		if (pageActive + i >= totalPage) break;
		html =
			html +
			'<button  type="button" class="btn btn-outline btn-default" value="' +
			(pageActive + i) +
			'">' +
			(pageActive + i + 1) +
			'</button>';
	}
	if (totalPage - pageActive > codan + 1) {
		html =
			html +
			'<button type="button" value="' +
			(pageActive + i) +
			'" class="btn btn-outline btn-default">...</button>';
	}
	obj.html(html);
}

//Hàm upload ảnh
function initUploadAllCommon() {
	'use strict';
	var resize = new window.resize();
	resize.init();

	event.preventDefault();
	var files = event.target.files;
	var countFile = files.length;
	for (var i in files) {
		if (typeof files[i] !== 'object') return false;

		(function () {
			var initialSize = files[i].size;

			resize.photo(files[i], 1200, 'file', function (resizedFile) {
				var resizedSize = resizedFile.size;
				if (flag_pic == 0) {
					$('.progresscommon').html('Ảnh sản phẩm: Đang tải file');
				} else if (flag_pic == 1) {
					$('.progresscommonnhanvien').html('Ảnh đại diện: Đang tải file');
				} else if (flag_pic == 2) {
					$('.progresscommonkhachhang').html('Ảnh đại diện: Đang tải file');
				}

				upload(resizedFile, function (res) {
					//Lưu ý hàm này
					if (flag_pic == 0) {
						ketquauploadsanpham(JSON.parse(res));
					} else if (flag_pic == 1) {
						ketquauploadnhanvien(JSON.parse(res));
					} else if (flag_pic == 2) {
						ketquauploadkhachhang(JSON.parse(res));
					}
				});

				// This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
				resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {});
			});
		})();
	}
}

function ketquauploadmodal(oj) {
	if (oj.status == true) {
		$('.modalprogresscommonnhanvien').html('Ảnh đại diện: Tải thành công!!');
		modalurlimagenhanvien = oj.attach;
		//hiển thị lên
		$('.modalimgnhanvien').removeClass('is-hidden');
		$('#modalimgPreviewNhanVien').attr('src', 'images/' + urlimagenhanvien);
	} else {
		$('.modalprogresscommonnhanvien').html('Ảnh đại diện: Tải thất bại');
	}
}

var upload = function (photo, callback) {
	var formData = new FormData();
	formData.append('photo', photo);

	$.ajax({
		url: './spuploadimagestatus/process.php',
		type: 'POST',
		data: formData,
		async: true,
		xhrFields: {
			withCredentials: true,
		},
		processData: false, // tell jQuery not to process the data
		contentType: false, // tell jQuery not to set contentType
		success: callback,
	});
};

function buildUserDropdown() {
	myUser = JSON.parse(localStorage.getItem('usercomputerstore'));
	if (myUser == undefined || myUser == null || myUser == '') {
		location.href = 'login.html';
	} else {
		var avatar = myUser.items[0].avatar;
		var gioitinh = myUser.items[0].gioitinh;
		var quyen = myUser.items[0].quyen;
		$('.addusername').html(
			"<div style='text-align=center;'>" +
				myUser.items[0].hotennv +
				'<br><a href="#" class="btn_change_matkhau">[Đổi mật khẩu]</a>&nbsp;<a href="#" class="btn_log_out">[Logout]</a></div>'
		);
		if (avatar == '' || avatar == undefined || avatar == 'null') {
			if (gioitinh == 'Nam') {
				$('.addavatar').attr('src', 'images/noavatarmale.png');
			} else {
				$('.addavatar').attr('src', 'images/noavatarfemale.png');
			}
		} else {
			$('.addavatar').attr('src', 'images/' + avatar);
		}
		//phân quyềN
		if (quyen == 1) {
			$('.form-horizontal').addClass('is-hidden');
			$('.menubaocaodoanhthu').addClass('is-hidden');
			$('.menuquanlytaikhoan').addClass('is-hidden');
			$('.menuthuonghieusanpham').addClass('is-hidden');
		} else {
			$('.form-horizontal').removeClass('is-hidden');
		}
	}
}
function logout() {
	localStorage.removeItem('remembercomputerstore');
	localStorage.removeItem('usernamecomputerstore');
	localStorage.removeItem('passwordcomputerstore');
	localStorage.removeItem('usercomputerstore');
	localStorage.removeItem('manvlogin');
	location.href = 'login.html';
}
