Ext.define("App.view.login.LoginController", {
	extend: "Ext.app.ViewController",
	alias: "controller.login",
	uses: ["App.view.main.Main"],
	
	onSpecialKey: function(field, e) {
		console.log("enter")
		if(e.getKey() == e.ENTER) {
			this.doLogin();
		}
	},
	
	onLogin: function() {
		this.doLogin();
	},
	
	doLogin: function() {
		var form = this.lookupReference("loginForm");   // 获取
		if(form.isValid()) {
			let username = form.items.get(0).getValue().trim();
			let password = form.items.get(1).getValue().trim();
			let fMsg = form.items.get(2);
			console.log('username==', username)    // 获取表单的第一个参数
			console.log('password==', password)    // 获取表单的第二个参数
			fMsg.setText('登录验证中...');

			let view = this.getView()
			form.submit({
				waitTitle : '提示',// 标题
				url : 'http://127.0.0.1:6111/r_login',
				method : 'POST',
				params : { // 此处可以添加额外参数
					// extraParems : 'extraParems'
				},
				success : function(form, action) {
					var respText = Ext.util.JSON.decode(action.response.responseText)
					console.log("respText==>", respText)
					if (respText.success == true) {
						// 用户名 存如cookie
						Ext.util.Cookies.set('username',username);
						Ext.util.Cookies.set('token',respText.token);
						view.destroy();
						Ext.create("App.view.main.Main");    // 跳转页面
					} else {
						Ext.Msg.alert('消息', respText.msg);
					}
				},
				failure : function(form, action) {
					var respText = Ext.util.JSON.decode(action.response.responseText)
					console.log("失败 respText===>", respText)
					fMsg.setText(respText.error);
					// Ext.Msg.alert("消息", "操作失败!");
				}
			})
		}
	},

	register_view : function () {
		this.getView().destroy();
		Ext.create("App.view.register.Register")
	}
});












