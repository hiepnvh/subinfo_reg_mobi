Ext.define(App.path('view.ViewHome'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewHome',
	bodyStyle : 'background-color: transparent',
	border : false,
	autoScroll: true,
	layout:'hbox',
	config : {
		record : null,
		fieldDefaults : {
			margin : '10 0 0 50'
		},
		items : [{
			border : false,
			layout : 'vbox',
			width: '100%',
			margin : '50 0 0 50',
			defaultType : 'textfield',
			items : [{
						flex : 1,
						width : '50%',
						minWidth : 300,
						xtype : 'combobox',
						allowBlank: false,
						editable : false,
						value : "1",
						itemId : 'requesttype',
						store: Ext.create('Ext.data.Store', {
							fields: ['sid', 'name'],
					        data : [
					            {"sid":"1", "name":"Đăng ký thông tin cá nhân cho thuê bao mới"},
					            {"sid":"0", "name":"Thay đổi/cập nhật lại thông tin thuê bao"}
					        ]
		                     }),
		                displayField: 'name',
		                valueField: 'sid',
						fieldLabel : 'Loại hình đăng ký<span style="color: red;">(*)</span>',
						listeners : {
							change : function(combobox, newValue, oldValue, eOpts) {
								var newRecord = combobox.findRecordByValue(newValue).data.sid;
								if (newRecord) {
									var form = this.up('form');
									//console.log(newRecord);
									if(newRecord=="1"){
										//dang ky moi
										form.down('#5friends').setVisible(false);
										form.down('#friend1').setVisible(false);
										form.down('#friend2').setVisible(false);
										form.down('#friend3').setVisible(false);
										form.down('#friend4').setVisible(false);
										form.down('#friend5').setVisible(false);
										form.down('#active_date').setVisible(false);
										form.down('#recent_charge_date').setVisible(false);
										form.down('#recent_charge_value').setVisible(false);
										form.down('#recent_charge_date').setVisible(false);
										form.down('#comment').setVisible(false);
										form.down('#otp').setVisible(false);
										form.down('#otpBtn').setVisible(false);
//										form.down('#reCaptcha').setVisible(true);
										form.down('#serialsim').setVisible(true);
										form.down('#simcode').setVisible(true);
										
//										form.down('#friend1').allowBlank = true;
//										form.down('#friend2').allowBlank = true;
//										form.down('#friend3').allowBlank = true;
//										form.down('#friend4').allowBlank = true;
//										form.down('#friend5').allowBlank = true;
										form.down('#otp').allowBlank = true;
										
										form.down('#serialsim').allowBlank =false;
										form.down('#simcode').allowBlank =false;
										
									}else{
										form.down('#5friends').setVisible(true);
										form.down('#friend1').setVisible(true);
										form.down('#friend2').setVisible(true);
										form.down('#friend3').setVisible(true);
										form.down('#friend4').setVisible(true);
										form.down('#friend5').setVisible(true);
										form.down('#active_date').setVisible(true);
										form.down('#recent_charge_date').setVisible(true);
										form.down('#recent_charge_value').setVisible(true);
										form.down('#recent_charge_date').setVisible(true);
										form.down('#comment').setVisible(true);
										form.down('#otp').setVisible(true);
										form.down('#otpBtn').setVisible(true);
//										form.down('#reCaptcha').setVisible(false);
										form.down('#serialsim').setVisible(false);
										form.down('#simcode').setVisible(false);
										
//										form.down('#friend1').allowBlank =false;
//										form.down('#friend2').allowBlank =false;
//										form.down('#friend3').allowBlank =false;
//										form.down('#friend4').allowBlank =false;
//										form.down('#friend5').allowBlank =false;
										form.down('#otp').allowBlank = false;
										
										form.down('#serialsim').allowBlank = true;
										form.down('#simcode').allowBlank = true;
									}
									
								}
							}
						}
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						itemId : 'fullname',
						allowBlank: false,
						fieldLabel : 'Họ tên chủ TB<span style="color: red;">(*)</span>'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						xtype : 'combobox',
						allowBlank: false,
						editable : false,
						itemId : 'sex',
						value:"1",
						store: Ext.create('Ext.data.Store', {
							fields: ['sid', 'name'],
					        data : [
					            {"sid":"1", "name":"Nam"},
					            {"sid":"0", "name":"Nữ"}
					        ]
		                     }),
                        displayField: 'name',
                        valueField: 'sid',
						fieldLabel : 'Giới tính<span style="color: red;">(*)</span>'
					}, {
						flex : 1,
						width : '50%',
						minWidth : 300,
						xtype : 'datefield',
						allowBlank: false,
						format : 'd/m/Y',
						value : new Date(),
						itemId : 'dob',
						fieldLabel : 'Ngày sinh<span style="color: red;">(*)</span>'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						allowBlank: false,
						itemId : 'subid',
						fieldLabel: 'Số CMT<span style="color: red;">(*)</span>'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						xtype : 'datefield',
						allowBlank: false,
						format : 'd/m/Y',
						value : new Date(),
						itemId : 'subid_provided_date',
						fieldLabel : 'Ngày cấp<span style="color: red;">(*)</span>'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						allowBlank: false,
						itemId : 'subid_provided_place',
						fieldLabel: 'Nơi cấp<span style="color: red;">(*)</span>'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						allowBlank: false,
						itemId : 'subid_address',
						fieldLabel: 'Địa chỉ theo CMT<span style="color: red;">(*)</span>'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						fieldLabel: 'Serial SIM<span style="color: red;">(*)</span>',
						itemId : 'serialsim'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						fieldLabel: 'Mã bảo mật<span style="color: red;">(*)</span>',
						itemId : 'simcode'
					},{
						flex : 1,
						xtype : 'label',
						itemId : '5friends',
						margin : '30 0 0 50',
						text: '5 số thường xuyên gọi/nhắn tin:'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
						fieldLabel: 'Số 1',
						itemId : 'friend1'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
						fieldLabel: 'Số 2',
						itemId : 'friend2'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
						fieldLabel: 'Số 3',
						itemId : 'friend3'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
						fieldLabel: 'Số 4',
						itemId : 'friend4'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
						fieldLabel: 'Số 5',
						itemId : 'friend5'
//					},{
//						xtype : 'filefield',
//						width : '50%',
//						allowBlank: false,
//						itemId : 'id_front_img',
//						fieldLabel : 'Ảnh CMT mặt trước<span style="color: red;">(*)</span>',
//						msgTarget : 'side',
//						buttonText : 'Tải lên'
//					},{
//						xtype : 'filefield',
//						width : '50%',
//						allowBlank: false,
//						itemId : 'id_back_img',
//						fieldLabel : 'Ảnh CMT mặt sau<span style="color: red;">(*)</span>',
//						msgTarget : 'side',
//						buttonText : 'Tải lên'
					},{
						xtype : 'form',
						itemId : 'id_front_img',
//						width : '50%',
//								width : '60%',
						border : false,
						items : [{
								
								xtype : 'filefield',
								validator: function(v){
									if(!/\.(gif|jpg|jpeg|tiff|png)$/i.test(v)){
									      return 'Yêu cầu file dạng ảnh gif, jpg, jpeg, tiff, png';
								    }
								    return true;
								  },
//								buttonOnly: true,
								itemId : 'file_link1',
								fieldLabel : 'Ảnh CMT mặt trước<span style="color: red;">(*)</span>',
								msgTarget : 'side',
								buttonText : 'Chọn file',
//								listeners : {
//									change : function(field, value) {
//										var mainForm = this.up('form').up('form');
//										mainForm.down('#save2').setDisabled(false);
////												mainForm.down('#file_name').setValue(value);
//									}
//								}
							}
//							,{
//							width : 100,
//							itemId : 'file_name',
//							fieldLabel : 'đường dẫn',
//							readOnly : true,
//							fieldStyle: 'background-color: #ddd; background-image: none;'
//							}
							]
					},{
						xtype : 'form',
						itemId : 'id_back_img',
//						width : '50%',
//								width : '60%',
						border : false,
						items : [{
								
								xtype : 'filefield',
								validator: function(v){
								    if(!/\.(gif|jpg|jpeg|tiff|png)$/i.test(v)){
								      return 'Yêu cầu file dạng gif, jpg, jpeg, tiff, png';
								    }
								    return true;
								  },
//								buttonOnly: true,
								itemId : 'file_link2',
								fieldLabel : 'Ảnh CMT mặt sau<span style="color: red;">(*)</span>',
								msgTarget : 'side',
								buttonText : 'Chọn file',
//								listeners : {
//									change : function(field, value) {
//										var mainForm = this.up('form').up('form');
//										mainForm.down('#save2').setDisabled(false);
////												mainForm.down('#file_name').setValue(value);
//									}
//								}
							}
//							,{
//							width : 100,
//							itemId : 'file_name',
//							fieldLabel : 'đường dẫn',
//							readOnly : true,
//							fieldStyle: 'background-color: #ddd; background-image: none;'
//							}
							]
					}/*,{
						flex : 1,
						xtype : 'label',
						itemId : 'commentcmt',
						margin : '0 0 0 50',
						text: '(*) Kích thước ảnh phải nhỏ hơn 2Mb. Yêu cầu ảnh đuôi .jpg'
					}*/,{
						flex : 1,
						width : '50%',
						minWidth : 300,
						margin : '30 0 0 50',
						fieldLabel: 'Điện thoại/Email liên hệ',
						itemId : 'contact'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						xtype : 'datefield',
						format : 'd/m/Y',
						value : new Date(),
						itemId : 'active_date',
						fieldLabel : 'Ngày kích hoạt'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						xtype : 'datefield',
						format : 'd/m/Y',
						value : new Date(),
						itemId : 'recent_charge_date',
						fieldLabel : 'Ngày nạp thẻ gần nhất'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						fieldLabel: 'Giá trị thẻ nạp gần nhất',
						itemId : 'recent_charge_value'
					},{
						flex : 1,
						width : '50%',
						minWidth : 300,
						allowBlank: false,
						fieldLabel: 'Số điện thoại đăng ký<span style="color: red;">(*)</span>',
						regex : /099\d{7}|0199\d{7}|8499\d{7}|84199\d{7}/,
						itemId : 'msisdn'
					},{
						flex : 1,
						xtype : 'label',
						itemId : 'comment',
						margin : '30 0 0 50',
						text: '(*) Mã xác nhận là mã bạn nhận được từ tin nhắn của hệ thống Gmobile sau khi bạn nhấn nút "Lấy mã xác nhận"'
					}, {
						flex : 1,
						width : '50%',
						minWidth : 300,
//						allowBlank: false,
						fieldLabel: 'Mã xác nhận<span style="color: red;">(*)</span>',
						itemId : 'otp'
					},{
					    xtype: 'button',
					    itemId : 'otpBtn',
					    margin : '10 0 10 50',
//					    cls : 'btn_gmobile',
					    text: 'Lấy mã xác nhận',
//					    width: 75,
					    enableToggle: true,
					    listeners: {
					    click: function() {
					    	var form = this.up('form');
					    	var regex = /099\d{7}|0199\d{7}|8499\d{7}|84199\d{7}/;
					    	//console.log(regex.test(form.down('#msisdn').value));
					    	if (regex.test(form.down('#msisdn').value)) {
					    		form.GetOTP();
					    	}else{
					    		Ext.MessageBox.alert('Thông báo','Thông tin nhập vào chưa hợp lệ. Vui lòng kiểm tra lại');
					    	}
					    	
					    }}
					}, /*{
					    xtype: 'box',
					    id: 'reCaptcha',
					    margin : '10 0 10 50',
					    listeners: {
					        'afterrender': function () {
//					        	alert('s');
					        	var form = this.up('form');
					        	 function onloadCallback() {
					        	      //  Place your recaptcha rendering code here 
//					        		 //console.log(grecaptcha);
					        		 
							        	if(typeof grecaptcha != 'undefined'){
							        		grecaptcha.render('reCaptcha', {
								                'sitekey': '6LfN-wsUAAAAAJZOkzshNqm_3eZo-E8vUR8IcFKi',
								                'callback' : form.correctCaptcha
								            });
							        		//console.log(grecaptcha);
							        	}
							        		
							        	else{
							        		App.Session.captchaOk = "err";
							        		//console.log('Load loi');
							        	}
//							        	this.validateValue=false;
							        }
					        	 onloadCallback();
					        	    }
					        	
					    }
					},{
		                xtype: 'panel',
		                margin : '10 0 0 50',
		                width : 440,
		                height : 110,
		                itemId: 'reCaptcha',
		                border: false,
		                html: '<div id="recaptcha" style="color:red">Hệ thống xác thực bị lỗi, vui lòng tải lại</div>'
		            }, {
		                xtype: 'panel',
		                border: false,
		                height: 150,
		                html: '<div class="g-recaptcha" data-sitekey="6LfN-wsUAAAAAJZOkzshNqm_3eZo-E8vUR8IcFKi"></div>',
		                itemId: 'reCaptcha1',
		                margin: '0 0 0 105'
		            },*/{
		                xtype : 'checkbox',
		                boxLabel : 'Tôi cam kết tất cả các thông tin đã kê khai để thay đổi thông tin thuê bao là chính xác. Nếu có xảy ra tranh chấp số, Gmobile có toàn quyền quyết định/thu hồi số.',
		                name : 'AcceptTerms',
		                hideLabel : true,
		                validateValue : function (value) {
		                    if (value && this.checked)
		                        return true;
		                    else
		                        return false;
		                }       
		            },{
					    xtype: 'button',
					    margin : '10 0 0 50',
					    cls : 'btn_gmobile',
					    text: 'Lưu thông tin',
//					    width: 75,
					    enableToggle: true,
					    listeners: {
					    click: function() {
//					    	console.log(Recaptcha.getResponse());
					    	var form = this.up('form');
//					    	form.UserAddNew();
//					    	form.GetIP();
					    	debugger
					    	if (form.getForm().isValid()) {
					    		form.UserAddNew();
					    	}else{
					    		Ext.MessageBox.alert('Thông báo','Thông tin nhập vào chưa hợp lệ. Vui lòng kiểm tra lại');
					    	}
					    	
					    //this == the button, as we are in the local scope
//					        this.setText('I was clicked!');
					    }}
					}]
		}]
//		,buttons : [{
//					text : 'Lưu thông tin',
//					cls : 'btn_gmobile',
//					handler : function() {
//						var form = this.up('form');
//						form.UserAddNew();
//					}
//				}]
	},
//	afterRender: function() {
//        var captchaEl = Ext.get('recaptcha');
//        console.log(captchaEl);
//        Recaptcha.create("6LfN-wsUAAAAAJZOkzshNqm_3eZo-E8vUR8IcFKi",
//            document.getElementById('recaptcha'),
//            {
//                theme: "clean",
//                callback: Recaptcha.focus_response_field
//            }
//        );
//        this.callParent();
//    },
	activate : function() {
		this.down('#5friends').setVisible(false);
		this.down('#friend1').setVisible(false);
		this.down('#friend2').setVisible(false);
		this.down('#friend3').setVisible(false);
		this.down('#friend4').setVisible(false);
		this.down('#friend5').setVisible(false);
		this.down('#active_date').setVisible(false);
		this.down('#recent_charge_date').setVisible(false);
		this.down('#recent_charge_value').setVisible(false);
		this.down('#recent_charge_date').setVisible(false);
		this.down('#comment').setVisible(false);
		this.down('#otp').setVisible(false);
		this.down('#otpBtn').setVisible(false);
//		this.down('#reCaptcha').setVisible(true);
		this.down('#serialsim').setVisible(true);
		this.down('#simcode').setVisible(true);
		
//		this.down('#friend1').allowBlank = true;
//		this.down('#friend2').allowBlank = true;
//		this.down('#friend3').allowBlank = true;
//		this.down('#friend4').allowBlank = true;
//		this.down('#friend5').allowBlank = true;
		this.down('#otp').allowBlank = true;
		
		this.down('#serialsim').allowBlank =false;
		this.down('#simcode').allowBlank =false;
		
		//check capcha ok or not
		if(App.Session.captchaOk=="err"){
			this.down('#reCaptcha').update('<div style="color:red;">Hệ thống xác thực bị lỗi. Vui lòng tải lại trang.</div>');
		}
		App.Session.captchaOk = false;
		
	},
	correctCaptcha : function(){
		//console.log(App.Session.captchaOk);
		App.Session.captchaOk = true;
	},
	GetOTP : function(){
		var msisdn = this.down('#msisdn').getValue();
//		if(this.CheckMsisdn(msisdn)){
			//get otp
			App.Action.GetOTP(msisdn.replace(/^0/,'84'),
					function(options, success, response) {
						Ext.get(document.body).unmask();
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								App.Session.pwdotp = response.otp;
								//console.log(response.otp);
								Ext.MessageBox.alert('Thông báo','Lấy mã xác nhận thành công. Vui lòng kiểm tra tin nhắn.');
							} else {
								Ext.MessageBox.alert('Thông báo','Lấy mã xác nhận thất bại. Mời bạn thử lại. ' + response.info);
							}
						} else {
							Ext.MessageBox.alert('Thông báo', 'Lấy mã xác nhận thất bại. Mời bạn thử lại.' + response.info);
						}
					});
//		}else{
//			//msg err
//			Ext.MessageBox.alert('Thông báo','Số điện thoại đăng ký của bạn không hợp lệ');
//		}
	},
	GetIP : function(){
//		alert(json.ip);
		Ext.Ajax.request({
			url : '//ip.jsontest.com/?callback=?',
			method: 'GET',
//			scope : this,
			timeout : 40000,
			success: function(conn, response, options, eOpts) {
				console.log(response);
			}

		});
	},
	CheckCapcha : function(){
		Ext.Ajax.request({
			url : 'https://www.google.com/recaptcha/api/siteverify',
			actionMethods : {
			create : 'POST',
			read : 'POST',
			update : 'POST',
			destroy : 'POST'
			},
			params : {
				secret  : '6LfN-wsUAAAAABYxmJco1TElHOYf0FN6R3nDkiz8'
				
			},
			scope : this,
			timeout : 40000,
			callback : function(options, success, response) {
				if (success) {
					response = Ext.decode(response.responseText);
					if (response.success) {
					}
					else{
						Ext.MessageBox.alert('Thông báo',
								'Tải file thất bại '+ response.info);
					}
					
				} else {
					Ext.MessageBox.alert('Thông báo',
							'Tải file thất bại. Vui lòng thử sau '+ response.info);
				}
			}

		});
	},
	UserAddNew : function() {
//		console.log(Recaptcha.getResponse());
		//update
		var requesttype = this.down('#requesttype').getValue();
		if(requesttype=="1"){
			//Register new
//			if(App.Session.captchaOk)
				this.Register();
//			else
//				Ext.MessageBox.alert('Thông báo', 'Vui lòng xác thực "Im not a robot"');
		}else{
			//update info
			this.UpdateInfo();
		}

	},

	Register : function(){
		//add new
		var subid = this.down('#subid').getValue();
		var fullname = this.down('#fullname').getValue();
		var msisdn = this.down('#msisdn').getValue();
		var sex = this.down('#sex').getValue();
		var dob = this.down('#dob').getValue();
		var subid_provided_date = this.down('#subid_provided_date').getValue();
		var subid_provided_place = this.down('#subid_provided_place').getValue();
		var subid_address = this.down('#subid_address').getValue();
		debugger
		var id_front_img_file_extend = this.down('#file_link1').getValue().split('.');
		
		var id_back_img_file_extend = this.down('#file_link2').getValue().split('.');
		var id_front_img =  msisdn.replace(/^0/,'84') + '_front' + '.' + id_front_img_file_extend[id_front_img_file_extend.length-1];
		var id_back_img =  msisdn.replace(/^0/,'84') + '_back' + '.' + id_back_img_file_extend[id_back_img_file_extend.length-1];
		
		var contact = this.down('#contact').getValue();
		var serialsim = this.down('#serialsim').getValue();
		var simcode = this.down('#simcode').getValue();
		
		var subinfo = Ext.encode({
			subid:subid,
			fullname:fullname,
			msisdn:msisdn.replace(/^0/,'84'),
			sex:sex,
			dob:App.ActionMe.DateToDBExactly(dob),
			subid_provided_date:App.ActionMe.DateToDBExactly(subid_provided_date),
			subid_provided_place:subid_provided_place,
			subid_address:subid_address,
			id_front_img:id_front_img,
			id_back_img:id_back_img,
			contact:contact,
			serialsim:serialsim,
			simcode:simcode,
			requesttype: "1" //register
						});
		
		//upload imgs
		var form1 = this.down('#id_front_img').getForm();
		var form2 = this.down('#id_back_img').getForm();
		debugger
		form1.submit({
			url : 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_front',
			actionMethods : {
				create : 'POST',
				read : 'POST',
				update : 'POST',
				destroy : 'POST'
			},
//			waitMsg: 'Uploading your photo...',
			success : function(form1, action) {
				
			}
//			,failure: function (form1, action) {
//				Ext.MessageBox.alert('Thông báo', 'Có lỗi trong quá trình upload ảnh, vui lòng thử lại');
//			}
		});
		
		//up img 2
		form2.submit({
			url : 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_back',
			actionMethods : {
				create : 'POST',
				read : 'POST',
				update : 'POST',
				destroy : 'POST'
			},
//			waitMsg: 'Uploading your photo...',
			success : function(form2, action) {
				//Update user info
//				this.UpdateProcess(subinfo);
				
			}
//			,failure: function (form2, action) {
//				Ext.MessageBox.alert('Thông báo', 'Có lỗi trong quá trình upload ảnh, vui lòng thử lại');
//			}
			
		});
		
		
		var me = this;
//		if(upimg1_Ok && upimg2_Ok)
			App.Action.UserUpdate(subinfo,
					function(options, success, response) {
						Ext.get(document.body).unmask();
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox.alert('Thông báo','Thêm mới thành công');
//								me.getForm().reset();
							} else {
								Ext.MessageBox.alert('Thông báo',
										'Thêm mới thất bại ' + response.info);
							}
						} else {
//							ViewIndex.setLoading(false);
							Ext.MessageBox.alert('Thông báo', 'Thêm mới thất bại ' + response.info);
						}
					});
