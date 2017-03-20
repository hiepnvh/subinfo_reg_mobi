package vn.gmobile.subinfo_reg.message;


import org.json.JSONObject;

import vn.gmobile.subinfo_reg.conf.JsParams;
import vn.gmobile.subinfo_reg.db.UserDAO;

public  abstract class JsonRequest  {
	
	Integer _userId;
	Boolean _viewOnly;
	
	public JsonRequest(JSONObject jObj) throws Exception {
		if (jObj.has(JsParams.GENERAL_REQUEST.USER_ID)) {
			_userId = jObj.getInt(JsParams.GENERAL_REQUEST.USER_ID);
			UserDAO userDAO = new UserDAO();
//			_viewOnly = userDAO.getUser(_userId).get(User.VIEWONLY);
		} else
			_userId = null;
	}
	
	public final Integer getUserId()  {
		return _userId;
	}
	
	public abstract JsonResponse execute() ;

	
}
