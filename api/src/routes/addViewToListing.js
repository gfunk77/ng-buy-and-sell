import { db } from '../db.js';

export const addViewToListing = {
  method: 'POST',
  path: '/api/listings/{id}/add-view',
  handler: async (req, h) => {
    const { id } = req.params;

    await db.query('UPDATE listings SET views = views + 1 WHERE id = $1', [id]);

    const { results } = await db.query('SELECT * FROM listings WHERE id = $1', [id]);

    const updatedListing = results;
    return updatedListing;
  },
};
