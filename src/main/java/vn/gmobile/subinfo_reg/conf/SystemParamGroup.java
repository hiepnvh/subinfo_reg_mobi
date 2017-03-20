package vn.gmobile.subinfo_reg.conf;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bean.base.BeanFilter;
import vn.gmobile.subinfo_reg.db.GASDbAdapter;
import vn.gmobile.subinfo_reg.model.SystemParam;



public class SystemParamGroup {
	private static Map<String,String> SYSTEM_PARAMS;
	static {
		try {
			SYSTEM_PARAMS =  new HashMap<String,String>();
			GASDbAdapter dba = new GASDbAdapter();
			BeanFilter paramFilter = new BeanFilter(SystemParam.class); 
			List<SystemParam> params =  dba.getBeans(paramFilter);
			for (SystemParam param: params) {
				SYSTEM_PARAMS.put(param.get(SystemParam.NAME),param.get(SystemParam.VALUE));
			}

			dba.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static final String DEFAULT_PASSWORD = SYSTEM_PARAMS.get("DEFAULT_PASSWORD");
	public static final Integer LOOKUP_MAX_NUM = Integer.parseInt(SYSTEM_PARAMS.get("LOOKUP_MAX_NUM"));
	public static final String EXTERNAL_API = SYSTEM_PARAMS.get("EXTERNAL_API");
	public static final String OTP_TIMEOUT = SYSTEM_PARAMS.get("OTP_TIMEOUT");
	public static final String OTP_SENDER = SYSTEM_PARAMS.get("OTP_SENDER");
	public static final int OTP_IN_DAY = Integer.parseInt(SYSTEM_PARAMS.get("OTP_IN_DAY"));
	
}
