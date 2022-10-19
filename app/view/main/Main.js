/*
 * 视图 - 主页
 */

Ext.define("App.view.main.Main", {
	extend: "Ext.container.Viewport",
	xtype: "main",
	requires: [
		"App.view.main.MainModel",
		"App.view.main.MainController"
	],
	viewModel: {type: "main"},
	controller: "main",
	uses: [
		"App.view.main.Top",      // 欢迎您
		"App.view.main.Nav",      // 导航条，可以根据权限返回响应的数据
		"App.view.main.Content",
		"App.view.main.Bottom"
	],
	
	initComponent: function() {
		Ext.apply(this, {
			layout: "border",
			items: [{
				region: "north",
				xtype: "top"
			}, {
				region: "west",
				xtype: "nav"
			}, {
				region: "center",
				xtype: "content"
			}, {
				region: "south",
				xtype: "bottom"
			}]
		});
		Ext.QuickTips.init();
		Ext.Msg.minWidth = 300;
		Ext.setGlyphFontFamily('FontAwesome');
		this.callParent(arguments);
	}
});
