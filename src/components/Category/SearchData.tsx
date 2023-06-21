import React, { useState } from 'react'
import Topresult from './SearchDataItems/Topresult'
import { searchDataProps } from '../Types/SearchData';
import './SearchData.scss';
import TrackItem from '../TrackItem/TrackItem';
import SearchDataItems from './SearchDataItems/SearchDataItems';
import SearchNoResult from './SearchNoResult';


interface SearchDataProps {
  searchData: searchDataProps,
  handleSaveData: (type: string, id: string) => void;
}
const SearchData = ({ searchData, handleSaveData }: SearchDataProps) => {
  return (
    <>
      {
        searchData?.artists?.items.length>0  ? (
          <div className='searchData'>
            <div className='topresult_songs'>
              <Topresult topResult={searchData?.artists?.items[0]} handleSaveData={handleSaveData} />
              <div className='searchDataSong'>
                <h2 className='searchDataSongTitle'>Songs</h2>
                {
                  searchData?.tracks?.items.slice(0, 4).map((item, index) => {
                    return (
                      <TrackItem item={item} index={index} artistName={item.name} page={'searchTrack'} key={index} handleSaveData={handleSaveData} />
                    )
                  })
                }
              </div>
            </div>

            <SearchDataItems searchDataItem={searchData?.artists?.items} title='Artists' handleSaveData={handleSaveData} />
            <SearchDataItems searchDataItem={searchData?.albums?.items} title='Albums' handleSaveData={handleSaveData} />
            <SearchDataItems searchDataItem={searchData?.playlists?.items} title='Playlist' handleSaveData={handleSaveData} />

          </div>
        ) : <SearchNoResult />
      }
    </>
  )
}

export default SearchData