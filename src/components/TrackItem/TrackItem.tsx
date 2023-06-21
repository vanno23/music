import React, { useState, useEffect, useContext } from 'react'
import { IoTriangle } from 'react-icons/io5';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { tracksData } from '../Types/TrackData';
import './TrackItem.scss';
import { SavedDataContext } from '../context/SavedDataContext';
import { useLocation } from 'react-router-dom';

interface SectionItemProps {
  item: tracksData,
  index: number,
  artistName?: string,
  page?: string,
  artist_id?: string,
  addedAt?: any,
  handleSaveData?: (type: string, id: string) => void;
}

const TrackItem = ({ item, index, artistName, page, artist_id, addedAt, handleSaveData }: SectionItemProps) => {
  const [formatDate, setFormatDate] = useState<string>('');
  const { checkSavedData, setCheckSavedData, setSavedData } = useContext(SavedDataContext);
  const [saved, setSaved] = useState<boolean>(false);


  useEffect(() => {
    const formattedDate = new Date(addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setFormatDate(formattedDate);
  }, [addedAt])

  const trackImg = page === 'track' || page === 'playlist' || page === 'searchTrack' || page === 'searchTracks' ? <img src={item?.album?.images?.[2]?.url} alt="" /> : '';

  const artistLink = page === 'album' || page === 'playlist' || page === 'searchTracks' ? <Link className='artistName' to={`/artist/${artist_id}`} onClick={handleSaveData ? () => handleSaveData('artist', item?.artists[0]?.id) : undefined}>{artistName}</Link> : '';
  const searchArtistLink =
    page === 'searchTrack' ? (
      <Link
        className='artistName'
        to={`/artist/${item?.artists[0]?.id}`}
        onClick={handleSaveData ? () => handleSaveData('artist', item?.artists[0]?.id) : undefined}
      >
        {item?.artists[0]?.name}
      </Link>
    ) : '';
  const playlistData = page === 'playlist' ? (
    <>
      <div className='albumName'><p>{item?.album?.name}</p></div>
      <div className='formatDate'><p>{formatDate}</p></div>
    </>
  ) : '';
  const searchTracks = page === 'searchTracks' ? (
    <>
      <div className='albumName'><p>{item?.album?.name}</p></div>
    </>
  ) : '';


  const saveToLocalStorage = () => {
    const artistType = item?.type || item?.type;
    const artistId = item?.id || item?.id;

    // Retrieve existing data from local storage (if any)
    const storedData = localStorage.getItem('saveData');
    const existingData = storedData ? JSON.parse(storedData) : [];

    // Check if the artist data already exists in the array
    const isExisting = existingData.some((item: { type: string | undefined; id: string | undefined; }) => item.type === artistType && item.id === artistId);

    let newData;

    if (isExisting) {
      newData = existingData.filter((item: { type: string | undefined; id: string | undefined; }) => !(item.type === artistType && item.id === artistId));
    } else {
      newData = [...existingData, { type: artistType, id: artistId }];
    }

    // Save the updated array to local storage
    localStorage.setItem('saveData', JSON.stringify(newData));

  };

  const isDataSaved = (id: any, type: any): any => {
    const savedData = JSON.parse(localStorage.getItem('saveData') as string) || [];
    setSaved(savedData.some((item: { id: number; type: string; }) => item.id === id && item.type === type));
    setSavedData(savedData);
    setCheckSavedData(!checkSavedData);
  };

  useEffect(() => {
    const checkIfSaved = (id: string, type: string): boolean => {
      const savedData = JSON.parse(localStorage.getItem('saveData') as string) || [];
      setSavedData(savedData);
      return savedData.some((item: { id: string; type: string }) => item.id === id && item.type === type);
    };

    if (item.id) {
      setSaved(checkIfSaved(item.id, 'track'));
    }
  }, [checkSavedData, item.id]);

  return (
    <div className={`trackItem ${page === 'searchTrack' ? 'searchTrack' : ''}`} key={index}>
      <div className={`aboutTrack ${page === 'playlist' ? 'playlistContainer' : page === 'searchTracks' ? 'searchTracksContainer' : page === 'searchTrack' ? 'searchTrackPage' : ''}`}>
        <div className='startTrackBtn'>
          <p className='index'>{index + 1}</p>
          <button>
            <IoTriangle />
          </button>
        </div>
        <div className='trackName'>
          <div className='trackImage'>
            {trackImg}
            <button >
              <IoTriangle />
            </button>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Link to={`/track/${item?.id}`}
                onClick={handleSaveData ? () => handleSaveData('track', item?.id) : undefined}
              >
                {item?.name}
              </Link>
            </div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {artistLink}
              {searchArtistLink}
            </div>
          </div>
        </div>

        {playlistData}
        {searchTracks}
        <div className='trackTime'>
          <div className='trackFavorite'>
            <button
              onClick={() => isDataSaved(item?.id, item?.type) ? 'saved' : ''}
              className={`heartIcon ${saved ? 'saved' : ''}`}
            >
              <div onClick={saveToLocalStorage}>
              {
                    saved ? <AiFillHeart /> : <AiOutlineHeart />
                  }
              </div>
            </button>
          </div>
          <p className='trackDurarion'>
            {Math.floor(item?.duration_ms / 60000)}:
            {((Math.floor((item?.duration_ms % 60000) / 1000)).toFixed(0)).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrackItem;
