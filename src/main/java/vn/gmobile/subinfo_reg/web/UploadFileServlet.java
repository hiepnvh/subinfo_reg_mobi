package vn.gmobile.subinfo_reg.web;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONException;
import org.json.JSONObject;

import com.mysql.jdbc.StringUtils;

import vn.gmobile.subinfo_reg.conf.ServerConfig;

public class UploadFileServlet extends HttpServlet {
	protected static final Logger LOGGER = Logger.getLogger(UploadFileServlet.class
			.getName());
	 private boolean _isMultipart;
	   private int _maxFileSize = 2 * 1024*1024;
	   private int _maxMemSize = 4 *1024* 1024;
	   private File _file ;
	
	public synchronized void doPost(HttpServletRequest request,
			HttpServletResponse response) {
		 _isMultipart = ServletFileUpload.isMultipartContent(request);
		 response.setHeader("Access-Control-Allow-Origin", "*");
	      response.setContentType("text/html");
	      if( !_isMultipart ){
	         return;
	      }
	      DiskFileItemFactory factory = new DiskFileItemFactory();
	      // maximum size that will be stored in memory
	      factory.setSizeThreshold(_maxMemSize);
	      // Location to save data that is larger than maxMemSize.
	     // factory.setRepository(new File("c:\\temp"));

	      // Create a new file upload handler
	      ServletFileUpload upload = new ServletFileUpload(factory);
	      // maximum file size to be uploaded.
	      upload.setSizeMax( _maxFileSize );

	      try{ 
	      // Parse the request to get file items.
	      List fileItems = upload.parseRequest(request);		
	      // Process the uploaded file items
	      Iterator i = fileItems.iterator();

	      if ( i.hasNext () ) 
	      {
	         FileItem fi = (FileItem)i.next();
	         if ( !fi.isFormField () )	
	         {
	            // Get the uploaded file parameters
	            String fileName = fi.getName();
	            if( fileName.lastIndexOf("\\") >= 0 )
	            	fileName =  fileName.substring( fileName.lastIndexOf("\\"));
	            fileName = fileName.replaceAll("-", "").replaceAll(" ", "");
	            String[] fileNameArr = fileName.split("\\.");
	            String fileExtension = fileNameArr[fileNameArr.length-1];
	            Calendar cal = Calendar.getInstance();
//	            fileName = cal.getTimeInMillis() + "_"+fileName;
	            //change file name
	            String msisdn = request.getParameter("msisdn");
	            fileName = msisdn + "." + fileExtension;
	            Date date = new Date();
	    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	    		String fileFolder = sdf.format(date);
	            // Write the file
	              _file = new File( ServerConfig.getPhysicalDir() + fileFolder + "/" + fileName) ;
	            _file.getParentFile().mkdirs();
	            fi.write( _file ) ;	
	            JSONObject jUrl = new JSONObject();
	            jUrl.put("url", fileName);
	            jUrl.put("success","true");
	            response.getWriter().write(jUrl.toString());
	         }
	      }

	   }catch(Exception ex) {
		   JSONObject jUrl = new JSONObject();
		   try {
			jUrl.put("success","false");
			response.getWriter().write(jUrl.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		   LOGGER.info(ex.getMessage());
	   }
	}
	

}
