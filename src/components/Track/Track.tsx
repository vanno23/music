import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import spotifyApi from '../../api/spotifyApi';
import SeactionHeader from '../SectionHeader/SectionHeader';
import { albumDataProps } from '../AlbumItem/AlbumItemType';
import { artistDataProps } from '../Types/Artist';
import PopularTracksByArtist from './PopularTracksByArtist/PopularTracksByArtist';
import './Track.scss';
import AlbumByTrack from '../AlbumByTrack/AlbumByTrack';
import TracksMoreAlbum from './tracksMoreAlbum/TracksMoreAlbum';

const Track = () => {
  const { track_id } = useParams();
  const [singleTracksData, setSingleTracksData] = useState<albumDataProps>();
  const [artistData, setArtistData] = useState<artistDataProps>();
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await spotifyApi.getBrowse(`tracks/${track_id}`);
      setSingleTracksData(response);
      const artistResponse = await spotifyApi.getBrowse(`artists/${response.artists[0].id}`);
      setArtistData(artistResponse);
    };
    fetchAlbum();

    
    const container : Element | null = document.querySelector('.mainView');
    if (container) {
      container.scrollTop = 0;
    }
    setShowMore(false);
  }, [track_id]);

  return (
    <div className='track'>
      <SeactionHeader Data={singleTracksData} artistData={artistData} duration_ms={singleTracksData?.duration_ms} page='track'/>
      <PopularTracksByArtist popularTracks={artistData?.id} artistName={artistData?.name} showMore={showMore} setShowMore={setShowMore} page='track'/>
      {artistData && <TracksMoreAlbum {...artistData}/>}
      <AlbumByTrack artist_id={artistData?.id} album_id={singleTracksData?.album.id} artistName={artistData?.name}/>
    </div>
  )
}

export default Track;