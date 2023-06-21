import React from 'react'
import apiConfig from './apiCondfig';

const fetchAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiConfig.Client_ID}&client_secret=${apiConfig.Client_SECRET}`
    });
    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }
    const data = await response.json();
    return data.access_token;
};

export default fetchAccessToken;