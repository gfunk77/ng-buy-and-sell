import { db } from '../db.js';

export const getUserListings = {
  method: 'GET',
  path: '/api/users/{userId}/listings',
  handler: async (req, h) => {
    const { userId } = req.params;

    const { results } = await db.query('SELECT * FROM listings WHERE user_id = $1', [userId]);

    return results;
  },
};
