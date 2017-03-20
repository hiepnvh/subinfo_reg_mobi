package vn.gmobile.subinfo_reg.util.shell;

import java.util.logging.Logger;

public class SimpleLocalCommander
{

    public SimpleLocalCommander()
    {
    }

    public void cleanFile(String file)
        throws Exception
    {
        LOGGER.info((new StringBuilder("SimpleLocalCommander clean file ")).append(file).toString());
        String command = (new StringBuilder("cat /dev/null >  ")).append(file).toString();
        Runtime.getRuntime().exec(command);
    }

    protected static final Logger LOGGER = Logger.getLogger(SimpleLocalCommander.class.getName());

}