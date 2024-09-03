// import mysql from 'mysql2/promise';

// let connection;

// export const db = {
//   connect: async () => {
//     try {
//       connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'hapi-server',
//         password: 'password',
//         database: 'buy-and-sell',
//       });
//       console.log('Connected to the database');
//     } catch (error) {
//       console.error('Error connecting to the database: ', error);
//       throw error;
//     }
//   },
//   query: async (queryString, escapedValues) => {
//     try {
//       const [results, fields] = await connection.query(queryString, escapedValues);

//       return [results, fields];
//     } catch (error) {
//       console.error('Error querying the database: ', error);
//       throw error;
//     }
//   },
//   end: async () => {
//     try {
//       await connection.end();
//       console.log('Database connection closed');
//     } catch (error) {
//       console.error('Error closing the database connection:', error);
//       throw error;
//     }
//   },
// };

import pkg from 'pg';
const { Pool } = pkg;

let pool;

export const db = {
  connect: async () => {
    try {
      pool = new Pool({
        host: 'localhost',
        user: 'hapi-server',
        password: 'password',
        database: 'buy-and-sell',
        port: 5432, // Default port for PostgreSQL
      });
      console.log('Connected to the PostgreSQL database');
    } catch (error) {
      console.error('Error connecting to the PostgreSQL database: ', error);
      throw error;
    }
  },
  query: async (queryString, escapedValues) => {
    try {
      const client = await pool.connect();
      try {
        const res = await client.query(queryString, escapedValues);
        console.log(res);
        return { results: res.rows, fields: res.fields };
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error executing query: ', error);
      throw error;
    }
  },
  end: async () => {
    try {
      await pool.end();
      console.log('PostgreSQL connection closed');
    } catch (error) {
      console.error('Error closing the PostgreSQL connection: ', error);
      throw error;
    }
  },
};
