import { fakeData } from './fakeData.js';

export const getListing = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: (req, h) => {
    const { id } = req.params;

    return fakeData.find((listing) => listing.id === +id);
  },
};
