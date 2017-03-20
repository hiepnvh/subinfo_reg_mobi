Ext.define(App.path('view.ViewMainNavigation'), {
    extend: 'Ext.navigation.View',
    alias : 'widget.mainNavigation',
    id: 'mainNavigation',
    xtype : 'mainNavigation',
    requires: [
		App.path('view.ViewHome'),
//		App.path('view.ViewLogin')
    ], 
    fullscreen: true,
    config: {
//    	scrollable: true,
        layout: {
            type: 'card',
            animation: 'pop'
        },
        // Item
        items: [{
        	xtype: 'panel',
        	title : 'Hệ thống nhận hồ sơ cá nhân Gmobile',
            itemId: 'itemMainNavigation',
            layout: 'fit',
            items: [{
                xtype: 'ViewHome',
                flex: 1
            }]
        }]
    }
    });
