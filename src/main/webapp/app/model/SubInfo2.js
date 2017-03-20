Ext.define(App.path('model.SubInfo2'), {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'fullname'
		}, {
			name : 'msisdn'
		}, {
			name : 'subid'
		}, {
			name : 'subid_provided_place'
		}, {
			name : 'subid_address'
		}, {
			name : 'id_front_img'
		}, {
			name : 'id_back_img'
		}, {
			name : 'contact'
		}, {
			name : 'otp'
		} ],
		validations : [ {
			type : 'presence',
			field : 'fullname',
			message : "Họ tên chủ TB chưa được nhập!"
		}, {
			type : 'presence',
			field : 'subid',
			message : "Số CMT chưa được nhập!"
		}, {
			type : 'presence',
			field : 'contact',
			message : "Điện thoại/Email liên hệ chưa được nhập!"
		}, {
			type : 'presence',
			field : 'id_front_img',
			message : "Ảnh CMT mặt trước chưa được chọn!"
		}, {
			type : 'presence',
			field : 'id_back_img',
			message : "Ảnh CMT mặt sau chưa được chọn!"
		}, {
			type : 'presence',
			field : 'subid_address',
			message : "Địa chỉ theo CMT chưa được nhập!"
		}, {
			type : 'presence',
			field : 'subid_provided_place',
			message : "Nơi cấp CMT chưa được nhập!"
		}, {
			type : 'presence',
			field : 'msisdn',
			message : "Số điện thoại đăng ký chưa được nhập!"
		}, {
			type : 'presence',
			field : 'otp',
			message : "Mã xác nhận chưa được nhập!"
		}, {
			type : 'format',
			field : 'msisdn',
			matcher : /099\d{7}|0199\d{7}|8499\d{7}|84199\d{7}/,
			message : "Số điện thoại không đúng định dạng Gmobile."
		}, ]
	}

});
