package vn.gmobile.subinfo_reg.util.shell;


import ch.ethz.ssh2.*;
import java.io.OutputStreamWriter;

// Referenced classes of package com.fss.cdrbin.thread:
//            SyncPipe, CommandWriter

public class GanymedSimpleShell
    implements Runnable
{

    public GanymedSimpleShell()
    {
        result = "";
        syncPipeOut = null;
        syncPipeErr = null;
        database = new KnownHosts();
    }

    public void run()
    {
    }

    public String checkLynx(String username, String password, String host, String command, String server_name)
        throws Exception
    {
        String returnValue = "";
        try
        {
            Connection conn = new Connection(host);
            conn.connect();
            boolean isAuthenticated = conn.authenticateWithPassword(username, password);
            if(!isAuthenticated)
            {
                throw new Exception("Authentication failed.");
            } else
            {
                Session sess = conn.openSession();
                sess.startShell();
                CommandWriter writer = null;
                syncPipeErr = new SyncPipe(sess.getStderr(), System.err);
                syncPipeOut = new SyncPipe(sess.getStdout(), System.err);
                (new Thread(syncPipeErr)).start();
                (new Thread(syncPipeOut)).start();
                writer = new CommandWriter(new OutputStreamWriter(sess.getStdin(), "utf-8"));
                writer.writeCommand(command.replace("server_name", server_name));
                sess.waitForCondition(50, 1000L);
                writer.writeCommand("exit");
                sess.waitForCondition(50, 1000L);
                writer.close();
                sess.close();
                conn.close();
                returnValue = syncPipeOut.getResult();
                return returnValue;
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
    }

    public static void main(String args[])
        throws Exception
    {
        (new GanymedSimpleShell()).run();
    }

    public String check(String host, String username, String password, String command)
        throws Exception
    {
        String returnValue = "";
        try
        {
            Connection conn = new Connection(host);
            conn.connect();
            boolean isAuthenticated = conn.authenticateWithPassword(username, password);
            if(!isAuthenticated)
                throw new Exception("Authentication failed.");
            Session sess = conn.openSession();
            sess.startShell();
            CommandWriter writer = null;
            syncPipeErr = new SyncPipe(sess.getStderr(), System.err);
            syncPipeOut = new SyncPipe(sess.getStdout(), System.err);
            (new Thread(syncPipeErr)).start();
            (new Thread(syncPipeOut)).start();
            writer = new CommandWriter(new OutputStreamWriter(sess.getStdin(), "utf-8"));
            writer.writeCommand(command);
            sess.waitForCondition(50, 5000L);
            writer.writeCommand("exit");
            sess.waitForCondition(50, 5000L);
            writer.close();
            sess.close();
            conn.close();
            returnValue = syncPipeOut.getResult();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        return returnValue;
    }

    public String check(String host, String username, String password, String command[][])
        throws Exception
    {
        String returnValue = "";
        try
        {
            Connection conn = new Connection(host);
            conn.connect();
            boolean isAuthenticated = conn.authenticateWithPassword(username, password);
            if(!isAuthenticated)
                throw new Exception("Authentication failed.");
            Session sess = conn.openSession();
            sess.startShell();
            CommandWriter writer = null;
            syncPipeErr = new SyncPipe(sess.getStderr(), System.err);
            syncPipeOut = new SyncPipe(sess.getStdout(), System.err);
            (new Thread(syncPipeErr)).start();
            (new Thread(syncPipeOut)).start();
            writer = new CommandWriter(new OutputStreamWriter(sess.getStdin(), "utf-8"));
            for(int i = 0; i < command.length; i++)
            {
                writer.writeCommand(command[i][0]);
                sess.waitForCondition(50, Integer.parseInt(command[i][1]));
            }

            writer.close();
            sess.close();
            conn.close();
            returnValue = syncPipeOut.getResult();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        return returnValue;
    }

    public String checkRoot(String host, String username, String password, String pwd_root, String command)
        throws Exception
    {
        String returnValue = "";
        try
        {
            Connection conn = new Connection(host);
            conn.connect();
            boolean isAuthenticated = conn.authenticateWithPassword(username, password);
            if(!isAuthenticated)
                throw new Exception("Authentication failed.");
            Session sess = conn.openSession();
            sess.startShell();
            CommandWriter writer = null;
            syncPipeErr = new SyncPipe(sess.getStderr(), System.err);
            syncPipeOut = new SyncPipe(sess.getStdout(), System.err);
            (new Thread(syncPipeErr)).start();
            (new Thread(syncPipeOut)).start();
            writer = new CommandWriter(new OutputStreamWriter(sess.getStdin(), "utf-8"));
            writer.writeCommand("su -");
            sess.waitForCondition(50, 5000L);
            writer.writeCommand(pwd_root);
            sess.waitForCondition(50, 5000L);
            writer.writeCommand(command);
            sess.waitForCondition(50, 5000L);
            writer.writeCommand("exit");
            sess.waitForCondition(50, 5000L);
            writer.writeCommand("exit");
            sess.waitForCondition(50, 5000L);
            writer.close();
            sess.close();
            conn.close();
            returnValue = syncPipeOut.getResult();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw e;
        }
        return returnValue;
    }

    static final String knownHostPath = "~/.ssh/known_hosts";
    static final String idDSAPath = "~/.ssh/id_dsa";
    static final String idRSAPath = "~/.ssh/id_rsa";
    public String result;
    SyncPipe syncPipeOut;
    SyncPipe syncPipeErr;
    KnownHosts database;
}