import axios from 'axios';

const TOKEN_KEY = 'spotify_access_token';
const EXP_KEY = 'spotify_token_expires_in';

export const getSpotifyToken = async (): Promise<string> => {
  const token = localStorage.getItem(TOKEN_KEY);
  const exp = localStorage.getItem(EXP_KEY);
  if (token && exp && Date.now() < parseInt(exp, 10) - 60_000) {
    return token;
  }
  return spotifyToken();
};

const spotifyToken = async (): Promise<string> => {
  const clientId = process.env.SPOTIFY_API_TOKEN;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId ?? '');
  params.append('client_secret', clientSecret ?? '');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    localStorage.setItem('spotify_access_token', response.data.access_token);
    localStorage.setItem(
      'spotify_token_expires_in',
      (Date.now() + response.data.expires_in * 1000).toString(),
    );
    return response.data.access_token;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};
