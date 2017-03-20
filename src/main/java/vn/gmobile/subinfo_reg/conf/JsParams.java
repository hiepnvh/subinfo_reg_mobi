/**
 * 
 */
package vn.gmobile.subinfo_reg.conf;


/**
 * @author QuangN
 * 
 */
public class JsParams {
	
	public static class GENERAL_REQUEST {
		public static final String USER_ID = "user_id";
	}
	
	public static class GENERAL_RESPONSE {
		public static final String SUCCESS = "success";
		public static final String INFO = "info";
		public static final String ERR_CODE = "err_code";
	}	
	

	public static class GET_USER_REQUEST extends GENERAL_REQUEST  {
		public static final String USERNAME = "username";
		public static final String PROFILE_ID = "profile_id";
		public static final String START = "start";
		public static final String LIMIT = "limit";
	}
	
	public static class GET_USER_RESPONSE extends GENERAL_RESPONSE{
		public static final String USER_LIST = "user_list";
		public static final String PROFILE_LIST = "profile_list";
		public static final String FUNCTION_LIST = "function_list";
		public static final String TOTAL_COUNT = "totalCount";

	}
	
	public static class GET_FUNCTION_REQUEST extends GENERAL_REQUEST  {
		public static final String PROFILE_ID = "profile_id";
	}
	
	public static class GET_FUNCTION_RESPONSE extends GENERAL_RESPONSE{
		public static final String FUNCTION_LIST = "function_list";
	}
	
	public static class UPDATE_USER_REQUEST extends GENERAL_REQUEST{
		public static final String subinfo = "subinfo";
	}
	
	public static class UPDATE_USER_RESPONSE extends GENERAL_RESPONSE{
		
	}
	
	public static class GET_PROFILE_REQUEST extends GENERAL_REQUEST  {
		public static final String PROFILE_ID = "profile_id";
	}
	
	public static class GET_PROFILE_RESPONSE extends GENERAL_RESPONSE{
		public static final String PROFILE_LIST= "profile_list";
	}
	
	public static class LOGIN_REQUEST  {
		public static final String USERNAME = "username";
		public static final String PASWORD = "password";
		
	}	
	
	public static class LOGIN_RESPONSE extends GENERAL_RESPONSE{
		public static final String USER = "user";
		public static final String FUNCTION_LIST= "function_list";
		public static final String PROFILE= "profile";
	}

	public static class UPDATE_PROFILE_REQUEST extends GENERAL_REQUEST{
		public static final String FUNCTION_LIST = "function_list";
		public static final String PROFILE = "profile";
	}

	public static class UPDATE_PROFILE_RESPONSE extends GENERAL_RESPONSE{
		
	}
	
	public static class GET_PROVINCE_DATA_REQUEST extends GENERAL_RESPONSE{
		public static final String USER = "user";
		public static final String FUNCTION_LIST= "function_list";
		public static final String PROFILE= "profile";
	}

	public static class GET_PROVINCE_DATA_RESPONSE extends GENERAL_REQUEST{
		public static final String result = "result";
		public static final String PROFILE = "profile";
	}
	/*####################################################################3*/
	
	public static class OTP_GET_REQUEST extends GENERAL_REQUEST{
		public static final String USERNAME = "msisdn";
	}
	
	public static class OTP_GET_RESPONSE extends GENERAL_RESPONSE{
		public static final String OTP = "otp";
	}
	
	public static class FILE_GET_REQUEST extends GENERAL_REQUEST{
		public static final String USERNAME = "username";
		public static final String INVOICETYPE = "invoicetype";
	}
	
	public static class FILE_GET_RESPONSE extends GENERAL_RESPONSE{
		public static final String FILE_LIST = "file_list";
	}
	
	public static class FILE_DOWNLOAD_REQUEST extends GENERAL_REQUEST{
		public static final String USERNAME = "username";
		public static final String FILENAME = "filename";
		public static final String TYPE = "type";
	}
	
	public static class FILE_DOWNLOAD_RESPONSE extends GENERAL_RESPONSE{
	}
	
	public static class RECHARGE_HISTORY_GET_REQUEST extends GENERAL_REQUEST{
		public static final String MSISDN = "msisdn";
		public static final String AMOUNT = "amount";
		public static final String DATE = "date";
	}

	public static class RECHARGE_HISTORY_GET_RESPONSE extends GENERAL_RESPONSE{
		public static final String RESULT = "result";
	}
	
	public static class CDR_HISTORY_GET_REQUEST extends GENERAL_REQUEST{
		public static final String MSISDN = "msisdn";
		public static final String MSISDN_LIST = "msisdn_list";
	}

	public static class CDR_HISTORY_GET_RESPONSE extends GENERAL_RESPONSE{
		public static final String RESULT_LIST = "result_list";
	}
	
	public static class RED_INVOICE_CHECK_REQUEST extends GENERAL_REQUEST{
		public static final String username = "username";
		public static final String filename = "filename";
	}
	
	public static class RED_INVOICE_CHECK_RESPONSE extends GENERAL_RESPONSE{
		public static final String file_return = "filename";
		public static final String result = "result";
	}
}
