$(document).ready(function () {
	var myUser = JSON.parse(localStorage.getItem('usercomputerstore'));
	if (myUser != null || myUser != undefined) {
		var r = localStorage.getItem('remembercomputerstore');
		if (r == 'true') {
			$('.txtphone').val(localStorage.getItem('usernamecomputerstore'));
		}
	}
	$('.btnlogin').click(function () {
		var tendangnhap = $('.txtphone').val();
		if (tendangnhap == '') {
			alert('Nhập số điện thoại');
		} else {
			var datasend = {
				tendangnhap: tendangnhap,
				matkhau: '1',
			};
			
			queryData('php/apilogin.php', datasend, function (data) {  
				if (data.success == 1) {
					var manv = data.items[0].manv;
					if ($('.remember').is(':checked')) {
						localStorage.setItem('remembercomputerstore', true);
					} else {
						localStorage.removeItem('remembercomputerstore');
					}
					localStorage.setItem('usernamecomputerstore', tendangnhap);
					// localStorage.setItem('passwordcomputerstore', matkhau);
					localStorage.setItem('manvlogin', manv);
					localStorage.setItem('usercomputerstore', JSON.stringify(data)); //lưu đối tượng

					location.href = 'index.html'; //chuyển sang index.html
				} else {
					alert('Tài khoản chưa đúng');
					$('.txtemail').val('');
					$('.txtpass').val('');
				}
			});
		}
	});
});

function queryData(url, dataSend, callback) {
	$.ajax({
		type: 'POST',
		url: url,
		data: dataSend,
		async: true,
		dataType: 'json',
		success: callback,
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.responseText);
		}
	});
}
