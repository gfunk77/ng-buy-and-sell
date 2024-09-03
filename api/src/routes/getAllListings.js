import { db } from '../db.js';

export const getAllListings = {
  method: 'GET',
  path: '/api/listings',
  handler: async (req, h) => {
    const results = await db.query('SELECT * FROM listings;');
    return results;
  },
};
