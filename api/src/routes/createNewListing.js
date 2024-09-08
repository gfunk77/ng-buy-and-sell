import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

export const createNewListing = {
  method: 'POST',
  path: '/api/listings',
  handler: async (req, h) => {
    const id = uuidv4();

    const { name = '', description = '', price = 0 } = req.payload;

    const userId = '12345';
    const views = 0;
    await db.query(
      `
            INSERT INTO listings (id, name, description, price, user_id, views)
            VALUES ($1, $2, $3, $4, $5, $6);
            `,
      [id, name, description, price, userId, views]
    );

    return [{ id, name, description, price, user_id: userId, views }];
  },
};
