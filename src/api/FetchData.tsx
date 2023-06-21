import fetchAccessToken from './fetchAccessToken';

interface FetchDataProps {
  url?: string;
}

const fetchData = async (url: FetchDataProps): Promise<any> => {
  const accessToken = await fetchAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
    return response.json();

};

export default fetchData;
