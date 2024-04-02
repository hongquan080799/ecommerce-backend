import * as mysql from 'mysql2/promise'
import logger from '../utils/myLogger'
require('dotenv').config(); 
const database = process.env.MYSQL_DATABASE;
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;


const pool = mysql.createPool({
  host,
  user,
  password,
  database
});

async function verifyConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('Successfully connected to database!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    logger.error('Error connecting to database:', err);
  }
}


export const executeQuery = async (sql: string) => {
  try {
    const connection = await pool.getConnection();
    const res = await connection.query(sql);
    connection.release(); // Release the connection back to the pool
    return res
  } catch (err) {
    throw err
  }
}

export const executeWithParams = async (sql: string, params: Array<any>) => {
  try {
    const connection = await pool.getConnection();
    const res = await connection.query(sql, params);
    connection.release(); // Release the connection back to the pool
    return res
  } catch (err) {
    throw err
  }
}

export {verifyConnection}



