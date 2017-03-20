Ext.define(App.path('view.ViewHome'), {
    extend: 'Ext.form.Panel',
    alias : 'widget.ViewHome',
    xtype : 'ViewHome',
    itemId : 'ViewHome',
    requires: [
				'Ext.form.Panel',
				'Ext.Button',
				'Ext.form.FieldSet',
				'Ext.field.Text',
				'Ext.field.File',
				'Ext.Toolbar',
				'Ext.ProgressIndicator',
//				App.path('store.Province')
			],
    config: {
//    	 scrollable: true,
	     title: 'ViewHome',
//	     layout: {
//	            type: 'vbox',
//	        },
//	        defaults: {
//	            //margin: '0 0 5 0'
//	        },
	        items: [
	            {
	             xtype: 'fieldset',
	                title: 'Thông tin đăng kí',
	                items: [
	                    {
	                    	xtype: 'selectfield',
                            cls: 'combobox',
                            cls   : 'selectfield',
                            itemId: 'requesttype',
                            value : "0",
                            label : 'Loại hình đăng ký<span style="color: red;">(*)</span>',
                            labelWrap : true,
                            options: [
                                {text: 'ĐKTT thuê bao mới',  value: '1'},
                                {text: 'Thay đổi TT thuê bao', value: '0'},
                     
                            ],
                            listeners: {                              
                                change: function(field, value) {
                                	console.log('Value requesttype ===> ' + value);
                                	var form = this.up('ViewHome'); 
                                	// dang ki moi
                                	if(value=="1"){
										//dang ky moi
                                		App.Session.regType = 'new';
										form.down('#5friends').setHidden(true);
										form.down('#friend1').setHidden(true);
										form.down('#friend2').setHidden(true);
										form.down('#friend3').setHidden(true);
										form.down('#friend4').setHidden(true);
										form.down('#friend5').setHidden(true);
										form.down('#active_date').setHidden(true);
										form.down('#recent_charge_date').setHidden(true);
										form.down('#recent_charge_value').setHidden(true);
//										form.down('#recent_charge_date').setHidden(true);
										form.down('#comment').setHidden(true);
										form.down('#otp').setHidden(true);
										form.down('#otpBtn').setHidden(true);
										form.down('#serialsim').setHidden(false);
										form.down('#simcode').setHidden(false);
										form.down('#sim_img').setHidden(false);
										form.down('#sim_img_area').setHidden(false);

										form.down('#otp').allowBlank = false;
										
										form.down('#serialsim').allowBlank = true;
										form.down('#simcode').allowBlank = true;
									}else{
										App.Session.regType = 'change';
										form.down('#5friends').setHidden(false);
										form.down('#friend1').setHidden(false);
										form.down('#friend2').setHidden(false);
										form.down('#friend3').setHidden(false);
										form.down('#friend4').setHidden(false);
										form.down('#friend5').setHidden(false);
										form.down('#active_date').setHidden(false);
										form.down('#recent_charge_date').setHidden(false);
										form.down('#recent_charge_value').setHidden(false);
										form.down('#active_date').setHidden(false);
										form.down('#comment').setHidden(false);
										form.down('#otp').setHidden(false);
										form.down('#otpBtn').setHidden(false);
										form.down('#serialsim').setHidden(true);
										form.down('#simcode').setHidden(true);
										form.down('#sim_img').setHidden(true);
										form.down('#sim_img_area').setHidden(true);

										form.down('#otp').allowBlank = true;
										
										form.down('#serialsim').allowBlank =false;
										form.down('#simcode').allowBlank =false;
									}
                                }
                            }
	                    },
	                    {
	                        xtype: 'textfield',
	                        label: 'Họ tên chủ TB<span style="color: red;">(*)</span>',
	                        itemId: 'fullname',
	                        name: 'fullname',
	                        labelWrap : true,
	                        allowBlank: false,
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },
	                    {
                            xtype: 'selectfield',
                            cls: 'combobox',
                            itemId : 'sex',
                            allowBlank: false,
                            labelWrap : true,
                            label : 'Giới tính<span style="color: red;">(*)</span>',
                            //labelWidth: '30%',
                            options: [
                                {text: 'Nam',  value: '1'},
                                {text: 'Nữ', value: '0'},
                     
                            ],
                            listeners: {                              
                                change: function(field, value) {
                                    //alert(111);                         
                                }
                            }
	                    },
	                    {
	                        xtype: 'datepickerfield',
	                        destroyPickerOnHide: true,
	                        label: 'Ngày sinh<span style="color: red;">(*)</span>',
	                        name: 'dob',
	                        itemId : 'dob',
	                        labelWrap : true,
	                        dateFormat :"d/m/y",
	                        value : { day: new Date().getDate(), month: (new Date().getMonth()+1), year : new Date().getFullYear()},
	                        picker: {
	                        	yearFrom: 1900,
	                            yearTo: 2020,
	                            
	                        }
	                    },{
	                        xtype: 'textfield',
	                        label: 'Số CMT<span style="color: red;">(*)</span>',
	                        itemId: 'subid',
	                        allowBlank: false,
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },{

	                        xtype: 'datepickerfield',
	                        destroyPickerOnHide: true,
	                        label: 'Ngày cấp<span style="color: red;">(*)</span>',
	                        itemId : 'subid_provided_date',
	                        dateFormat :"d/m/y",
	                        value : { day: new Date().getDate(), month: (new Date().getMonth()+1), year : new Date().getFullYear()},
	                        picker: {
	                        	yearFrom: 1700,
	                            yearTo: 2020,
	                            
	                        }
	                    },
	                    {
	                        xtype: 'textfield',
	                        label: 'Nơi cấp<span style="color: red;">(*)</span>',
	                        itemId: 'subid_provided_place',
	                        allowBlank: false,
	                        labelWrap : true,
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },
//	                    {
//							xtype : 'selectfield',
//							cls: 'combobox',
//							itemId : 'subid_provided_place',
//							allowBlank: false,
//							label: 'Nơi cấp<span style="color: red;">(*)</span>',
//							labelWrap : true,
////							options: [
////							      	{text: 'Nam',  value: '1'},
////							      	{text: 'Nữ', value: '0'},
////
////							      ],
//							displayField : 'name',
//							store : Ext.create(App.path('store.Province')),
//							valueField : 'name',
//							listeners : {
//								change: function(field, value) {
//									debugger
//									var newRecord = combobox.findRecordByValue(newValue);
//									if (newRecord) {
//										var form = this.up('form');
//										console.log(newRecord.data);
//										var myGrid = this.up('grid');
//			                            var selectedModel = this.up('grid').getSelectionModel().getSelection()[0];
//			                            Ext.getCmp('staff_name').setValue(newRecord.data["staff_name"]);
//			                            Ext.getCmp('staff_store').setValue(newRecord.data["staff_store"]);
//									}
//								},
//							},
//	                    },
	                    {
	                        xtype: 'textfield',
	                        label: 'Địa chỉ theo CMT<span style="color: red;">(*)</span>',
	                        itemId: 'subid_address',
	                        allowBlank: false,
	                        labelWrap : true,
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },{
	                        xtype: 'textfield',
	                        label: 'Serial SIM<span style="color: red;">(*)</span>',
	                        itemId: 'serialsim',
	                        allowBlank: false,
	                        hidden :'true',
	                        labelWrap : true,
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },
	                    {
	                        xtype: 'textfield',
	                        label: 'Mã bảo mật<span style="color: red;">(*)</span>',
	                        itemId: 'simcode',
	                        allowBlank: false,
	                        labelWrap : true,
	                        hidden :'true',
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },
	                    // Label can thay the

	                    {
							//flex : 1,
							xtype : 'label',
							itemId : '5friends',
							//margin : '30 0 0 50',
//							hidden :'true',
							text: '5 số thường xuyên gọi/nhắn tin:',
						},
	                    {
	                        xtype: 'textfield',
	                        label: 'Số 1',
	                        itemId: 'friend1',
//	                        hidden :'true',
	                        allowBlank: false,
	                        autoCapitalize: false,
	                        regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
	                        //labelWidth: '30%',
	                    },{
	                        xtype: 'textfield',
	                        label: 'Số 2',
//	                        hidden :'true',
	                        itemId: 'friend2',
	                        allowBlank: false,
	                        autoCapitalize: false,
	                        regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
	                        //labelWidth: '30%',
	                    },{
	                        xtype: 'textfield',
	                        label: 'Số 3',
	                        itemId: 'friend3',
	                        allowBlank: false,
//	                        hidden :'true',
	                        autoCapitalize: false,
	                        regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
	                        //labelWidth: '30%',
	                    },{
	                        xtype: 'textfield',
	                        label: 'Số 4',
	                        itemId: 'friend4',
//	                        hidden :'true',
	                        allowBlank: false,
	                        autoCapitalize: false,
	                        regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
	                        //labelWidth: '30%',
	                    },{
	                        xtype: 'textfield',
	                        label: 'Số 5',
	                        itemId: 'friend5',
//	                        hidden :'true',
	                        allowBlank: false,
	                        autoCapitalize: false,
	                        regex : /\d{10}|\d{11}|\d{12}|\d{13}/,
	                        //labelWidth: '30%',
	                    },{
	                    	xtype:"formpanel",
	                        itemId : 'id_front_img',
	                        width : '100%',
	                        height : 70,
	                        scrollable: false,
	                        items: [{
		                    	xtype:"filefield",
		                    	label: 'Ảnh CMT mặt trước<span style="color: red;">(*)</span>',
		                    	itemId: 'file_link1',
		                    	name: "photos",
		                    	labelWrap : true,
		                    	accept:"image/jpeg",
		                    	multiple: false
	                        }]
	                    	
	                    },{
	                    	xtype:"formpanel",
	                        itemId : 'id_back_img',
	                        width : '100%',
	                        height : 70,
	                        scrollable: false,
	                        items: [{
		                    	xtype:"filefield",
		                    	label: 'Ảnh CMT mặt sau<span style="color: red;">(*)</span>',
		                    	itemId: 'file_link2',
		                    	name: "photos",
		                    	labelWrap : true,
		                    	accept:"image/jpeg",
		                    	multiple: false
	                        }]
	                    },{
	                    	xtype:"formpanel",
	                        itemId : 'sim_img',
	                        width : '100%',
	                        height : 70,
	                        scrollable: false,
	                        items: [{
		                    	xtype:"filefield",
		                    	label: 'Ảnh phôi SIM<span style="color: red;">(*)</span>',
		                    	itemId: 'file_link3',
		                    	name: "photos",
		                    	labelWrap : true,
		                    	accept:"image/jpeg",
		                    	multiple: false
	                        }]
	                    },{
				            xtype : 'image',
				            id : 'sim_img_area',
				            src : 'files/phoisim.jpg',
				            margin : '10 0 10 0',
				            hidden :'true',
//				            width : 400,
				            height: 200
				        },{
	                        xtype: 'textfield',
	                        label: 'Điện thoại/Email liên hệ<span style="color: red;">(*)</span>',
	                        itemId: 'contact',
	                        autoCapitalize: true,
	                        allowBlank: false,
	                        labelWrap : true,
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
	                    },{
	                        xtype: 'datepickerfield',
	                        destroyPickerOnHide: true,
	                        label: 'Ngày kích hoạt',
//	                        hidden :'true',
	                        itemId : 'active_date',
	                        dateFormat :"d/m/y",
	                        value : { day: new Date().getDate(), month: (new Date().getMonth()+1), year : new Date().getFullYear()},
	                        picker: {
	                        	yearFrom: 1700,
	                            yearTo: 2020,
	                           
	                        }
	                    },{
	                        xtype: 'datepickerfield',
	                        destroyPickerOnHide: true,
	                        label: 'Ngày nạp thẻ gần nhất',
	                        itemId : 'recent_charge_date',
//	                        hidden :'true',
	                        labelWrap : true,
	                        dateFormat :"d/m/y",
	                        value : { day: new Date().getDate(), month: (new Date().getMonth()+1), year : new Date().getFullYear()},
	                        picker: {
	                        	yearFrom: 1700,
	                            yearTo: 2020,
	                           
	                        }
	                    },{
	                        xtype: 'textfield',
	                        label: 'Giá trị thẻ nạp gần nhất',
	                        itemId: 'recent_charge_value',
	                        allowBlank: false,
//	                        hidden :'true',
	                        autoCapitalize: true,
	                        //labelWidth: '30%',
	                    },
	                    {
	                        xtype: 'textfield',
	                        label: 'Số điện thoại đăng ký<span style="color: red;">(*)</span>',
	                        itemId: 'msisdn',
	                        labelWrap : true,
	                        allowBlank: false,
	                        autoCapitalize: true,
	                        regex : /099\d{7}|0199\d{7}|8499\d{7}|84199\d{7}/,
	                        //labelWidth: '30%',
	                    },{
							//flex : 1,
							xtype : 'label',
							itemId : 'comment',
//							 hidden :'true',
							//margin : '30 0 0 50',
							text: '(*) Mã xác nhận là mã bạn nhận được từ tin nhắn của hệ thống Gmobile sau khi bạn nhấn nút "Lấy mã xác nhận"'
						},{
	                        xtype: 'textfield',
	                        label: 'Mã xác nhận<span style="color: red;">(*)</span>',
	                        itemId: 'otp',
	                        allowBlank: false,
	                        labelWrap : true,
//	                        hidden :'true',
	                        autoCapitalize: false,
	                        //labelWidth: '30%',
						},{
							xtype: 'button',
						    itemId : 'otpBtn',
						    //margin : '10 400 10 400',
						    ui: 'confirm',
						    text: 'Lấy mã xác nhận',
//						    hidden :'true',
						    labelWrap : true,
						    enableToggle: true,
						    listeners: {
							    tap: function() {
							    	var form = this.up('ViewHome');
			
							    	var regex = /099\d{7}|0199\d{7}|8499\d{7}|84199\d{7}/;
							    	//console.log(regex.test(form.down('#msisdn').value));
							    	if (regex.test(form.down('#msisdn').getValue())) {
							    		form.GetOTP();
							    	}else{
							    		Ext.Msg.alert('Thông báo','Thông tin nhập vào chưa hợp lệ. Vui lòng kiểm tra lại');
							    	}
							    }}
						},{
							xtype: 'checkboxfield',
						    checked: false,
						    //labelAlign: 'right',
			                label : 'Tôi cam kết tất cả các thông tin đã kê khai để thay đổi thông tin thuê bao là chính xác. Nếu có xảy ra tranh chấp số, Gmobile có toàn quyền quyết định/thu hồi số.',
			                name : 'AcceptTerms',
			                labelWrap:true,
			                itemId : 'AcceptTerms',
//			                hideLabel : true,
			                labelWidth: '80%',
			                listeners:{
			                       change:function(){
			                    	   var obj = this;
			                    	   if(obj.isChecked()){
			                               App.Session.isCheck = true;
			                         }else{
			                               App.Session.isCheck = false;
			                         }
		                    	   console.log(App.Session.isCheck);
			                    }
			                }
						},{
						    xtype: 'button',
						    //margin : '50 400 50 400',
						    cls : 'btn_gmobile',
						    text: 'Lưu thông tin',
						    ui: 'action',
						    enableToggle: true,
						    listeners: {
						    	tap: function() {
						    		
//						    		debugger
							    	var form = this.up('ViewHome');
							   
							    	if (form.isValidate()){
							    		if (App.Session.isCheck){
							    			form.UserAddNew();
							    		}else {
							    			Ext.Msg.alert('Thông báo','Bạn hãy xác nhận cam kết khai báo thông tin.');
							    		}
							    	}else{
							    		//Ext.Msg.alert('Thông báo','Thông tin nhập vào chưa hợp lệ. Vui lòng kiểm tra lại');
							    	}
						    	},
						    	widthchange: function(button, newWidth, oldWidth) {
				                    console.log('My width changed from ' + oldWidth + ' to ' + newWidth);
				                }
						    }
						
						}
	                ]
	   },  
	   
	   ]
    },
    // Implement function 
	UserAddNew : function() {
		//update
		var requesttype = this.down('#requesttype').getValue();
		if(requesttype=="1"){
				this.Register();
		}else{
			//update info
			this.UpdateInfo();
		}
	},
	GetOTP : function(){
		var msisdn = this.down('#msisdn').getValue();
		//get otp
		App.Action.GetOTP(msisdn.replace(/^0/,'84'),
				function(options, success, response) {
					//Ext.get(document.body).unmask();
					if (success) {
						response = Ext.decode(response.responseText);
//						debugger
						if (response.success) {
							console.log(response.otp);
							App.Session.pwdotp = response.otp;
							//console.log(response.otp);
							Ext.Msg.alert('Thông báo','Lấy mã xác nhận thành công. Vui lòng kiểm tra tin nhắn.');
						} else {
							Ext.Msg.alert('Thông báo','Lấy mã xác nhận thất bại. Mời bạn thử lại. ' + response.info);
						}
					} else {
						Ext.Msg.alert('Thông báo', 'Lấy mã xác nhận thất bại. Mời bạn thử lại.' + response.info);
					}
				});
	},
	activate : function() {
		form.down('#5friends').setHidden(false);
		form.down('#friend1').setHidden(false);
		form.down('#friend2').setHidden(false);
		form.down('#friend3').setHidden(false);
		form.down('#friend4').setHidden(false);
		form.down('#friend5').setHidden(false);
		form.down('#active_date').setHidden(false);
		form.down('#recent_charge_date').setHidden(false);
		form.down('#recent_charge_value').setHidden(false);
		form.down('#active_date').setHidden(false);
		form.down('#comment').setHidden(false);
		form.down('#otp').setHidden(false);
		form.down('#otpBtn').setHidden(false);
		form.down('#serialsim').setHidden(true);
		form.down('#simcode').setHidden(true);
		form.down('#sim_img_area').setHidden(true);

		form.down('#otp').allowBlank = true;
		
		form.down('#serialsim').allowBlank =false;
		form.down('#simcode').allowBlank =false;
		
		//check capcha ok or not
//		if(App.Session.captchaOk=="err"){
//			this.down('#reCaptcha').update('<div style="color:red;">Hệ thống xác thực bị lỗi. Vui lòng tải lại trang.</div>');
//		}
//		App.Session.captchaOk = false;
		
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
		
		var id_front_img_file_extend = this.down('#file_link1').getValue().split('.');
		
		var id_back_img_file_extend = this.down('#file_link2').getValue().split('.');
		var id_front_img =  msisdn.replace(/^0/,'84') + '_front' + '.jpg';// + id_front_img_file_extend[id_front_img_file_extend.length-1];
		var id_back_img =  msisdn.replace(/^0/,'84') + '_back' + '.jpg';// + id_back_img_file_extend[id_back_img_file_extend.length-1];
		var sim_img =  msisdn.replace(/^0/,'84') + '_sim' + '.jpg';// + id_back_img_file_extend[id_back_img_file_extend.length-1];
		
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
			sim_img:sim_img,
			contact:contact,
			serialsim:serialsim,
			simcode:simcode,
			requesttype: "1" //register
						});
		// upload ảnh
//		var progressIndicator = Ext.create("Ext.ProgressIndicator");
        var request_front = {
                url: 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_front',
                method: 'POST',
                xhr2: true,
//                progress: progressIndicator,
                success: function(form, response) {
                    if(response) {}
                },
                failure: function(form, response) {
                	return;
                }
            };
		
		var form1 = this.down("#id_front_img");
		form1.submit(request_front);
		// upload ảnh chứng minh thư đăng sau
		var request_back = {
                url: 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_back',
                method: 'POST',
                xhr2: true,
//                progress: progressIndicator,
                success: function(form, response) {
                    if(response) {}
                },
                failure: function(form, response) {
                	return;
                }
            };
		var form2 = this.down("#id_back_img");
		form2.submit(request_back);
		
		//anh phoi sim
		var request_simimg = {
                url: 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_sim',
                method: 'POST',
                xhr2: true,
//                progress: progressIndicator,
                success: function(form, response) {
                    if(response) {}
                },
                failure: function(form, response) {
                	return;
                }
            };
		var form3 = this.down("#sim_img");
		form3.submit(request_simimg);
		
		var me = this;
		App.Action.UserUpdate(subinfo,
			function(options, success, response) {
				if (success) {
					response = Ext.decode(response.responseText);
					if (response.success) {
						Ext.Msg.alert('Thông báo','Thêm mới thành công');
					} else {
						Ext.Msg.alert('Thông báo',
								'Thêm mới thất bại ' + response.info);
					}
				} else {
					Ext.Msg.alert('Thông báo', 'Thêm mới thất bại ' + response.info);
				}
			});
	},
	UpdateInfo : function(){
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
			var id_front_img =  msisdn.replace(/^0/,'84') + '_front' + '.jpg';// + id_front_img_file_extend[id_front_img_file_extend.length-1];
			var id_back_img =  msisdn.replace(/^0/,'84') + '_back' + '.jpg';// + id_back_img_file_extend[id_back_img_file_extend.length-1];
			
			var contact = this.down('#contact').getValue();
			var active_date = this.down('#active_date').getValue();
			var recent_charge_date = this.down('#recent_charge_date').getValue();
			var recent_charge_value = this.down('#recent_charge_value').getValue();
			var otp = this.down('#otp').getValue();
			
			// upload ảnh
//			var progressIndicator = Ext.create("Ext.ProgressIndicator");
	        var request_front = {
	                url: 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_front',
	                method: 'POST',
	                xhr2: true,
	                //progress: progressIndicator,
	                success: function(form, response) {
	                    if(response) {}
	                },
	                failure: function(form, response) {
	                	return;
	                }
	            };
			
			var form1 = this.down("#id_front_img");
			form1.submit(request_front);
			// upload ảnh chứng minh thư đăng sau
			var request_back = {
	                url: 'uploadimg?msisdn=' + msisdn.replace(/^0/,'84') + '_back',
	                method: 'POST',
	                xhr2: true,
	                //progress: progressIndicator,
	                success: function(form, response) {
	                    if(response) {}
	                },
	                failure: function(form, response) {
	                	return;
	                }
	            };
			var form2 = this.down("#id_back_img");
			form2.submit(request_back);
			
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
			App.Action.UserUpdate(subinfo,
					function(options, success, response) {
						////Ext.get(document.body).unmask();
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.Msg.alert('Thông báo','Cập nhập thành công');
							} else {
								Ext.Msg.alert('Thông báo',
										'Cập nhập thất bại ' + response.info);
							}
						} else {
							Ext.Msg.alert('Thông báo', 'Cập nhập thất bại ' + response.info);
						}
					});
		}else {
			Ext.Msg.alert('Thông báo', 'Mã xác nhận không chính xác. Mời bạn thử lại');
			return null;
		}
	},
	
	isValidate : function(){
		var result = false;
		var formObj = this;
		var formData = formObj.getValues();
		var requesttype = this.down('#requesttype').getValue();
		var infoModelRegis;
		if (requesttype == '1'){
			 infoModelRegis = Ext.create(App.path('model.SubInfo'),{
				fullname: this.down('#fullname').getValue(),
				msisdn: this.down('#msisdn').getValue(),
				subid:this.down('#subid').getValue(),
				subid_provided_place: this.down('#subid_provided_place').getValue(),
				subid_address: this.down('#subid_address').getValue(),
				id_front_img: this.down('#file_link1').getValue(),
				id_back_img: this.down('#file_link2').getValue(),
				contact: this.down('#contact').getValue(),
				serialsim: this.down('#serialsim').getValue(),
				simcode: this.down('#simcode').getValue(),
				sim_img: this.down('#file_link3').getValue(),
			});
		}else {
			infoModelRegis = Ext.create(App.path('model.SubInfo2'),{
				fullname: this.down('#fullname').getValue(),
				msisdn: this.down('#msisdn').getValue(),
				subid:this.down('#subid').getValue(),
				subid_provided_place: this.down('#subid_provided_place').getValue(),
				subid_address: this.down('#subid_address').getValue(),
				id_front_img: this.down('#file_link1').getValue(),
				id_back_img: this.down('#file_link2').getValue(),
				contact: this.down('#contact').getValue(),
				otp: this.down('#otp').getValue(),
			});
		}
		var errs = infoModelRegis.validate();
		var msg = '';
//		debugger
		if (!errs.isValid()) {
		   errs.each(function (err) {
		   msg += err.getMessage() + '';});
		   Ext.Msg.alert('Thông báo lỗi', msg);
		   return false;
		} else {
//		    Ext.Msg.alert('SUCCESS', 'Looks like the Form is valid');
		    return true;
		}
	}
});
