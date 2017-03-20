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

public class GCommander extends GCommand {
	protected static final Logger LOGGER = Logger.getLogger(GCommander.class.getName());
	
	private static final String CMD_LIST_FILE = "ls -ltr";
	private static final String CMD_XML_TO_XLS = "ls -ltr";
	
	
	private static final String user = "cbsuser";
	private static final String pass = "comverse";
	private static final String host = "10.16.72.17";
	
//	private static final String user = "root";
//	private static final String pass = "123456";
//	private static final String host = "10.16.69.83";
	
	private static final String REMOTE_FILE_DIR = "/staging/billing/data/disp/ready/";
	private static final String OUTPUT_XLS = "/home/cbsuser/bill_test/bill_store/";
	private static final String LOCAL_FILE_DIR = "";

	public GCommander() {
		try {
//			BroadcastAgentComverseDAO agentComvDAO = new BroadcastAgentComverseDAO();
//			_agentComverseConfig = agentComvDAO.getConfig(_agent
//					.get(BroadcastAgent.AGENT_ID));
			
			_cmd = new SimpleRemoteCommander(host, user, pass);
		} catch (Exception exc) {
			LOGGER.severe((new StringBuilder(
					"ComverseBroadcaster constructor error")).append(
					exc.getMessage()).toString());
		}
	}

//	public int checkBroadcastStatus() {
//		LOGGER.info("ComverseBroadcaster checkBroadcastStatus");
//		try {
//			String check_command = "smsc control check BROADCAST";
//			String result[] = _cmd.rawCommand(check_command);
//			LOGGER.info("ComverseBroadcaster checkBroadcastStatus  smsc control check ");
//			for (int i = 0; i < result.length; i++) {
//				String line = result[i];
//				if (RegexValidator.validate(DISABLE_PATTERN, line))
//					return Consts.BROADCASTER_STATUS.BROADCAST_DISABLE;
//				if (RegexValidator.validate(ENABLE_PATTERN, line)) {
//					String runningLogs[] = _cmd.rawCommand(
//							"ps -ef | grep broadcast_ei | grep -v \"grep broadcast_ei\"");
//					for (int j=0;j<runningLogs.length;j++) {
//						if (runningLogs[j].contains("broadcast_ei"))
//							return Consts.BROADCASTER_STATUS.BROADCAST_SENDING; 
//					}
//					return Consts.BROADCASTER_STATUS.BROADCAST_ENABLE;
//				}
//
//			}
//			return Consts.BROADCASTER_STATUS.BROADCAST_DISABLE;
//		} catch (Exception exc) {
//			LOGGER.info("ComverseBroadcaster checkBroadcastStatus exception "
//					+ exc);
//			return Consts.BROADCASTER_STATUS.BROADCAST_DISABLE;
//		}
//
//	}

//	public int enableBroadcast() {
//		try {
//			String check_command = "smsc control start BROADCAST";
//			_cmd.rawCommand(check_command);
//		} catch (Exception exc) {
//			LOGGER.severe("ComverseBroadcaster enaableBroadcast  exception "
//					+ exc);
//			return Consts.BROADCASTER_STATUS.FAILURE;
//		}
//		return Consts.BROADCASTER_STATUS.OK;
//	}

//	public int disableBroadcast() {
//		try {
//			String check_command = "smsc control stop BROADCAST";
//			_cmd.rawCommand(check_command);
//		} catch (Exception exc) {
//			LOGGER.severe("ComverseBroadcaster disableBroadcast  exception "
//					+ exc);
//			return Consts.BROADCASTER_STATUS.FAILURE;
//		}
//		return Consts.BROADCASTER_STATUS.OK;
//	}

	private SimpleRemoteCommander _cmd;
	
	@Override
	public void testCmd(String cmdString) {
		// TODO Auto-generated method stub
		LOGGER.info("Test my command:" + cmdString);
		try {
			LOGGER.info("Start ...");	
			String result[] = _cmd.rawCommand(cmdString);
			for (int i = 0; i < result.length; i++) {
				String line = result[i];
				System.out.println(line);
			}
			LOGGER.info("Finish!");
		} catch (Exception exc) {
			LOGGER.info("Have error when exec");
		}
	}
	
