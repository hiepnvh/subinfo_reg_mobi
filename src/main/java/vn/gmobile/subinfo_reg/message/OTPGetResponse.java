package vn.gmobile.subinfo_reg.message;

import vn.gmobile.subinfo_reg.conf.JsParams.OTP_GET_RESPONSE;

public class OTPGetResponse extends JsonResponse {
	
	public void setOTP(String val) throws Exception {
		write(OTP_GET_RESPONSE.OTP, val);
	}
	
}
