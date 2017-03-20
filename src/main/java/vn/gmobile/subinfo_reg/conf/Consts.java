/**
 * 
 */
package vn.gmobile.subinfo_reg.conf;


/**
 * @author QuangN
 *
 */
public class Consts {
	
	public static final String DEFAULT_PASSWORD ="123456";
	public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String NUMBER_FORMAT = "(8499|84199)(\\d{7})";
	public static final String CURRENCY_FORMAT = "#.### VND";
	public static final Integer OTP_LEN = 6;
	
	public static class STATE {
		public static final int ACTIVE= 1;
		public static final int INACTIVE= 0;
	}	
	
	public static class AGENT_TYPE {
		public static final int COMVERSE= 1;
	}
	
	public static class ERR_CODE {
		public static final String MSISDN_NOT_EXIST = "msisdn_not_exist";
		
	}
	
	public static class FILE_TYPE {
		public static final int CHARGE_NOT = 1;
		public static final int INVOICE = 2;
	}
}
