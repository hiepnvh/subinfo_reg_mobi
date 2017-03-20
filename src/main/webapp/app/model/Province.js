Ext.define(App.path('model.Province'), {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : 'provinceid',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}, ]
	}
});