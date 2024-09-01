import { fakeData } from './fakeData.js';

export const getAllListings = {
  method: 'GET',
  path: '/api/listings',
  handler: (req, h) => {
    return fakeData;
  },
};
