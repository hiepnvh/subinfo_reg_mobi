package vn.gmobile.subinfo_reg.util.shell;


import java.util.logging.Logger;

public class SimpleRemoteCommander
{

    public SimpleRemoteCommander(String host, String user, String pass)
    {
        _host = host;
        _user = user;
        _pass = pass;
        _shell = new GanymedSimpleShell();
    }

    public String[] rawCommand(String command)
        throws Exception
    {
        LOGGER.info("Execute "+ command +" on "+ _host);
        String result = _shell.check(_host, _user, _pass, command);
        String lines[] = result.split("\n");
        for(int i = 0; i < lines.length; i++)
            LOGGER.info(lines[i]);

        return lines;
    }

    public void fileTransfer(String from, String to)
        throws Exception
    {
        String command = "scp " +  from + " "+ to;
        rawCommand(command);
    }

    public void witeFile(String file, String line)
        throws Exception
    {
        String command =  "echo  " + line + " > " + file;
        rawCommand(command);
    }

    public void clearFile(String file)
        throws Exception
    {
        String command = "cat /dev/null > "+ file;
        rawCommand(command);
    }

    public String[] lastLines(String file, int line)
        throws Exception
    {
        String command = "tail -" + line + " "+ file;
        String lines[] = rawCommand(command);
        return lines;
    }

    public boolean fileExist(String file)
        throws Exception
    {
        String command = "ls -ltr "+ file;
        String lines[] = rawCommand(command);
        for(int i = 0; i < lines.length; i++)
            if(lines[i].indexOf(file) != -1)
                return true;

        return false;
    }

    protected static final Logger LOGGER = Logger.getLogger(SimpleRemoteCommander.class.getName());
    private GanymedSimpleShell _shell;
    private String _host;
    private String _user;
    private String _pass;

}