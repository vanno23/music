import React, { useState, useEffect, useContext } from 'react';
import ColorThief from 'colorthief';
import { albumDataProps } from '../AlbumItem/AlbumItemType';
import { artistDataProps } from '../Types/Artist';
import './SectionHeader.scss';
import { IoTriangle } from 'react-icons/io5';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SavedDataContext } from '../context/SavedDataContext';

interface SectionHeaderProps {
  Data?: albumDataProps | undefined,
  artistData: artistDataProps | undefined,
  duration_ms?: number,
  totalDuration?: { minutes?: number, seconds?: number },
  page: string,
}

const SectionHeader = ({ Data, artistData, totalDuration, duration_ms, page }: SectionHeaderProps) => {
  const [bgColor, setBgColor] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const { track_id, album_id, playlist_id, artist_id } = useParams();
  
  const { checkSavedData, setCheckSavedData, setSavedData } = useContext(SavedDataContext);

  const [windowWidth, setWindowWidth] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth <= 600){
        setWindowWidth(false);
      } else {
        setWindowWidth(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', () => {
      const color = colorThief.getColor(img);
      const bgColor = `rgb(${color.join(',')})`;
      setBgColor(bgColor);
    });
    if (page === 'artist' || page === 'playlist') {
      img.src = artistData?.images[1]?.url || artistData?.images[0]?.url || '';
    } else {
      img.src = Data?.images ? Data?.images[1]?.url : Data?.album.images[1]?.url || '';
    }
    if(window.innerWidth <= 600){
      setWindowWidth(false);
    } else {
      setWindowWidth(true);
    }
  }, [Data?.images || Data?.album.images || artistData?.images]);

  const saveToLocalStorage = () => {
    const artistType = Data?.type || artistData?.type;
    const artistId = Data?.id || artistData?.id;

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

    if (track_id) {
      setSaved(checkIfSaved(track_id, 'track'));
    } else if (album_id) {
      setSaved(checkIfSaved(album_id, 'album'));
    } else if (playlist_id) {
      setSaved(checkIfSaved(playlist_id, 'playlist'));
    } else if (artist_id) {
      setSaved(checkIfSaved(artist_id, 'artist'));
    }

  }, [track_id, album_id, playlist_id, artist_id, checkSavedData]);

  return (
    <>
      {
        page === 'artist' && (
          <div className='sectionHeader'
            style={{ backgroundColor: bgColor }}
          >
            <div className='albumImg'>
              <img className='artistImg' src={artistData?.images[0]?.url} alt='' />
            </div>
            <div className='aboutAlbum'>
              <p className='albumType'>{Data?.type}</p>
              <h1 className='albumName'>{artistData?.name}</h1>
              <p className='followers'>Followers: {artistData?.followers.total.toLocaleString()}</p>
            </div>
          </div>
        )
      }
      {
        page === 'album' && (
          <div className='sectionHeader'
            style={{ backgroundColor: bgColor }}
          >
            <div className='albumImg'>
              <img src={Data?.images[1]?.url} alt='' />
            </div>
            <div className='aboutAlbum'>
              <p className='albumType'>{Data?.type}</p>
              <h1 className='albumName'>{Data?.name}</h1>
              <div className='headerDetails'>
                <img className='artistImg' src={artistData?.images[0]?.url} alt='' />
                <Link className='artistName' to={`/${artistData?.type}/${artistData?.id}`}>{artistData?.name}</Link>
                <span>{page === 'album' ? Data?.release_date.slice(0, 4) : Data?.album.release_date.slice(0, 4)}</span>
                <span>{Data?.total_tracks} songs</span>
                {windowWidth && (
                  <p className='duration'>, {totalDuration?.minutes} min {totalDuration?.seconds} sec</p>
                  )
                }
              </div>
            </div>
          </div>
        )
      }

      {
        page === 'track' && (
          <div className='sectionHeader'
            style={{ backgroundColor: bgColor }}
          >
            <div className='albumImg'>
              <img src={Data?.album.images[1]?.url} alt='' />
            </div>
            <div className='aboutAlbum'>
              <p className='albumType'>{Data?.type}</p>
              <h1 className='albumName'>{Data?.name}</h1>
              <div className='headerDetails'>

                <img className='artistImg' src={artistData?.images[0]?.url} alt='' />
                <Link className='artistName' to={`/${artistData?.type}/${artistData?.id}`}>{artistData?.name}</Link>
                <span>{Data?.album.release_date.slice(0, 4)}</span>

                  <span>
                    {duration_ms && (
                      <>
                        {Math.floor(duration_ms / 60000)}:
                        {((Math.floor((duration_ms % 60000) / 1000)).toFixed(0)).padStart(2, '0')}
                      </>
                    )}
                  </span>

              </div>
            </div>
          </div>
        )
      }

      {
        page === 'playlist' && (
          <div className='sectionHeader'
            style={{ backgroundColor: bgColor }}
          >
            <div className='albumImg'>
              <img src={artistData?.images?.[0]?.url} alt='' />
            </div>
            <div className='aboutAlbum'>
              <p className='albumType'>{artistData?.type}</p>
              <h1 className='albumName'>{artistData?.name}</h1>
              <div className='headerDetails'>

                <img className='artistImg' src={artistData?.images?.[0]?.url} alt='' />
                <Link className='artistName' to={`/${artistData?.type}/${artistData?.id}`}>{artistData?.owner?.display_name}</Link>
                <span> {`${artistData?.followers.total.toLocaleString()}`} likes</span>
                <span>{artistData?.tracks?.total} songs</span>
              </div>
            </div>
          </div>
        )
      }



      <div className='trackHeader'>
        <div className='startAlbum'>
          <button>
            <IoTriangle />
          </button>
        </div>
        {
          page === 'artist' ?
            <button className='followBtn'
              onClick={() => isDataSaved(Data?.id || artistData?.id, Data?.type || artistData?.type) ? 'saved' : ''}
            >
              <div
                onClick={saveToLocalStorage}
              >
                <p>
                  {
                    saved ? 'following' : 'follow'
                  }
                </p>
              </div>
            </button>
            : <div className='albumFavorite'>
              <button
                onClick={() => isDataSaved(Data?.id || artistData?.id, Data?.type || artistData?.type) ? 'saved' : ''}
                className={`heartIcon ${saved ? 'saved' : ''}`}
              >
                <div onClick={saveToLocalStorage} className='headrtIcons'>
                  {
                    saved ? <AiFillHeart /> : <AiOutlineHeart />
                  }
                </div>

              </button>
            </div>
        }

      </div>

      <div className='albumTrack'>
        <div style={{ background: bgColor }} className='albumTrackHeader'></div>
      </div>

      {
        page === 'track' ? (
          <div className='trackArtistContainer'>
            <Link to={`/${artistData?.type}/${artistData?.id}`} className='trackArtist'>
              <img src={artistData?.images[1]?.url} alt="" />
              <div>
                <p>{artistData?.type}</p>
                <p className='trackArtistName'>{artistData?.name}</p>
              </div>
            </Link>
          </div>
        ) : ''
      }

    </>
  )
}

export default SectionHeader;