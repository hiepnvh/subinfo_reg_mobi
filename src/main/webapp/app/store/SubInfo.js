Ext.define(App.path('store.SubInfo'), {
			extend : 'Ext.data.Store',
			model: App.path('model.SubInfo'),
			storeId : 'SubInfo',
			proxy : {
				type : 'ajax',
				url : 'subget',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				extraParams : {
					format : 'json'
				},
				reader : {
					type : 'json',
					root : 'subs'
				}
//				sorters: [{
//				     property: 'create_date',
//				     direction: 'ASC' // or 'ASC'
//				   }]
			}
		});