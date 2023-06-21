import React, {  useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SingleItem from '../../SingleItem/SingleItem';
import { artistDataProps } from '../../Types/Artist';
import { albumDataProps } from '../../AlbumItem/AlbumItemType';
import { playlistData } from '../../Types/playlistData';
import { calculateSlidesPerView } from '../../calculateSlidesPerView/CalculateSlidesPerView';

interface searchDataItemsProps {
  searchDataItem: (artistDataProps | albumDataProps | playlistData)[],
  title: string,
  handleSaveData: (type: string, id: string) => void;
}
const SearchDataItems = ({searchDataItem, title, handleSaveData}: searchDataItemsProps) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(0);
  const [isData, setIsData] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setSlidesPerView(calculateSlidesPerView(width))
      setIsData(true);
    }
  }, [containerRef.current, searchDataItem]);

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
    <div className="swiper-container" ref={containerRef}>
      {searchDataItem.length>0 && 
        <h2 className='searchDataItemTitle'>{title}</h2>
      }
      <Swiper
        spaceBetween={24}
        slidesPerView={slidesPerView}
      >
        { isData &&
          searchDataItem?.map((item) => {
            return (
              <SwiperSlide key={item.id} className="swiperSlide">
                <SingleItem item={item} page={'searchArtist'} handleSaveData={handleSaveData}/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default SearchDataItems