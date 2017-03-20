Ext.define(App.path('Action'), {
    alternateClassName: 'App.Action',
    statics: {
      ResponseCode: {
            OK: 0
      },
     AjaxRequest: function(url ,params, callback, scope) {
        Ext.Ajax.request({
            url: url,
            actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
            params: params,
            timeout: 300000,
            callback : callback,//options,success,response 
            scope: scope
        });
     },
     loadJsonStore:function( url, params,model, callback, scope) {
        Ext.create('Ext.data.Store', {
             model: model,
             proxy: {
                 type: 'ajax',
                 url: url,//App.Setting.getHostUrl() + '/' + url,
                 extraParams: params,
                 reader: {
                     type: 'json',
                     root: 'data'
                 }
             }
         }).load({ callback: callback, scope: scope});
     },
   
     GetOTP:function(msisdn, callback, scope){
         this.AjaxRequest('getotp',{msisdn:msisdn},callback, scope);
     },
     UserUpdate:function(subinfo, callback, scope){
          this.AjaxRequest('updateuser',{subinfo:subinfo},callback, scope)
     }
     ,
     GetProvince:function(msisdn, callback, scope){
          this.AjaxRequest('getProvince',{msisdn:msisdn},callback, scope)
     }
    }
});

