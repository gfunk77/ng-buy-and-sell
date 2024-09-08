import { db } from '../db.js';

export const updateListing = {
  method: 'POST',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;
    const { name, description, price } = req.payload;
    const userId = '12345';

    const updatedResult = await db.query(
      `
            UPDATE listings
            SET name = $1, description = $2, price = $3
            WHERE id = $4 AND user_id = $5 
            RETURNING *;
            `,
      [name, description, price, id, userId]
    );

    return updatedResult;
  },
};