//		else
//			Ext.MessageBox.alert('Thông báo', 'Có lỗi trong quá trình upload ảnh, kích thước ảnh tối đa là 2Mb, vui lòng thử lại');
	},
	UpdateInfo : function(){
		debugger
		//Check if otp match code
		var otp = this.down('#otp').getValue();
		if(otp == App.Session.pwdotp){
			//add new
			var subid = this.down('#subid').getValue();
			var fullname = this.down('#fullname').getValue();
			var msisdn = this.down('#msisdn').getValue();
			var sex = this.down('#sex').getValue();
			var dob = this.down('#dob').getValue();
			var subid_provided_date = this.down('#subid_provided_date').getValue();
			var subid_provided_place = this.down('#subid_provided_place').getValue();
			var subid_address = this.down('#subid_address').getValue();
			var friend_msisdn = this.down('#friend5').getValue().replace(/^0/,'84') +
			',' + this.down('#friend4').getValue().replace(/^0/,'84') +
			',' + this.down('#friend3').getValue().replace(/^0/,'84') + 
			',' + this.down('#friend2').getValue().replace(/^0/,'84') + 
			',' + this.down('#friend1').getValue().replace(/^0/,'84');
			var id_front_img_file_extend = this.down('#file_link1').getValue().split('.');
			
			var id_back_img_file_extend = this.down('#file_link2').getValue().split('.');
			var id_front_img =  msisdn.replace(/^0/,'84') + '_front' + '.' + id_front_img_file_extend[id_front_img_file_extend.length-1];
			var id_back_img =  msisdn.replace(/^0/,'84') + '_back' + '.' + id_back_img_file_extend[id_back_img_file_extend.length-1];
			
			var contact = this.down('#contact').getValue();
			var active_date = this.down('#active_date').getValue();
			var recent_charge_date = this.down('#recent_charge_date').getValue();
			var recent_charge_value = this.down('#recent_charge_value').getValue();
			var otp = this.down('#otp').getValue();
			
			//upload imgs
			var form1 = this.down('#id_front_img').getForm();
			console.log( form1);
			form1.submit({
				url : 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_front',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				success : function(form2, action) {
					upimg1_Ok = true;
				}
//				,failure: function (form1, action) {
//					Ext.MessageBox.alert('Thông báo', 'Có lỗi trong quá trình upload ảnh, vui lòng thử lại');
//				}
			});
			
			var form2 = this.down('#id_back_img').getForm();
			form2.submit({
				url : 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_back',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				success : function(form2, action) {
					upimg2_Ok = true;
				}
//				,failure: function (form, action) {
//					Ext.MessageBox.alert('Thông báo', 'Có lỗi trong quá trình upload ảnh, vui lòng thử lại');
//				}
				
			});
			
			
			var subinfo = Ext.encode({
				subid:subid,
				fullname:fullname,
				msisdn:msisdn.replace(/^0/,'84'),
				sex:sex,
				dob:App.ActionMe.DateToDBExactly(dob),
				subid_provided_date:App.ActionMe.DateToDBExactly(subid_provided_date),
				subid_provided_place:subid_provided_place,
				subid_address:subid_address,
				friend_msisdn:friend_msisdn,
				id_front_img:id_front_img,
				id_back_img:id_back_img,
				contact:contact,
				active_date:App.ActionMe.DateToDBExactly(active_date),
				recent_charge_date:App.ActionMe.DateToDBExactly(recent_charge_date),
				recent_charge_value:recent_charge_value,
				otp:otp,
				requesttype: "0" //update
							});
			var me = this;
//			if(upimg1_Ok && upimg2_Ok)
				App.Action.UserUpdate(subinfo,
						function(options, success, response) {
							Ext.get(document.body).unmask();
							if (success) {
								response = Ext.decode(response.responseText);
								if (response.success) {
									Ext.MessageBox.alert('Thông báo','Thêm mới thành công');
//									me.getForm().reset();
								} else {
									Ext.MessageBox.alert('Thông báo',
											'Thêm mới thất bại ' + response.info);
								}
							} else {
//								ViewIndex.setLoading(false);
								Ext.MessageBox.alert('Thông báo', 'Thêm mới thất bại ' + response.info);
							}
						});
//			else
//				Ext.MessageBox.alert('Thông báo', 'Có lỗi trong quá trình upload ảnh, kích thước ảnh tối đa là 2Mb, vui lòng thử lại');
		}else {
			Ext.MessageBox.alert('Thông báo', 'Mã xác nhận không chính xác. Mời bạn thử lại');
			return null;
		}
	}
});


