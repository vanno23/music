import React, { useEffect, useState } from 'react'
import spotifyApi from '../../api/spotifyApi';
import './Category.scss'
import SearchHeader from './SearchHeader';
import BrowseAll from './BrowseAll';
import SearchData from './SearchData';
import { searchDataProps } from '../Types/SearchData';
import SearchTypes from './SearchDataItems/SearchTypes';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Category = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchData, setSearchData] = useState<any>([]);
  const [locationPath, setLocationPath] = useState<string>('');

  const { searchPageValue, searchType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategory = async () => {
      if (searchValue) {
        const responseSearchData = await spotifyApi.getBrowse(`search?q=${searchValue}&type=album,artist,playlist,track,show&limit=10`);
        setSearchData(responseSearchData);
      }
    }

    fetchCategory();

    if (searchValue) {
      navigate(`/search/${searchValue}`, { replace: true });
    } else {
      navigate('/search');
    }
  }, [searchValue])

  useEffect(() => {
    const decodedPath = decodeURIComponent(location.pathname.replace(/%20/g, ' '));
    setLocationPath(decodedPath);

    //When click the search page the value of searchValue's length should be 0.
    if (location.pathname === '/search') {
      setSearchValue('');
    }

  }, [location.pathname]);

  useEffect(() => {
    if (searchValue && searchType) {
      navigate(`/search/${searchValue}/${searchType}`, { replace: true });
    }
  }, [searchValue, searchType]);

  const handleSaveData = (type: string, id: string) => {
    const searchedData = localStorage.getItem('SearchedData');
    let existingData = searchedData ? JSON.parse(searchedData) : [];
  
    // Check if the item already exists in the array
    const existingIndex = existingData.findIndex(
      (item: { type: string; id: string }) => item.type === type && item.id === id
    );
  
    if (existingIndex !== -1) {
      // Delete the existing item
      existingData.splice(existingIndex, 1);
    }
  
    // Add the new item
    const newData = { type, id };
    existingData.push(newData);
    localStorage.setItem('SearchedData', JSON.stringify(existingData));
  };
  

  return (

    <div className='category'>
      <SearchHeader setSearchValue={setSearchValue} searchValue={searchValue} />
      {
        locationPath === '/search' ? <BrowseAll /> :
          locationPath === `/search/${searchPageValue}` ? <SearchData searchData={searchData} handleSaveData={handleSaveData}/> :
            locationPath === `/search/${searchPageValue}/${searchType}` ? <SearchTypes searchValue={searchValue} handleSaveData={handleSaveData}/> :
              ''
      }
    </div>
  )
}



export default Category;