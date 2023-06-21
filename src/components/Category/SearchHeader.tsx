import React, { useState, useEffect } from 'react';
import './SearchHeader.scss';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

interface SearchHeaderProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  searchValue: string,
}


const searchType: string[] = ['All', 'Artists', 'tracks', 'Playlists', 'Albums'];

const SearchHeader = ({ setSearchValue, searchValue }: SearchHeaderProps) => {

  const [searchTypeItem, setSearchTypeItem] = useState(searchType[0]);
  const navigate = useNavigate();

  const changeSearchTypeItem = (item: string) => {
    setSearchTypeItem(item);
  }

  const emptySearch = () => {
    navigate('/search');
    setSearchValue('')
  }

  useEffect(() => {
    if (searchValue.length === 0) {
      setSearchTypeItem(searchType[0]);
    }
  }, [searchValue])

  return (
    <>
      <div className='searchHeader'>
        <form action="" className='searchForm'>
          <BiSearch className='searchIcon' />
          <input type="text" placeholder='What do you want to listen to?' value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
          {searchValue.length > 0 && <AiOutlineClose className='closeIcon' onClick={() => emptySearch()} />}
        </form>
      </div>
      {searchValue.length > 0 && (
  <div className='searchType'>
    <Swiper spaceBetween={8} slidesPerView={'auto'}>
      {searchType.map((item) => (
        <SwiperSlide key={item} className='searchSlide'>
          <Link to={`/search/${searchValue}${item !== 'All' ? `/${item.toLowerCase()}` : ''}`}>
            <button onClick={() => changeSearchTypeItem(item)} className={`${item === searchTypeItem ? 'activeSearchType' : ''}`}>
              <span>{item}</span>
            </button>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}
    </>
  )
}

export default SearchHeader;