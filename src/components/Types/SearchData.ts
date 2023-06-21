import { albumDataProps } from "../AlbumItem/AlbumItemType";
import { artistDataProps } from "./Artist";
import { playlistData } from "./playlistData";
import { tracksData } from "./TrackData";

export interface searchDataProps {
 
    albums: {items: albumDataProps[]},
    artists: {items: artistDataProps[]},
    playlists: {items: playlistData[]},
    shows: any,
    tracks: {items: tracksData[]},
  
}