	@Override
	public String findFile(String fileDir, String fileName) {
		// TODO Auto-generated method stub
		LOGGER.info("Find file from other host");
		try {
			String cmd_find_file = "find "
					+ fileDir
					+ " -type f "
					+ " -name " + fileName
					+ " | head -n 1";
			
			String result[] = _cmd.rawCommand(cmd_find_file);
			
			if(result.length>0 && result[0].length() != 0){
				return result[0];
			} else {
				return null;
			}
		} catch (Exception e) {
			// TODO: handle exception
			LOGGER.info(REMOTE_FILE_DIR + fileName + "  : not exist!");
			return null;
		}
	}
	
	@Override
	public boolean xmlToxls(String fileName) {
		// TODO Auto-generated method stub
		LOGGER.info("xml to xls in remote host");
		try {
			String convert_file = "/home/cbsuser/bill_test/./bill_retrieve_web.sh "
						+  fileName.replace(".xml", "");
			
			LOGGER.info(convert_file);
			
			String result[] = _cmd.rawCommand(convert_file);
			
			// check file *.xml exist after convert
			if(this.findFile(OUTPUT_XLS, fileName.replace(".xml", ".xls")) != null)
				return true;
			else
				return false;
		} catch (Exception e) {
			// TODO: handle exception
			LOGGER.info(REMOTE_FILE_DIR + fileName + "  : not exist!");
			return false;
		}
	}
	
