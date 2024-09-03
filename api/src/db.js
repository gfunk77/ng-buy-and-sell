import mysql from 'mysql2/promise';

let connection;

export const db = {
  connect: async () => {
    try {
      connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hapi-server',
        password: 'password',
        database: 'buy-and-sell',
      });
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database: ', error);
      throw error;
    }
  },
  query: async (queryString, escapedValues) => {
    try {
      const [results, fields] = await connection.query(queryString, escapedValues);

      return [results, fields];
    } catch (error) {
      console.error('Error querying the database: ', error);
      throw error;
    }
  },
  end: async () => {
    try {
      await connection.end();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing the database connection:', error);
      throw error;
    }
  },
};
