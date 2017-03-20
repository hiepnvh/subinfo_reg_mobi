package vn.gmobile.subinfo_reg.util.shell;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class CommandWriter
{

    public CommandWriter(OutputStreamWriter osw)
    {
        this.osw = osw;
    }

    public void writeCommand(String cmd)
    {
        try
        {
            osw.write(cmd);
            osw.write("\n");
            osw.flush();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
    }

    public void close()
    {
        if(osw == null)
            return;
        try
        {
            osw.close();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        if(osw != null)
            osw = null;
    }

    private Writer osw;
}
