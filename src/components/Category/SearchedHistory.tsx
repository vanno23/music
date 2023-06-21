import React, { useState, useEffect } from 'react'
import spotifyApi from '../../api/spotifyApi';
import { SearchedHistoryProps } from '../Types/SearchedHistory';
import MoreAlbum from '../AlbumItem/MoreAlbum/MoreAlbum';

const SearchedHistory = () => {
  const [searchedDataStorage, setSearchedDataStorage] = useState([]);
  const [searchedData, setSearchedData] = useState<SearchedHistoryProps[]>([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('SearchedData') as string) || [];
    setSearchedDataStorage(savedData);
  }, [])

  useEffect(() => {
    const fetchSearchHistory = async () => {
      const responses = await Promise.all(searchedDataStorage.map(async (item: { type: string, id: string }) => {
        return await spotifyApi.getBrowse(`${item.type}s/${item.id}`);
      }));
      setSearchedData([...responses.reverse()]);
    }
    fetchSearchHistory();
  }, [searchedDataStorage])

  return (
    <>
      {
        searchedData.length > 0 ? (
          <div style={{ marginBottom: '.5rem' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Recent searches</h2>
            <MoreAlbum searchedData={searchedData} page='searchedHistory' />
          </div>
        ) : ''
      }
    </>
  )
}

export default SearchedHistory