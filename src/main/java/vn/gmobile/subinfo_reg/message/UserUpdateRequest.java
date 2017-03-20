package vn.gmobile.subinfo_reg.message;

import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import org.json.JSONObject;

import com.base.filter.DateGreaterThanOrEqualFilter;
import com.base.filter.DateLessThanOrEqualFilter;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.IntegerInFilter;
import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;
import com.mysql.fabric.xmlrpc.base.Array;

import vn.gmobile.subinfo_reg.conf.JsParams;
import vn.gmobile.subinfo_reg.db.UserDAO;
import vn.gmobile.subinfo_reg.model.SubInfo;
import vn.gmobile.subinfo_reg.util.PasswordUtils;
import vn.gmobile.subinfo_reg.web.ActionServlet;



public class UserUpdateRequest extends JsonRequest {

	public UserUpdateRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONObject jsUser = jObj.getJSONObject(JsParams.UPDATE_USER_REQUEST.subinfo);
		_user =(SubInfo) JsonUtils.fromJsonToBean(jsUser, SubInfo.class);
		_from_address = jObj.getString("from_address");
	}
	
	protected static final Logger LOGGER = Logger.getLogger(UserUpdateRequest.class
			.getName());

	SubInfo  _user;
	String _from_address;

	@Override
	public JsonResponse execute() {
		UserUpdateResponse resp = new UserUpdateResponse();
		try {
			LOGGER.info(_from_address);
			//upload id img then update into DB
//			File id_front_img = new File(_user.get(SubInfo.id_front_img));
//			File id_back_img = new File(_user.get(SubInfo.id_back_img));
			
			UserDAO dao = new UserDAO();
			BeanFilter filter = new BeanFilter(SubInfo.class);
			filter.setFilter(SubInfo.msisdn,new StringEqualFilter(_user.get(SubInfo.msisdn)));
			
			//Check request timeout, for a IP
			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.MINUTE, -5);
			Date nextInput = cal.getTime();
			BeanFilter msisdn_filter = new BeanFilter(SubInfo.class);//Nhung TB dk lien tuc trong vong 5p(1)
			BeanFilter ip_filter = new BeanFilter(SubInfo.class);//Nhung IP dk lien tuc trong vong 5p(2)
			msisdn_filter.setFilter(SubInfo.msisdn,new StringEqualFilter(_user.get(SubInfo.msisdn)));
			msisdn_filter.setFilter(SubInfo.info_update_date,new DateGreaterThanOrEqualFilter(nextInput));
			ip_filter.setFilter(SubInfo.from_address ,new StringEqualFilter(_from_address));
			ip_filter.setFilter(SubInfo.info_update_date,new DateGreaterThanOrEqualFilter(nextInput));
			
			List<SubInfo> msisdn_Subs = dao.getUser(msisdn_filter);
			List<SubInfo> ip_Subs = dao.getUser(ip_filter);
			
			//Neu (1) hoac (2)
//			if((msisdn_Subs!=null && msisdn_Subs.size()>0) || (ip_Subs!=null && ip_Subs.size()>0)){
			if(msisdn_Subs!=null && msisdn_Subs.size()>0){
				resp.setSuccess(false);
				resp.setInfo("QK chỉ được nhập thông tin 5 phút sau khi vừa hoàn thành.");
			}else{
				//Nhap thong tin
				int requestType = _user.get(SubInfo.requesttype);
				//re-update file url
				Date date = new Date();
	    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	    		String fileFolder = sdf.format(date);
	    		_user.set(SubInfo.id_front_img,fileFolder + "/" + _user.get(SubInfo.id_front_img));
	    		_user.set(SubInfo.id_back_img,fileFolder + "/" + _user.get(SubInfo.id_back_img));
	    		_user.set(SubInfo.sim_img,fileFolder + "/" + _user.get(SubInfo.sim_img));
				if(requestType==1){
					//Register
					Set<Integer> sttNotToReg = new HashSet<Integer>();
					sttNotToReg.add(0);
					sttNotToReg.add(1);
					sttNotToReg.add(4);
					filter.setFilter(SubInfo.status,new IntegerInFilter(sttNotToReg)); //thue bao van dang sd hoac da duoc active
					List<SubInfo> beans = dao.getUser(filter);
					if(beans!=null && beans.size()>0){
						//Thue bao da ton tai/ dang duoc su dung --> bao loi
						resp.setSuccess(false);
						resp.setInfo(" Thuê bao đang được sử dụng. Không thể đăng ký mới");
						
					}else{
						//dang ky moi
						BeanFilter filter2 = new BeanFilter(SubInfo.class);
						filter2.setFilter(SubInfo.msisdn,new StringEqualFilter(_user.get(SubInfo.msisdn)));
						List<SubInfo> subs = dao.getUser(filter2);
						if(subs!=null &&subs.size()>0){
							//update for new sub
							_user.set(SubInfo.id, subs.get(0).get(SubInfo.id));
						}else{
							//create new record
							//do nothing
						}
						_user.set(SubInfo.info_update_date, new Date());
						_user.set(SubInfo.status, 0);
						_user.set(SubInfo.from_address, _from_address);
						dao.updateUser(_user);
						resp.setSuccess(true);
					}
				}else{
					//Update
					Date now = new Date();
					filter.setFilter(SubInfo.expr_date, new DateGreaterThanOrEqualFilter(now));
					
					List<SubInfo> beans = dao.getUser(filter);
					if(beans!=null && beans.size()>0){
						//update user (exprdate, login fail)
						SubInfo user = beans.get(0);
						
						_user.set(SubInfo.id, user.get(SubInfo.id));
						_user.set(SubInfo.info_update_date, new Date());
						_user.set(SubInfo.status, 0);
						_user.set(SubInfo.from_address, _from_address);
						
						dao.updateUser(_user);
						resp.setSuccess(true);
					}else{
						resp.setSuccess(false);
						resp.setInfo(" Có lỗi xảy ra hoặc Mã xác nhận đã hết hạn");
					}
				}
			}
			
			
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
		}
		return resp;
	}
}
