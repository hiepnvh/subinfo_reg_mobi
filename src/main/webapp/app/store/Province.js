Ext.define(App.path('store.Province'), {
	extend : 'Ext.data.Store',
	requires : [ App.path('model.Province') ],
	storeId : 'Province',
	config : {
		defaultRootProperty : 'name',
		model : App.path('model.Province'),
		autoLoad: true,
		proxy : {
			type : 'ajax',
			url : 'getProvince',
			actionMethods : {
				create : 'POST',
				read : 'POST',
				update : 'POST',
				destroy : 'POST'
			},

			reader : {
				type : 'json',
			 root : 'name'
			}

		}
	}
});