Ext.define("App.view.register.RegisterController", {
    extend: "Ext.app.ViewController",
    alias: "controller.register",
    uses: ["App.view.main.Main"],

    onSpecialKey: function(field, e) {
        console.log("enter")
        if(e.getKey() == e.ENTER) {
            // this.doLogin();
        }
    },

    onRegister : function () {
        var form = this.lookupReference("registerForm");
        if (form.isValid()) {
            let username = form.items.get(0).getValue().trim();
            let e_mail = form.items.get(1).getValue().trim();
            let password = form.items.get(2).getValue().trim();
            let conPass = form.items.get(3).getValue().trim();
            let fMsg = form.items.get(4);
            console.log('username==', username)    // 获取表单的第一个参数
            console.log('e_mail==', e_mail)    // 获取表单的第一个参数
            console.log('password==', password)    // 获取表单的第二个参数
            console.log('conPass==', conPass)    // 获取表单的第二个参数

            var emailRegExp=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!emailRegExp.test(e_mail)) {
                fMsg.setText("邮箱格式不正确")
                return
            }
            if (password != conPass || password == '') {
                fMsg.setText("两次密码不一致")
                return
            }
            let view = this.getView();
            form.submit({
                url : 'http://127.0.0.1:6111/r_register',
                method : 'POST',
                params : { // 此处可以添加额外参数
                    // extraParems : 'extraParems'
                },
                success : function(form, action) {
                    var respText = Ext.util.JSON.decode(action.response.responseText)
                    console.log("respText==>", respText)
                    if (respText.success == true) {
                        // 注册成功，将用户名存入 cookie
                        Ext.util.Cookies.set('username',username);
                        Ext.util.Cookies.set('token', respText.token)
                        view.destroy();
                        Ext.create("App.view.login.Login");    // 跳转页面
                    } else {
                        Ext.Msg.alert('消息', respText.msg);
                    }
                },
                failure : function(form, action) {
                    Ext.Msg.alert("消息", "操作失败!");
                }
            })
        }
    }

})