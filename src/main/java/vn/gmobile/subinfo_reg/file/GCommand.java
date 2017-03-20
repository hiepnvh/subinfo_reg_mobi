package vn.gmobile.subinfo_reg.file;

public abstract class GCommand
{
    public GCommand()
    {
    }
    
    public abstract void testCmd(String cmdString);
    
    public abstract boolean getFileXml(String fileName);
    
    public abstract boolean xmlToxls(String fileName);

	public abstract String findFile(String fileDir, String fileName);

//    public abstract int prepareBroadcast(BroadcastAgentTask agentTask);
//
//    public abstract int checkBroadcastStatus();
//
//    public abstract int startBroadcast(BroadcastAgentTask agentTask);
//
//    public abstract int stopBroadcast();
//
//    public abstract int enableBroadcast();
//
//    public abstract int disableBroadcast();
//
//    public abstract void getBroadcasatReport(BroadcastAgentTask agentTask, String successFilename, String failFilename);
    
}