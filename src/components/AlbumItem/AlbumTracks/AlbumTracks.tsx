import React, { useEffect, useState } from 'react'
import spotifyApi from '../../../api/spotifyApi';
import { TbClockHour3 } from 'react-icons/tb';
import './AlbumTracks.scss';
import TrackItem from '../../TrackItem/TrackItem';
import { addedAt } from '../../Types/playlistData';
import { tracksData } from '../../Types/TrackData';

interface AlbumTracks {
  artistName?: string | undefined,
  album_id?: string,
  playlist_id?: string,
  page?: string,
  playlistTracksData?: tracksData[],
  addedAt?: addedAt[],
  artist_id?: string,
  handleSaveData?: (type: string, id: string) => void;
}



const AlbumTracks = ({ artistName, album_id, playlist_id, page, playlistTracksData, addedAt, artist_id, handleSaveData }: AlbumTracks) => {
  const [tracksData, setTracksData] = useState<tracksData[]>([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (album_id) {
        const response = await spotifyApi.getBrowse(`albums/${album_id}/tracks`);
        setTracksData(response.items);
      }
    };
    fetchAlbum();
  }, [album_id, playlist_id]);

  return (
    <div className={`trackContainer ${page === 'searchTracks' ? 'searchTracksContainer' : ''}`}>

      <div className={`trackHeaderTitle ${page==='album' ? 'albumPageHeaderTitle' : ''} ${page==='searchTracks' ? 'searchTracksPageHeaderTitle' : ''}`}>
        <div>
          <span>#</span>
        </div>
        <div>
          <p>Title</p>
        </div>
        {
          page === 'playlist' ?
            <>
              <div>
                <p>Album</p>
              </div>
              <div>
                <p>Date Added</p>
              </div>
            </>
            : ''
        }
        {
          page === 'searchTracks' ? 
          <>
          <div>
            <p>Album</p>
          </div>
          </>
          : ''
        }
        
        <div className='clock'>
          <button>
            <TbClockHour3 />
          </button>
        </div>
      </div>
      {
        page === 'playlist' || page === 'searchTracks' ?
        playlistTracksData?.map((item, index) => {
          return (
            <>
              {addedAt ? (
                <TrackItem item={item} index={index} artist_id={item?.artists?.[0]?.id} artistName={item?.artists[0]?.name} page={page} key={index} addedAt={addedAt[index]} />
              ) : 
              <TrackItem item={item} index={index} artist_id={item?.artists?.[0]?.id} artistName={item?.artists[0]?.name} page={page} key={index} handleSaveData={handleSaveData}/>
              }
            </>
          )
        }) :
          tracksData?.map((item, index) => {
            return (
                  <TrackItem item={item} index={index} artistName={artistName} page={page} key={index} artist_id={artist_id} />
            )
          })
      }
    </div>
  )
}

export default AlbumTracks;