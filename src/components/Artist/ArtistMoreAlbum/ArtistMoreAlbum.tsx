import React, { useState, useEffect } from 'react';
import MoreAlbum from '../../AlbumItem/MoreAlbum/MoreAlbum';
import { artistDataProps } from '../../Types/Artist';
import './ArtistMoreAlbum.scss';

const ArtistMoreAlbum = (artistData: artistDataProps) => {
  const discographyParams = {  
    popular: `artists/${artistData.id}/albums?album_type=album,single&limit=20&market=US`,
    albums: `artists/${artistData.id}/albums?album_type=album&limit=20`,
    singles_and_eps: `artists/${artistData.id}/albums?album_type=single&limit=20`,
  }
  const [discography, setDiscography] = useState<string>(discographyParams.popular);

  useEffect(() => {
    setDiscography(discographyParams.popular);
  }, [artistData.id])

  return (
    <div className='ArtistMoreAlbum'>
      <div className='discography'>
        <h2>Discography</h2>
        <div className='discographyBtns'>
          <button className={`${discography === discographyParams.popular ? 'active' : ''}`} onClick={() => setDiscography(discographyParams.popular)}>Popular releases</button>
          <button className={`${discography === discographyParams.albums ? 'active' : ''}`} onClick={() => setDiscography(discographyParams.albums)}>Albums</button>
          <button className={`${discography === discographyParams.singles_and_eps ? 'active' : ''}`} onClick={() => setDiscography(discographyParams.singles_and_eps)}>Singles and EPs</button>
        </div>
      </div>
      <MoreAlbum artistName='discography' discography={discography} artistId={artistData?.id} api={discography} page='track' />
      <MoreAlbum artistName='Fans also like' artistId={artistData?.id} api={`artists/${artistData?.id}/related-artists`} page='artists'/>
      <MoreAlbum artistName='Appears On' artistId={artistData?.id} api={`artists/${artistData.id}/albums?album_type=appears_on&market=US&limit=10`} page='track'/>
      <MoreAlbum artistName='Artist Playlists' artistId={artistData?.id} api={`search?type=playlist&q=${encodeURIComponent(artistData?.name)}&limit=20`} page='playlist'/>
    </div>
  );
};

export default ArtistMoreAlbum;