package vn.gmobile.subinfo_reg.conf;

import java.io.InputStream;

import vn.gmobile.subinfo_reg.util.ResourceLoader;

public class ServerConfig {
	static ResourceLoader LOADER;
	static String ACTIVE_CONFIG="testbed";
	static {
		try {
			String resourceName = "/conf/server.conf";
			InputStream is = DbConfig.class.getResourceAsStream(resourceName);
			LOADER = ResourceLoader.loadFromText(is);
			ACTIVE_CONFIG = LOADER.getString("active");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static String getPhysicalDir() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"physical-dir");
	}
	
	public static String getScriptDir() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"script-dir");
	}
	
	
	public static String getVirtualDir() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"virtual-dir");
	}
	
	public static String getHostUser() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"user");
	}
	
	public static String getHostAddress() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"host");
	}
	
	public static String[] getPrefix() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"prefix").split(",");
	}
	
	public static String getPfxDir() {
		return LOADER.getString(ACTIVE_CONFIG+"."+"pfx-dir");
	}
}
