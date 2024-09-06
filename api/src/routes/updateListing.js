import { db } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const updateListing = {
  method: 'POST',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { name, description, price } = req.payload;
    const userId = 'e70f25da-8a91-4d0f-b91c-f125f6a447e1';

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
