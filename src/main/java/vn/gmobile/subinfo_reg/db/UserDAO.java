/**
 * 
 */
package vn.gmobile.subinfo_reg.db;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.subinfo_reg.conf.Consts;
import vn.gmobile.subinfo_reg.conf.SystemParamGroup;
import vn.gmobile.subinfo_reg.model.SubInfo;
import vn.gmobile.subinfo_reg.util.OneTimePassWord;
import vn.gmobile.subinfo_reg.util.PasswordUtils;





/**
 * @author QuangN
 *
 */
public class UserDAO {
		
	public String getOTP(String username) throws Exception {
		
		String otpUser = OneTimePassWord.randomString(Consts.OTP_LEN);
		UserDAO dao = new UserDAO();
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, Integer.valueOf(SystemParamGroup.OTP_TIMEOUT));
		Date exp_date = cal.getTime();
		BeanFilter filter = new BeanFilter(SubInfo.class);
		filter.setFilter(SubInfo.msisdn,new StringEqualFilter(username));
		
		List<SubInfo> beans = getUser(filter);
		SubInfo user = new SubInfo();
		if(beans!=null && beans.size()>0){
			//check otp in day is ok?
			int otp_in_day = beans.get(0).get(SubInfo.otp_in_day);
			if(otp_in_day <=SystemParamGroup.OTP_IN_DAY){
				//update user
				user = beans.get(0);
				user.set(SubInfo.msisdn, username);
				user.set(SubInfo.otp, otpUser);
				user.set(SubInfo.status, 3);//Trang thai update tam thoi khi lay OTP
				user.set(SubInfo.otp_in_day, user.get(SubInfo.otp_in_day) + 1);
				user.set(SubInfo.expr_date, exp_date);
				updateUser(user);
			}else{
				return null;
			}
			
			
		}else{
			//create user 
			user.set(SubInfo.msisdn, username);
			user.set(SubInfo.otp, PasswordUtils.generateMD5Pass(otpUser));
			user.set(SubInfo.otp_in_day, 1);
			user.set(SubInfo.login_fail, 0);
			user.set(SubInfo.expr_date, exp_date);
			updateUser(user);
		}
			
//		
		
		
		return otpUser;
	}
	
	public List<SubInfo> getUser(BeanFilter filter) throws Exception {
		GASDbAdapter dba = new GASDbAdapter();
		List<SubInfo> beans =  null;
		try{
			beans = dba.getBeans(filter);
		}finally {
			dba.close();
		}
		return beans;
	}
	
	public void updateUser(SubInfo user) throws Exception {
		GASDbAdapter dba = new GASDbAdapter();
		try{
			dba.processBeans(user);
		}finally {
			dba.close();
		}
	}
}
