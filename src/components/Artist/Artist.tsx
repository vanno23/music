import React, { useState, useEffect } from 'react';
import './Artist.scss';
import { useParams } from 'react-router-dom';
import spotifyApi from '../../api/spotifyApi';
import { artistDataProps } from '../Types/Artist';
import SeactionHeader from '../SectionHeader/SectionHeader';
import PopularTracksByArtist from '../Track/PopularTracksByArtist/PopularTracksByArtist';
import ArtistMoreAlbum from './ArtistMoreAlbum/ArtistMoreAlbum';

const Artist = () => {
  const [artistData, setArtistData] = useState<artistDataProps>();
  const [showMore, setShowMore] = useState<boolean>(false);

  const { artist_id } = useParams();
  useEffect(() => {
    const fetchArtisData = async () => {
      const artistResponse = await spotifyApi.getBrowse(`artists/${artist_id}`);
      setArtistData(artistResponse);
    }

    fetchArtisData();
    const container : Element | null = document.querySelector('.mainView');
    if (container) {
      container.scrollTop = 0;
    }
  }, [artist_id])

  return (
    <div className='artist'>
      <SeactionHeader artistData={artistData} page='artist' />
      <div className='PopularTracksMg'>
        <PopularTracksByArtist popularTracks={artistData?.id} artistName={artistData?.name} showMore={showMore} setShowMore={setShowMore} page='artist'/>
      </div>
      { artistData && <ArtistMoreAlbum {...artistData}/>}
      </div>
  )
}

export default Artist;