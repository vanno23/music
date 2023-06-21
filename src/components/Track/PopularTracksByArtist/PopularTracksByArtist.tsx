import React, { useEffect, useState } from 'react'
import spotifyApi from '../../../api/spotifyApi';
import './PopularTracksByArtist.scss'
import { tracksData } from '../../Types/TrackData';
import TrackItem from '../../TrackItem/TrackItem';

interface PopularTracksByArtistProps {
  popularTracks: string | undefined,
  artistName: string | undefined,
  showMore: boolean,
  page: string,
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>,
}

const PopularTracksByArtist = ({popularTracks, artistName, showMore, setShowMore, page}: PopularTracksByArtistProps) => {
  const [popularTracksItem, setPopularTracksItem] = useState<tracksData[]>([]);


  useEffect(() => {
    const fetchAlbum = async () => {
      if(popularTracks){
        const popularTracksresponse = await spotifyApi.getBrowse(`artists/${popularTracks}/top-tracks?market=US`);
        setPopularTracksItem(popularTracksresponse.tracks);
      }
    };
    fetchAlbum();
  }, [popularTracks]);

  return (
    <div className={`popularTracksContainer ${page === 'artist' ? 'pageArtist' : ''}`}>
      <div className='popularTracksHeader'>
        {
          page === 'artist' ? 
          <h2 className='artistPopular'>Popular</h2>
          :
          <>
            <h5>Popular Tracks by</h5>
            <h2>{artistName}</h2>
          </>
        }
      </div>
      <div className='popularTracksItem'>
        {
          popularTracksItem.slice(0, showMore ? 10 : 5).map((item, index) => {
            return (
              <TrackItem item={item} index={index} artistName={artistName} page={'track'} key={index}/>
            )
          })
        }
      </div>
      <button onClick={() => setShowMore(!showMore)} className='toggleItem'>{showMore ? 'Show less' : 'See more'}</button>
    </div>
  )
}

export default PopularTracksByArtist;