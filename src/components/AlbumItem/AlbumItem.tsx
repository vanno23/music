import React, { useEffect, useState } from 'react';
import spotifyApi from '../../api/spotifyApi';
import { useParams } from 'react-router-dom';
import './AlbumItem.scss';
import AlbumTracks from './AlbumTracks/AlbumTracks';
import { albumDataProps } from './AlbumItemType';
import { artistDataProps } from '../Types/Artist';
import MoreAlbum from './MoreAlbum/MoreAlbum';
import CopyRight from './CopyRight/CopyRight';
import SeactionHeader from '../SectionHeader/SectionHeader';

const AlbumItem = () => {
  const [albumData, setAlbumData] = useState<albumDataProps>();
  const [artistData, setArtistData] = useState<artistDataProps>();
  const [totalDuration, setTotalDuration] = useState({minutes: 0, seconds: 0});

  const { album_id } = useParams();
  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await spotifyApi.getBrowse(`albums/${album_id}`);
      setAlbumData(response);
      const artistResponse = await spotifyApi.getBrowse(`artists/${response.artists[0].id}`);
      setArtistData(artistResponse);

    };
    fetchAlbum();

    const container : Element | null = document.querySelector('.mainView');
    if (container) {
      container.scrollTop = 0;
    }
  }, [album_id]);

  useEffect(() => {
    let totalDuration = albumData?.tracks.items.reduce(
      (total, track) => total + track.duration_ms, 0
    ) || 0;

    const minutes = Math.floor(totalDuration / 60000);
    const seconds = parseInt((Math.floor((totalDuration % 60000) / 1000)).toFixed(0));
    setTotalDuration({ minutes, seconds });

  }, [albumData]);


  return (
    <div className='albumItem'>
      <SeactionHeader Data={albumData} artistData={artistData} totalDuration={totalDuration} page='album'/>
      <AlbumTracks artistName={artistData?.name} album_id={album_id} page='album' artist_id={artistData?.id}/>
      
      
      {albumData?.copyrights && <CopyRight copyrights={albumData?.copyrights} release_date={albumData?.release_date}/>}
      {artistData && <MoreAlbum artistName={artistData?.name} artistId={artistData?.id} title={'More by'} api={`artists/${artistData?.id}/albums`} page={'album'}/>}

    </div>
  );
};

export default AlbumItem;

