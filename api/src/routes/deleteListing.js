import { db } from '../db.js';

export const deleteListing = {
  method: 'DELETE',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;

    await db.query('DELETE FROM listings WHERE id = $1 RETURNING *', [id]);

    return { message: `Listing with id: ${id} has been deleted` };
  },
};
