Ext.define(App.path('view.ViewHome'), {
    extend: 'Ext.form.Panel',
    alias : 'widget.ViewHome',
    xtype : 'ViewHome',
    itemId : 'ViewHome',
    config: {
    	 scrollable: true,
	     title: 'ViewHome',
//	     layout: {
//	            type: 'vbox',
//	        },
	        defaults: {
	            margin: '0 0 5 0'
	        },
	        items: [
	            {
                    xtype:"formpanel",
                    itemId : 'nvtamcntt',
                    layout:"vbox",
//                    fullscreen:true,
                    width : 100,
                    height : 400,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'My Uploader',
                            items: [
                                {
                                    xtype: "textfield",
                                    name: "firstName",
                                    label: "First Name:"
                                },
                                {
                                    xtype: "textfield",
                                    name: "lastName",
                                    label: "Last Name:"
                                },
                                {
                                    xtype:"filefield",
                                    label: "Select image(s):",
                                    name: "photos",
                                    accept:"image/jpeg",
                                    multiple: true
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            layout: {
                                pack: 'center'
                            },
                            ui: 'plain',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Submit',
                                    ui: 'confirm',
                                    handler: function() {
                                        var form = Ext.Viewport.down("formpanel");
                                        var input = Ext.Viewport.down("filefield").getComponent().input;
                                        var files = input.dom.files;
                                        for(var i = 0 ; i<files.length ; i++){
                                            var file = files[i];
                                            if(file.size > 2097152) {
                                                Ext.Msg.alert("JPG Must be less then 2MB");
                                                return;
                                            }
                                        }
                                        form.submit(request);
                                    }
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "output",
                            padding: "10px",
                            scrollable: true,
                            flex:1
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
		
		var id_front_img_file_extend = this.down('#id_front_img').getValue().split('.');
		console.log('id_front_img_file_extend ' + id_front_img_file_extend);
		var id_back_img_file_extend = this.down('#id_back_img').getValue().split('.');
		console.log('id_back_img_file_extend ' + id_back_img_file_extend);
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
		var form1 = Ext.Viewport.down("formpanel");
		var form2 = Ext.Viewport.down("formpanel");
		
		var input1 = Ext.Viewport.down("filefield").getComponent('#id_front_img').input;
		var files1 = input1.dom.files;
		var input2 = Ext.Viewport.down("filefield").getComponent('#id_back_img').input;
		var files2 = input2.dom.files;
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
	
});
