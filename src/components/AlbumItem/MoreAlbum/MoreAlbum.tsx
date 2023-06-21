import { useEffect, useState, useRef } from "react";
import { artistDataProps, albumDataProps } from "../AlbumItemType";
import spotifyApi from "../../../api/spotifyApi";
import SingleItem from "../../SingleItem/SingleItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import './MoreAlbum.scss';
import { calculateSlidesPerView } from "../../calculateSlidesPerView/CalculateSlidesPerView";
import { SearchedHistoryProps } from "../../Types/SearchedHistory";
interface MoreAlbumProps {
  artistName?: string;
  artistId?: string;
  title?: string;
  api?: string;
  page: string;
  discography?: string;
  searchedData?: SearchedHistoryProps[],
}

const MoreAlbum = ({
  artistName,
  artistId,
  title,
  api,
  page,
  discography,
  searchedData,
}: MoreAlbumProps) => {
  const [moreAlbumData, setMoreAlbumData] = useState<albumDataProps[]>([]);
  const [slidesPerView, setSlidesPerView] = useState<number>(0);
  const [isData, setIsData] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (page === 'track' || page === 'album') {
        const response2 = await spotifyApi.getBrowse(api);
        setMoreAlbumData(response2.items);
      } else if (page === 'artists') {
        const response2 = await spotifyApi.getBrowse(api);
        setMoreAlbumData(response2.artists);
      } else if (page === 'playlist') {
        const response2 = await spotifyApi.getBrowse(api);
        setMoreAlbumData(response2.playlists.items);
      }
    };

    fetchAlbum();
  }, [artistId, discography]);

  useEffect(() => {
    if (page === 'home') {
      const fetchAlbum = async () => {
        if (api === 'browse/new-releases?limit=10') {
          const response2 = await spotifyApi.getBrowse(api);
          setMoreAlbumData(response2.albums.items);
        } else {
          const response2 = await spotifyApi.getBrowse(api);
          setMoreAlbumData(response2.artists.items);
        }
      };

      fetchAlbum();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setSlidesPerView(calculateSlidesPerView(width))
      setIsData(true);
    }
  }, [containerRef.current, moreAlbumData, searchedData]);

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
      {
        <>
          {moreAlbumData.length > 0 || searchedData ? (
            <div className={`moreAlbum ${!searchedData ? 'paddingContainer' : ''}`}>
              {artistName !== 'discography' && !searchedData && (
                <div className="title">
                  <h2 className="title">{title} {artistName}</h2>
                </div>
              )}
              <div className="swiper-container" ref={containerRef}>
                <Swiper spaceBetween={24} slidesPerView={slidesPerView}>
                  {page === 'searchedHistory' ? (
                    isData && searchedData?.map((item) => (
                      <SwiperSlide key={item.id} className="swiperSlide">
                        <SingleItem item={item} page={page} />
                      </SwiperSlide>
                    ))
                  ) : (
                    isData && moreAlbumData.map((item) => (
                      <SwiperSlide key={item.id} className="swiperSlide">
                        <SingleItem item={item} itemRelease_date={item.release_date} page={page} />
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
              </div>
            </div>
          ) : ''}
        </>
      }
    </>
  );
}

export default MoreAlbum;
