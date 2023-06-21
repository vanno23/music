import React, { useState, useEffect } from 'react';
import './Playlist.scss';
import AlbumTracks from '../AlbumItem/AlbumTracks/AlbumTracks';
import { useParams } from 'react-router-dom';
import SeactionHeader from '../SectionHeader/SectionHeader';
import spotifyApi from '../../api/spotifyApi';
import { tracksData } from '../Types/TrackData';
import { addedAt } from '../Types/playlistData';
import { artistDataProps } from '../Types/Artist';

const Playlist = () => {
  const { playlist_id } = useParams();

  const [playlistData, setPlaylistData] = useState<artistDataProps>();
  const [tracksData, setTracksData] = useState<tracksData[]>([]);
  const [addedAt, setAddedAt] = useState<addedAt []>([]);

  useEffect(() => {
    if (playlist_id) {
      const fetchPlaylist = async () => {
        const playlistResponse = await spotifyApi.getBrowse(`playlists/${playlist_id}`);
        setPlaylistData(playlistResponse);
        // fetchplaylistData
        const trackResponse = await spotifyApi.getBrowse(`playlists/${playlist_id}/tracks`);
        const added_at = trackResponse.items.map((item: any) => item.added_at);
        setAddedAt(added_at)
        const tracks = trackResponse.items.map((item: any) => item.track);
        setTracksData(tracks);
      }
      fetchPlaylist();
    }
  }, [playlist_id])
  

  return (
    <div className='playlistPage'>
      <SeactionHeader artistData={playlistData} page={'playlist'}/>
      <AlbumTracks playlistTracksData={tracksData} addedAt={addedAt} page={'playlist'}/>
    </div>
  )
}

export default Playlist