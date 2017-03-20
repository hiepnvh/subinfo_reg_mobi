package vn.gmobile.subinfo_reg.db;


import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Logger;

import snaq.db.ConnectionPool;

import vn.gmobile.subinfo_reg.conf.DbConfig;




public class DWH3DbAdapter  {

	protected static final Logger LOGGER = Logger.getLogger(DWH3DbAdapter.class.getName());
	public static ConnectionPool POOL;
	
	Connection _con;

	static {
		POOL = new ConnectionPool(DbConfig.getPoolName(),
				DbConfig.getMinPool(),
				DbConfig.getMaxPool(),
				DbConfig.getMaxSize(),
				DbConfig.getIdleTimeout(),
				DbConfig.getDWH3Url(),
				DbConfig.getDWH3User(),
				DbConfig.getDWH3Pass());

	}
	
	public Connection getConnection() throws SQLException{
		if(this._con == null) {
			_con = POOL.getConnection();
		}
		return _con;
	}

	public DWH3DbAdapter() throws Exception {
//		_con = POOL.getConnection();
	}

	public void close() {
		try {
			_con.close();
		} catch (SQLException e) {
			LOGGER.severe("BeanDbAdapter close connection" + e.getMessage());
			e.printStackTrace();
		}
	}
}
