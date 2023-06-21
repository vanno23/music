import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SingleItem.scss';

const SingleItem = ({ item, itemRelease_date, page, handleSaveData }: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getImageUrl = () => {
    const desiredImageIndex = windowWidth <= 600 ? 1 : 0; // Choose index based on window width
    return item.images?.[desiredImageIndex]?.url || item?.album?.images?.[desiredImageIndex]?.url;
  };

  const getArtistName = () => {
    if (page === 'album' || page === 'track') {
      return itemRelease_date.slice(0, 4);
    } else if (page === 'genre' && item.description.length > 0) {
      return item.description;
    } else if(page === 'genre' && item.description.length === 0) {
      return 'by ' + item.owner.display_name;
		} else if (page === 'artist' || page === 'searchArtist' && item.artists) {
      return item.artists[0].name;
    } else {
      return item.type;
    }
  };


  return (
    <Link to={`/${item.type}/${item.id}`} className='singleItemLink' onClick={page === 'searchArtist' ? () => handleSaveData(item.type, item.id) : undefined}>
      <div className='singleItem'>
        <div className={`singleItemBg ${item.artists || page === 'playlist' ? '' : 'artists'}`} style={{ backgroundImage: `url(${getImageUrl()})` }}></div>
        <h3>{item.name}</h3>
        <div className='album_type'>
        <h5 className={`artistName ${page === 'genre' ? 'genre' : ''}`}>{getArtistName()}</h5>
          {page === 'track' && <span>{item.album_type}</span>}
        </div>
      </div>
    </Link>
  );
};

export default SingleItem;
