import Boom from '@hapi/boom';
import { db } from '../db.js';

export const getListing = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const { id } = req.params;

    const { results } = await db.query('SELECT * FROM listings WHERE id = $1', [id]);

    const listing = results;

    if (!listing) {
      throw Boom.notFound(`Listing not found with id: ${id}`);
    }

    return listing;
  },
};