	@Override
	public boolean getFileXml(String fileName) {
		// TODO Auto-generated method stub
			LOGGER.info("Get file from other host");
		try {
			if (this.findFile(REMOTE_FILE_DIR, fileName)!=null) {
				// file found then convert file
				if(this.xmlToxls(fileName) == false){
					return false;
				}
			} else {
				LOGGER.info( fileName +": file not exist");
				return false;
			}
			
			fileName = fileName.replace(".xml", ".xls");
			
			StringBuffer output = new StringBuffer();
			String copyCommand = "scp "
					+ user + "@" + host +":" + OUTPUT_XLS + fileName + " "
					+ ServerConfig.getPhysicalDir();
			Process p;
			
			LOGGER.info("Execution command:" + copyCommand);
			p = Runtime.getRuntime().exec(copyCommand);
			p.waitFor();
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line = "";			
			while ((line = reader.readLine())!= null) {
				output.append(line + "\n");
			}
			
			String cmdCheckFileExcel = "find "
					+ ServerConfig.getPhysicalDir()
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
			
//			if (!_cmd.fileExist(ServerConfig.getPhysicalDir() + fileName)){
//				LOGGER.info(ServerConfig.getPhysicalDir() + fileName + " : not exist!");
//				return false;
//			}
			return true;
		} catch (Exception exc) {
			LOGGER.info("Get file exception");
			return false;
		}
	}

//	@Override
//	public int prepareBroadcast(BroadcastAgentTask agentTask) {
//		try {
//			
//			String subListFile = agentTask.get(BroadcastAgentTask.FILE_PATH);
//			String destFile = _agentComverseConfig.get(BroadcastAgentComverse.INPUT_DIR)
//					+ subListFile;
//			String groupFile = _agentComverseConfig
//					.get(BroadcastAgentComverse.INPUT_DIR)
//					+ "groups_"
//					+ subListFile;
//			_cmd.witeFile(groupFile, destFile);
//			_cmd.fileTransfer(
//					ServerConfig.getHostUser() + "@"
//							+ ServerConfig.getHostAddress() + ":"
//							+ ServerConfig.getPhysicalDir() + subListFile,
//					destFile);
//		} catch (Exception exc) {
//			LOGGER.severe("ComverseBroadcaster prepareBroadcast for agentTask +"
//					+ _agent.get(BroadcastAgent.AGENT_ID)
//					+ "  exception "
//					+ exc);
//			return Consts.BROADCASTER_STATUS.FAILURE;
//		}
//		return Consts.BROADCASTER_STATUS.OK;
//	}

//	@Override
//	public int startBroadcast(BroadcastAgentTask agentTask) {
//		LOGGER.info(" ComverseBroadcaster startBroadcast for subtask "
//				+ agentTask.get(BroadcastAgentTask.TASK_ID));
//		try {
//			BroadcastTaskDAO taskDao = new BroadcastTaskDAO();
//			BroadcastAgentDAO agentDao = new BroadcastAgentDAO();
//			BroadcastTask task = taskDao.getTask(agentTask
//					.get(BroadcastAgentTask.TASK_ID));
//			String subListFile = agentTask.get(BroadcastAgentTask.FILE_PATH);
//			String destFile = _agentComverseConfig.get(BroadcastAgentComverse.INPUT_DIR)
//					+ subListFile;
//			String groupFile = _agentComverseConfig.get(BroadcastAgentComverse.INPUT_DIR)
//					+ "groups_" + subListFile;
//			String text = task.get(BroadcastTask.MESSAGE);
//			if (text != null) {
//				LOGGER.info(" ComverseBroadcaster startBroadcast: validate group file"
//						+ groupFile);
//				boolean fileExist = _cmd.fileExist(groupFile);
//				if (!fileExist) {
//					LOGGER.info(" ComverseBroadcaster startBroadcast:  group file not exist");
//					return Consts.BROADCASTER_STATUS.INVALID_FILE_INPUT;
//				}
//			}
//
//			BroadcastAgent agent = agentDao.getAgent(agentTask
//					.get(BroadcastAgentTask.AGENT_ID));
//			String shortcode = task.get(BroadcastTask.SOURCE);
//			int bhsm = agent.get(BroadcastAgent.BHSM);
//			int validityPeriod = _agentComverseConfig
//					.get(BroadcastAgentComverse.VALIDITY_PERIOD);
//			int status = checkBroadcastStatus();
//			if (status == Consts.BROADCASTER_STATUS.BROADCAST_DISABLE) {
//				LOGGER.info("ComverseBroadcaster startBroadcast :  enable broadcast");
//				enableBroadcast();
//			} else if (status == Consts.BROADCASTER_STATUS.BROADCAST_SENDING) {
//				LOGGER.info("ComverseBroadcaster startBroadcast :  broacaster agent is busy");
//				return Consts.BROADCASTER_STATUS.FAILURE;
//			}
//
//			String command;
//			if (text == null || text.length() == 0) {
//				command = String.format(BATCH_COMMAND, shortcode, bhsm,
//						validityPeriod, destFile);
//				LOGGER.info("ComverseBroadcaster startBroadcast batch command " + command);
//
//			} else {
//				text = text.replaceAll("!", "! ");
//				text = text.replaceAll("\\[", "(");
//				text = text.replaceAll("\\]", ")");
//
//				command = String.format(BROADCAST_COMMAND, shortcode, bhsm,
//						validityPeriod, groupFile, text);
//				LOGGER.info("ComverseBroadcaster startBroadcast normal command " + command);
//			}
//			
//			_cmd.rawCommand(command);
//			return Consts.BROADCASTER_STATUS.OK;
//		} catch (Exception ex) {
//			LOGGER.info("ComverseBroadcaster startBroadcast exception " + ex);
//			return Consts.BROADCASTER_STATUS.FAILURE;
//		}
//	}

//	@Override
//	public int stopBroadcast() {
//		LOGGER.info(" ComverseBroadcaster stopBroadcast ");
//		try {
//			disableBroadcast();
//			Thread.sleep(5000L);
//			enableBroadcast();
//		} catch (Exception exc) {
//			LOGGER.severe("ComverseBroadcaster stopBroadcast exception " + exc);
//			return Consts.BROADCASTER_STATUS.FAILURE;
//		}
//		return Consts.BROADCASTER_STATUS.OK;
//	}
	
	public static void main(String[] agrs){
		GCommander br = new GCommander();
//		br.getFileXml("readme.txt");
//		br.testCmd(CMD_LIST_FILE);
		br.getFileXml("25252983.xml");
//		System.out.println(br.findFile("25fg252983.xml").length());
//		System.out.println(br.findFile("25252983.xml") == null ? "cant find found" : "found");
	}
}
