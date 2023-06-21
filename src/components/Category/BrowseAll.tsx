import React, { useState, useEffect, useRef } from 'react';
import spotifyApi from '../../api/spotifyApi';
import { browseAllData } from '../Types/BrowseAllData';
import { Link } from 'react-router-dom';
import SearchedHistory from './SearchedHistory';
import { calculateSlidesPerView } from '../calculateSlidesPerView/CalculateSlidesPerView';

const BrowseAll = () => {
  const [categoryData, setCategoryData] = useState<browseAllData []>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(0);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await spotifyApi.getBrowse('browse/categories');
      setCategoryData(response.categories.items);
    }

    fetchCategory();
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setSlidesPerView(calculateSlidesPerView(width))
    }
  }, [containerRef.current]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth: number | undefined = containerRef.current?.clientWidth;
        setSlidesPerView(calculateSlidesPerView(containerWidth))
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [containerRef.current]);

  return (
    <>
      <SearchedHistory />
      <h2 className='categoryTitle'>Browse all</h2>
      <div className='categoryContainer' ref={containerRef} style={{gridTemplateColumns: `repeat(${slidesPerView}, 1fr)`}}>
        {categoryData?.map((item) => {
          const { id, name, icons } = item;
          return (
            <Link to={`/genre/${id}`} key={id}>
              <div className='item'>
                <div style={{ backgroundImage: `url(${icons[0].url})` }} className='backgroundCategory'></div>
                <p className='itemTitle'>{name}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default BrowseAll