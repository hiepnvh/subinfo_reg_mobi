/**
 * 
 */
package vn.gmobile.subinfo_reg.message;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.json.JSONObject;

import vn.gmobile.subinfo_reg.conf.Consts;
import vn.gmobile.subinfo_reg.conf.JsParams;
import vn.gmobile.subinfo_reg.conf.SystemParamGroup;
import vn.gmobile.subinfo_reg.db.UserDAO;
import vn.gmobile.subinfo_reg.util.SubscriberFilter;

import com.gtel.kannel.db.SendSmsDAO;
import com.gtel.kannel.model.SendSms;
import com.gtel.kannel.util.TextUtils;

/**
 * @author QuangN
 *
 */
public class OTPGetRequest extends JsonRequest{
	private static Logger LOGGER = Logger.getLogger(OTPGetRequest.class.getName());

	String _username;

	public OTPGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_username = jObj.getString(JsParams.OTP_GET_REQUEST.USERNAME);
	}
	


	@Override
	public JsonResponse execute() {
		OTPGetResponse resp = new OTPGetResponse();
		try {
//			if(SubscriberFilter.passFormat(_username))
//			{
				UserDAO dao = new UserDAO();
				
				String otp = dao.getOTP(_username);
				
				if(otp!=null){
//					***** Send sms to Kannel Database *****
					SendSmsDAO sendSmsDAO = new SendSmsDAO();
					
					SendSms sms;
					String sender = SystemParamGroup.OTP_SENDER;
					String msgdata = URLEncoder.encode(TextUtils.removeAccent("Ma xac nhan cua ban la: " + otp), "UTF-8");
					
					List<String> receivers = new ArrayList<String>();
					receivers.add(_username);
					
					List<SendSms> smsList = new ArrayList<SendSms>();
					for (String msisdn : receivers) {
						sms = new SendSms();
						
						sms.set(SendSms.SENDER, sender);
						sms.set(SendSms.RECEIVER, msisdn);
						sms.set(SendSms.MSGDATA, msgdata);
						
						smsList.add(sms);
					}
					
					sendSmsDAO.updateSendSms(smsList);
					
					resp.setSuccess(true);
					resp.setOTP(otp);
				}else{
					//Loi vi otp in day > cho phep
					resp.setSuccess(false);
					resp.setInfo("Bạn đã lấy Mật khẩu OTP quá số lần cho phép trong ngày. Vui lòng thử lại vào ngày hôm sau.");
				}
				

//			} else {
//				resp.setSuccess(false);
//				resp.setErrCode(Consts.ERR_CODE.MSISDN_NOT_EXIST);
//			}
			
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
		}
		return resp;
	}

}
