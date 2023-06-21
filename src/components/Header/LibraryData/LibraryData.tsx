import React, { useEffect, useState } from 'react';
import { LibraryDataProps } from '../../Types/LibraryData';
import './LibraryData.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface libraryDataPageProps {
  libraryData: LibraryDataProps[],
  librarySearchValue: string,
}

const LibraryData = ({ libraryData, librarySearchValue }: libraryDataPageProps) => {
  const location = useLocation();
  
  return (
    <div className='libraryData'>
      {libraryData.map((item) => {
        const searchString = librarySearchValue.toLowerCase();
        const regex = new RegExp(searchString, 'gi');
        const matchedName = item.name.replace(regex, match => {
          return `<mark class="searchedLetter">${match}</mark>`;
        });

        return (
          <Link to={`${item.type}/${item.id}`} key={item.id}>
            <div className={`libraryDataItem ${location.pathname === `/${item.type}/${item.id}` ? 'activeLibraryDataItem' : ''}`}>
              <div className='libraryDataImg'>
                <img className={`${item.type === 'artist' ? 'libraryArtistImg' : ''}`} src={item?.images?.[0]?.url || item?.album?.images?.[0]?.url} alt="" />
              </div>
              <div className='libraryDataDetails'>
                <h5 className="libraryDataName" dangerouslySetInnerHTML={{ __html: matchedName }} />

                <span className='libraryDataType'>{item.type}</span>
                {
                  item.type === 'album' ?
                    <span className='libraryDataArtistName'>
                      {item?.artists?.[0]?.name}
                    </span>
                    : item.type === 'playlist' ?
                      <span className='libraryDataArtistName'>
                        {item?.owner?.display_name}
                      </span>
                      : ''
                }
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default LibraryData;
