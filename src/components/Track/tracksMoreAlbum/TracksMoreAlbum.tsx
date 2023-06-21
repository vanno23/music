import React from 'react'
import { artistDataProps } from '../../AlbumItem/AlbumItemType';
import MoreAlbum from '../../AlbumItem/MoreAlbum/MoreAlbum';

const TracksMoreAlbum = (artistData: artistDataProps) => {
  return (
    <>
      <MoreAlbum artistName={artistData?.name} artistId={artistData?.id} title={'Popular Releases by'} api={`artists/${artistData?.id}/albums?include_groups=album,single&limit=20&market=US`} page='track'/>
      <MoreAlbum artistName={artistData?.name} artistId={artistData?.id} title={'Popular Albums by'} api={`artists/${artistData.id}/albums?album_type=album&limit=20`} page='track'/>
      <MoreAlbum artistName={artistData?.name} artistId={artistData?.id} title={'Popular Singles and EPs by'} api={`artists/${artistData.id}/albums?album_type=single&limit=20`} page='track'/>
    </>
  )
}

export default TracksMoreAlbum;