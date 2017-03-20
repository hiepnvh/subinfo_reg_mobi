package vn.gmobile.subinfo_reg.model;

import java.util.Date;

import com.bean.annot.Attribute;
import com.bean.annot.Entity;
import com.bean.annot.ExternalKey;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;


@Entity(name = "charge_not_file")
public class ChargeNotFile extends Bean {
	@Attribute(name = "msisdn")
	@ExternalKey
	public static final BeanProperty<String> MSISDN = BeanProperty.stringType();
	@Attribute(name = "create_date")
	@ExternalKey
	public static final BeanProperty<String> CREATE_DATE = BeanProperty.stringType();
	@Attribute(name = "file_name_xml")
	@ExternalKey
	public static final BeanProperty<String> FILE_NAME_XML = BeanProperty.stringType();
}
