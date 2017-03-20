package vn.gmobile.subinfo_reg.file;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.logging.Logger;

import vn.gmobile.subinfo_reg.conf.Consts;
import vn.gmobile.subinfo_reg.conf.ServerConfig;
import vn.gmobile.subinfo_reg.db.*;
import vn.gmobile.subinfo_reg.model.*;
import vn.gmobile.subinfo_reg.util.RegexValidator;
import vn.gmobile.subinfo_reg.util.shell.SimpleRemoteCommander;

public class GLocalCommander {
	protected static final Logger LOGGER = Logger.getLogger(GLocalCommander.class.getName());
	
	private static final String SCRIPT_DIR = ServerConfig.getScriptDir() + "genxlsscripts/";
	
	private static final String PHYS_DIR = ServerConfig.getPhysicalDir() ;

	public GLocalCommander() {}

	public boolean getFileXml(String fileName) {
		// TODO Auto-generated method stub
			LOGGER.info("Get file from local host");
		try {
			// Creat a process
			Process p;
			StringBuffer output;
			
			// Convert file
			String convert_file = SCRIPT_DIR + "./bill_retrieve_web.sh "
					+  fileName.replace(".xml", "");
			
			LOGGER.info("Execution command:" + convert_file);
			
			p = Runtime.getRuntime().exec(convert_file);
			p.waitFor();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line = "";
			
			output = new StringBuffer();
			while ((line = reader.readLine())!= null) {
				if(line.equals("0"))
					return false;
				output.append(line + "\n");
			}
			System.out.println(output.toString());
			// Check excel file exist
			
			String cmdCheckFileExcel = "find "
					+ PHYS_DIR + "xls/"
					+ " -type f "
					+ " -name " + fileName
					+ " | head -n 1";
			LOGGER.info("Execution command:" + cmdCheckFileExcel);
			p = Runtime.getRuntime().exec(cmdCheckFileExcel);
			p.waitFor();
			reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			line = "";			
			while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
			}
			
			System.out.println(output.toString());
			
			return true;
		} catch (Exception exc) {
			LOGGER.info("Get file exception");
			return false;
		}
	}

//	public static void main(String[] agrs){
//		GLocalCommander br = new GLocalCommander();
////		br.getFileXml("readme.txt");
////		br.testCmd(CMD_LIST_FILE);
//		br.getFileXml("25252983.xml");
////		System.out.println(br.findFile("25fg252983.xml").length());
////		System.out.println(br.findFile("25252983.xml") == null ? "cant find found" : "found");
//	}

	public boolean getFileXml_RI(String fileName) {
		// TODO Auto-generated method stub
		LOGGER.info("Get file from local host");
		try {
			// Creat a process
			Process p;
			StringBuffer output;
			
			// Convert file
			String convert_file = SCRIPT_DIR + "./redinvoice.sh "
					+  fileName.replace(".xml", "");
			
			LOGGER.info("Execution command:" + convert_file);
			
			// Check excel file exist
			
						String[] fileNameSplit = fileName.split("/");
						String fileNameNoPath = fileNameSplit[fileNameSplit.length-1];
						String cmdCheckFileExcel = "find "
								+ PHYS_DIR + "xml/"
								+ " -type f "
								+ " -name " + fileNameNoPath
								+ " | head -n 1";
						LOGGER.info("Execution command:" + cmdCheckFileExcel);
						
			p = Runtime.getRuntime().exec(convert_file);
			p.waitFor();
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line = "";
			
			output = new StringBuffer();
			while ((line = reader.readLine())!= null) {
				if(line.equals("0"))
					return false;
				output.append(line + "\n");
			}
			System.out.println(output.toString());
			
			p = Runtime.getRuntime().exec(cmdCheckFileExcel);
			p.waitFor();
			reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			line = "";			
			while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
			}
			
			System.out.println(output.toString());
			
			return true;
		} catch (Exception exc) {
			LOGGER.info("Get file exception");
			return false;
		}
	}
}
