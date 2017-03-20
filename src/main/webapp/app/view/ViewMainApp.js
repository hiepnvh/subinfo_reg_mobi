Ext.define(App.path('view.ViewMainApp'), { 
    extend: 'Ext.Container',
    xtype: 'ViewMainApp',
    requires: [
       App.path('view.ViewMainNavigation')
       ], 
    config : {
    	fullscreen: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'mainNavigation',
                flex: 1
            }
        ]
    }
});


