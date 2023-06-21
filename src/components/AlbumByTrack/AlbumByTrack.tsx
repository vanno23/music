import React, { useState, useEffect } from 'react';
import spotifyApi from '../../api/spotifyApi';
import { tracksData } from '../Types/TrackData';
import TrackItem from '../TrackItem/TrackItem';
import './AlbumByTrack.scss';
import { albumDataProps } from '../AlbumItem/AlbumItemType';
import { Link } from 'react-router-dom';

const AlbumByTrack = ({album_id, artistName, artist_id} : any) => {
  const [tracksData, setTracksData] = useState<tracksData []>([]);
  const [albumData, setAlbumData] = useState<albumDataProps>();
  useEffect(() => {
    if(album_id){
      const fetchAlbum = async () => {
        const response = await spotifyApi.getBrowse(`albums/${album_id}`);
        setTracksData(response.tracks.items);
        setAlbumData(response);
      };
      fetchAlbum();
    }
  }, [album_id])


  return (
    <div className='albumByTrack'>
      <Link to={`/album/${albumData?.id}`}>
        <div className='albumByTrackHeader'>
          <img src={albumData?.images[1].url} alt="" />
          <div>
            <p>From The album</p>
            <h4>{albumData?.name}</h4>
          </div>
        </div>
      </Link>
      {
        tracksData?.map((item, index) => {
          return (
            <TrackItem artist_id={artist_id} item={item} index={index} artistName={artistName} page={'album'} key={index}/>
          )
        })
      }
    </div>
  )
}

export default AlbumByTrack