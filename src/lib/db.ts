import { Pool } from 'pg';

const pool = new Pool({
  user: 'mealflowadmin',
  password: 'AdminMealflow1984',
  host: 'localhost',
  database: 'mealflow_dev',
  port: 5432,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

export const getClient = () => {
  return pool.connect();
};

// Healthcheck function to test database connection
export const checkConnection = async () => {
  try {
    const result = await query('SELECT NOW()');
    return result.rows[0];
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};