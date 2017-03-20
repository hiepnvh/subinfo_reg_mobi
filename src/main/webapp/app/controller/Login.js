Ext.define(App.path('controller.Login'), {
	extend : 'Ext.app.Controller',
	alternateClassName: 'App.LoginController',
	sessionId: null,
	config : {
		profile : Ext.os.deviceType.toLowerCase(),
		stores : [ 'SessionInfo' ],
		models : [ 'SessionInfo' ],
		// Mapping layout
		refs : {
			myNavigationView : 'mainNavigation',
			myLoginPanel : 'login'
		},
		// action
		control : {
			'login button[itemId=loginButton]' : {
				tap : 'onUserAuthentication'
			},
			'mainNavigation button[itemId=logoutUser]' : {
				tap : 'onUserLogout'
			}
		}

	},
	launch : function() {
		console.log('Launch for controller');
		var sessionInfo = Ext.getStore('SessionInfo');
		if (null != sessionInfo.getAt(0)) {
			this.successfulLogin(sessionInfo.getAt(0).get('sessionId'));
		}

	},
	onUserAuthentication : function(button) {
		var fieldset = button.up('panel').down('fieldset');
		var userId = fieldset.getComponent('username');
		var password = fieldset.getComponent('password');
		if (userId.getValue() && password.getValue()) {
			password = Ext.util.MD5(password.getValue());
			var username = userId.getValue();
			button.setDisabled(true);
			// Request to server
			App.Action.UserLogin(username, password, function(options, success, response) {
				if (success) {
					response = Ext.decode(response.responseText);
					if (response.success) {
						this.onLoginSuccess(response);
					}else {
						Ext.Msg.alert('Thông báo', 'Đăng nhập không thành công '+ (response.info ? response.info : ''));
						this.onLoginFailure();
					}
				}else {
					Ext.Msg.alert('',
							'Kết nối server bị lỗi, Vui lòng thử lại.',
							Ext.emptyFn);
					this.onLoginFailure();
//					Ext.Msg.alert('Thông báo', 'Đường truyền lỗi vui lòng thử lại sau');
				}
			}, this);
//			Ext.Ajax.request({
//				url : '/GSDSmsMobi/login',
//				method : 'POST',
//				params : {
//					username : userId.getValue(),
//					password : password
//				},
//				scope : this,
//				// method to call when the request is successful
//				success : this.onLoginSuccess,
//				// method to call when the request is a failure
//				failure : this.onLoginFailure
//			});

//			password.setValue('');

		} else {
			Ext.Msg.alert('', 'Vui lòng nhập user và password.',
					Ext.emptyFn);
		}
	},
	onUserLogout : function(button) {
		// clear session value
		this.sessionId = null;
		var sessionInfo = Ext.getStore('SessionInfo');
		sessionInfo.removeAll();
		sessionInfo.sync();
		// Disable button login
		var logoutButton = Ext.getCmp('logoutUser');
		logoutButton.setHidden(true);
		// get mainview 
		var navigationView = this.getMyNavigationView();
		var loginPanel = navigationView.down('login');
		var homePage = navigationView.down('homePage');
		navigationBar = navigationView.getNavigationBar(),
		navigationBar.setTitle(ConstChar.Login.TITLE_GMOBILE);
		
		loginPanel.show();
		homePage.hide();
	},
	onLoginFailure : function(err) {

		var panel = this.getMyLoginPanel();
		var button = panel.getComponent('loginButton');
		button.setText(ConstChar.Login.BUTTON_LOGIN);
		button.setDisabled(false);

		
	},
	onLoginSuccess : function(response) {
		var panel = this.getMyLoginPanel();
		var button = panel.getComponent('loginButton');
		button.setText(ConstChar.Login.BUTTON_LOGIN);
		button.setDisabled(false);

//		response = Ext.decode(response.responseText);
		if (response.success) {
			this.successfulLogin(response.user.user_id);
		} 
//		else {
//			Ext.Msg.alert('Login failed', response.message);
//		}
	},
	successfulLogin : function(sessionId) {

		this.sessionId = sessionId;

		var sessionInfo = Ext.getStore('SessionInfo');
		sessionInfo.removeAll();
		sessionInfo.sync();
//		var newRecord = Ext.ModelManager.getModel(App.path('model.SessionInfo')).setFields(this.sessionId);
		var newRecord = new TAMNV.model.SessionInfo({
		      sessionId: this.sessionId 
		     });
		sessionInfo.add(newRecord);
		sessionInfo.sync();

		var navigationView = this.getMyNavigationView();
		var loginPanel = navigationView.down('login');
		var homePage = navigationView.down('homePage');
		navigationBar = navigationView.getNavigationBar(),
		navigationBar.setTitle(ConstChar.Title.TITLE_GMOBILE);
//		var myHtml = "Welcome, <b>You are now logged in...</b>";
//		Ext.getCmp('welcomePanel').setHtml(myHtml);
		loginPanel.hide();
		homePage.show();

		var logoutButton = Ext.getCmp('logoutUser');
		logoutButton.setHidden(false);

	},
	init : function() {
		console.log('Controller initialized');
	}
});