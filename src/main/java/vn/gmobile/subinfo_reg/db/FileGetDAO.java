/**
 * 
 */
package vn.gmobile.subinfo_reg.db;

import java.util.List;

import com.bean.base.BeanFilter;
import vn.gmobile.subinfo_reg.conf.Consts;
import vn.gmobile.subinfo_reg.file.GCommander;
import vn.gmobile.subinfo_reg.file.GLocalCommander;
import vn.gmobile.subinfo_reg.model.ChargeNotFile;

public class FileGetDAO {
	public List<ChargeNotFile> getChargeNotFile(BeanFilter filter) throws Exception {
		GASDbAdapter dba = new GASDbAdapter();
		List<ChargeNotFile> beans =  dba.getBeans(filter);
		dba.close();
		return beans;
	}
	

	
	public void updateFile(ChargeNotFile file) throws Exception {
		GASDbAdapter dba = new GASDbAdapter();
		dba.processBeans(file);
		dba.close();
	}
	
	public boolean downloadFile(String fileName,int type) throws Exception {
		GLocalCommander br = new GLocalCommander();
		boolean result = false;
		switch(type){
			case Consts.FILE_TYPE.CHARGE_NOT:
				result = br.getFileXml(fileName);
				break;
			case Consts.FILE_TYPE.INVOICE:
				result = br.getFileXml_RI(fileName);
				break;
		}
		
		return result;
	}
}
