Ext.define("App.view.register.Register", {
    extend: "Ext.container.Viewport",
    xtype : "register",

    requires: [
        "App.view.register.RegisterController"
    ],
    viewModel: {
        type : "register"
    },
    controller: "register",

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: "window",
                title: "用户注册",
                width: 400,
                height: 360,
                autoShow: true,
                closable: false,
                resizable: false,
                constrain: true,
                iconCls: "icon-user",
                cls: "register-win",
                items: [{
                    xtype: "image",
                    src: "img/logo.png",
                    height: 60,
                    cls: "login-logo"
                }, {
                    xtype: "form",
                    reference: "registerForm",             // 这个很重要, 可以通过 this.lookupReference("registerForm"); 获取参数
                    defaultType: "textfield",
                    fieldDefaults: {
                        anchor: "100%",
                        margin: 15,
                        labelWidth: 60,
                        allowBlank: false
                    },
                    items: [
                        {
                            name : "r_username",
                            fieldLabel: "用户名",
                        },
                        {
                            name : 'r_email',
                            fieldLabel: "邮箱",
                        },
                        {
                            name: "r_password",
                            inputType: "password",
                            fieldLabel: "密码",
                        },
                        {
                            name: "con_password",
                            inputType: "password",
                            fieldLabel: "确认密码",
                        }, {          // 一个提示信息
                            xtype: 'label',
                            name: 'msg_field',
                            style: {"color": "#f00"}
                        }
                    ]
                }],
                buttonAlign: "center",
                buttons: [{
                    text: "注册",
                    handler : "onRegister"   // 调用方法
                }]
            }]
        });
        this.callParent(arguments);
    }
})
