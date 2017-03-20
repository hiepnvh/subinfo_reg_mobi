package vn.gmobile.subinfo_reg.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "subinfo")
public class SubInfo extends Bean {
	@Attribute(name = "id")
	@ExternalKey
//	@AutoIncrement
	@Final
	public static final BeanProperty<Integer> id =  BeanProperty.integerType();
	@Attribute(name = "subid")
	public static final BeanProperty<String> subid =  BeanProperty.stringType();
	@Attribute(name = "fullname")
	public static final BeanProperty<String> fullname =  BeanProperty.stringType();
	@Attribute(name = "msisdn")
	public static final BeanProperty<String> msisdn =  BeanProperty.stringType();
	@Attribute(name = "sex")
	public static final BeanProperty<Integer> sex =  BeanProperty.integerType();
	@Attribute(name = "dob")
	public static final BeanProperty<Date> dob =  BeanProperty.dateType();
	@Attribute(name = "subid_provided_date")
	public static final BeanProperty<Date> subid_provided_date =  BeanProperty.dateType();
	@Attribute(name = "subid_provided_place")
	public static final BeanProperty<String> subid_provided_place =  BeanProperty.stringType();
	@Attribute(name = "subid_address")
	public static final BeanProperty<String> subid_address =  BeanProperty.stringType();
	@Attribute(name = "friend_msisdn")
	public static final BeanProperty<String> friend_msisdn =  BeanProperty.stringType();
	@Attribute(name = "id_front_img")
	public static final BeanProperty<String> id_front_img =  BeanProperty.stringType();
	@Attribute(name = "id_back_img")
	public static final BeanProperty<String> id_back_img =  BeanProperty.stringType();
	@Attribute(name = "sim_img")
	public static final BeanProperty<String> sim_img =  BeanProperty.stringType();
	
	@Attribute(name = "contact")
	public static final BeanProperty<String> contact =  BeanProperty.stringType();
	@Attribute(name = "active_date")
	public static final BeanProperty<Date> active_date =  BeanProperty.dateType();
	@Attribute(name = "recent_charge_date")
	public static final BeanProperty<Date> recent_charge_date =  BeanProperty.dateType();
	@Attribute(name = "recent_charge_value")
	public static final BeanProperty<Integer> recent_charge_value =  BeanProperty.integerType();
	
	@Attribute(name = "otp_in_day")
	public static final BeanProperty<Integer> otp_in_day =  BeanProperty.integerType();
	@Attribute(name = "info_update_date")
	public static final BeanProperty<Date> info_update_date =  BeanProperty.dateType();
	@Attribute(name = "expr_date")
	public static final BeanProperty<Date> expr_date =  BeanProperty.dateType();
	@Attribute(name = "login_fail")
	public static final BeanProperty<Integer> login_fail =  BeanProperty.integerType();
	@Attribute(name = "otp")
	public static final BeanProperty<String> otp =  BeanProperty.stringType();
	
	@Attribute(name = "serialsim")
	public static final BeanProperty<String> serialsim =  BeanProperty.stringType();
	@Attribute(name = "simcode")
	public static final BeanProperty<String> simcode =  BeanProperty.stringType();
	@Attribute(name = "requesttype")
	public static final BeanProperty<Integer> requesttype =  BeanProperty.integerType();
	
	@Attribute(name = "status")
	public static final BeanProperty<Integer> status =  BeanProperty.integerType();
	@Attribute(name = "from_address")
	public static final BeanProperty<String> from_address =  BeanProperty.stringType();
}
