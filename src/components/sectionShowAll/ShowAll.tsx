import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import spotifyApi from '../../api/spotifyApi';
import './ShowAll.scss';
import { Link } from 'react-router-dom';
import SingleItem from '../SingleItem/SingleItem';

interface homeItemsArray {
  url: string;
  name: string;
}

interface homeItemsDataProps {
  id: string;
  name: string;
  images: homeItemsArray[];
  artists: homeItemsArray[];
  type: string,
  page?: string,
}


const ShowAll = ({searchTypeData, page, handleSaveData}: any) => {
  const { genre_id } = useParams();
  const [homeItemsData, setHomeItemsData] = useState<homeItemsDataProps[]>([]);
  
  useEffect(() => {
    const fetchHomeItems = async () => {
      if(genre_id){
        const response = await spotifyApi.getBrowse(`browse/categories/${genre_id}/playlists`);
        setHomeItemsData(response.playlists.items);
      }
    };
    fetchHomeItems();
  }, []);

  return (
    <div className={`showAllSection ${page === 'genre' ? 'genreContainer' : ''}`}>
      {
        searchTypeData ?
        <>
          {searchTypeData?.map((item: any, index: number) => {
            return (
              <SingleItem item={item} page={searchTypeData ? 'searchArtist' : `genre`} key={index} handleSaveData={handleSaveData}/>
            )
          })}
        </> :
        <>
          {homeItemsData?.map((item) => {
            return (
              <SingleItem item={item} page={searchTypeData ? '' : `genre`}/>
            )
          })}
        </>
      }
    </div>
  )
}

export default ShowAll;