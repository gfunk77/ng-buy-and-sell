import { db } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const updateListing = {
  method: 'POST',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { name, description, price } = req.payload;
    const userId = 'e308293a-6865-4f61-b816-270c0c5cf100';

    const updatedResult = await db.query(
      `
            UPDATE listings
            SET name = $1, description = $2, price = $3
            WHERE id = $4 AND user_id = $5 
            RETURNING *;
            `,
      [name, description, price, id, userId]
    );
    // const { results } = await db.query('SELECT * FROM listings WHERE id = $1 AMD user_id = $2', [
    //   id,
    //   userId,
    // ]);
    return updatedResult;
  },
};
