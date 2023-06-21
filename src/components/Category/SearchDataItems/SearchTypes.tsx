import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import spotifyApi from '../../../api/spotifyApi';
import ShowAll from '../../sectionShowAll/ShowAll';
import { useNavigate } from 'react-router-dom';
import AlbumTracks from '../../AlbumItem/AlbumTracks/AlbumTracks';

interface SearchTypes {
  searchValue: string;
  handleSaveData?: (type: string, id: string) => void;
}

const SearchTypes = ({ searchValue, handleSaveData }: SearchTypes) => {
  const [searchTypeData, setSearchTypeData] = useState<any>([]);
  const { searchPageValue, searchType } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      let type: string | undefined;
      setIsLoading(true);

      if (searchType === 'playlists') {
        type = 'playlist';
      } else if (searchType === 'albums') {
        type = 'album';
      } else if (searchType === 'tracks') {
        type = 'track';
      } else if (searchType === 'artists') {
        type = 'artist';
      }

      if (type) {
        const responseSearchData = await spotifyApi.getBrowse(
          `search?q=${searchValue}&type=${type}&limit=${limit}&offset=${offset}`
        );
        setSearchTypeData(searchType && [...searchTypeData, ...responseSearchData?.[searchType].items]);
      }

      setIsLoading(false);
    };

    fetchCategory();
  }, [searchValue, searchType, limit, offset]);
  
  useEffect(() => {
    const scrollContainer = document.querySelector('.mainView');
  
    const handleScroll = () => {
      const scrollTop = scrollContainer?.scrollTop;
      const { scrollHeight, clientHeight } = document.documentElement;
  
      if (scrollTop && scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        setLimit(limit + 20);
        setOffset(offset + 20);
      }
    };
  
    

    scrollContainer?.addEventListener('scroll', handleScroll);
  
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  



  useEffect(() => {
    if (searchValue.length === 0) {
      navigate('/search');
    }
  }, [searchValue]);

  return (
    <div>
      {searchType === 'tracks' ? (
        <AlbumTracks
          playlistTracksData={searchTypeData}
          page={'searchTracks'}
          handleSaveData={handleSaveData}
        />
      ) : (
        <ShowAll searchTypeData={searchTypeData} handleSaveData={handleSaveData}
        />
      )}
    </div>
  );
};

export default SearchTypes;
