import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL + `/api/`;

export default axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
