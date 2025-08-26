import axios from 'axios';
import { getSpotifyToken } from './token.service';
import { API_BASE_URL } from 'shared/constants/config.constant';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SPOTIFY_API_TOKEN}`,
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getSpotifyToken();
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

export default apiClient;
