package vn.gmobile.subinfo_reg.util.shell;


import java.io.*;

class SyncPipe
    implements Runnable
{

    public SyncPipe(InputStream istrm, OutputStream ostrm)
    {
        this(istrm, ostrm, 4096);
    }

    public SyncPipe(InputStream istrm, OutputStream ostrm, int bufferSize)
    {
        closeAfterCopy_ = false;
        mstrResult = "";
        if(istrm == null)
            throw new IllegalArgumentException("'istrm' cannot be null");
        if(ostrm == null)
            throw new IllegalArgumentException("'ostrm' cannot be null");
        if(bufferSize < 1024)
        {
            throw new IllegalArgumentException("a buffer size less than 1024 makes little sense");
        } else
        {
            istrm_ = istrm;
            ostrm_ = ostrm;
            buffer_ = new byte[bufferSize];
            return;
        }
    }

    public void handleException(IOException e)
    {
        e.printStackTrace();
    }

    public SyncPipe setCloseAfterCopy(boolean closeAfterCopy)
    {
        closeAfterCopy_ = closeAfterCopy;
        return this;
    }

    public void run()
    {
        try
        {
            InputStreamReader insrerr = new InputStreamReader(istrm_);
            BufferedReader stderrReader = new BufferedReader(insrerr);
            do
            {
                String line = stderrReader.readLine();
                if(line == null)
                    break;
                if(!line.trim().equals(""))
                    mstrResult = (new StringBuilder(String.valueOf(mstrResult))).append(line).append("\n").toString();
            } while(true);
            ostrm_.flush();
            if(closeAfterCopy_)
                ostrm_.close();
        }
        catch(IOException e)
        {
            handleException(e);
        }
    }

    public String getResult()
    {
        return mstrResult;
    }

    public void addResult(String addedString)
    {
        mstrResult = (new StringBuilder(String.valueOf(mstrResult))).append(addedString).append("\n").toString();
    }

    private final byte buffer_[];
    private final OutputStream ostrm_;
    private final InputStream istrm_;
    private boolean closeAfterCopy_;
    private String mstrResult;
}