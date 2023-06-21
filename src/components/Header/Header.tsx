import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { TiHomeOutline, TiHome } from 'react-icons/ti';
import { BiSearch, BiSearchAlt, BiArrowToRight } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import HeaderLibrary from './headerLibrary/HeaderLibrary';

const Header = () => {
  const [homeIcon, setHomeIcon] = useState<boolean>(false);
  const [searchIcon, setSearchIcon] = useState<boolean>(false);
  const [showHideNavbar, setShowHideNavbar] = useState<boolean>(false);
  const [isLikedData, setIsLikedData] = useState<boolean>(false);


  const location = useLocation();

  useEffect(() => {
    setHomeIcon(location.pathname === '/');
    setSearchIcon(location.pathname.startsWith('/search'));

  }, [location.pathname]);

  return (
    <div className='navHeader'>
      <nav className={`nav ${showHideNavbar ? 'showNav' : 'hideNav'}`}>
        <ul className='navUl'>
          <li className='show-hide-navbar'>
            <button className={`icon`} onClick={() => setShowHideNavbar(!showHideNavbar)}>
              <BiArrowToRight />
            </button>
          </li>
          <li>
            <Link to='/' className={`${homeIcon ? 'iconTrue' : ''}`}>
              <button className='icon'>
                <span>
                  {
                    homeIcon ?
                      <TiHome /> :
                      <TiHomeOutline />
                  }
                </span>
              </button>
              <span className='navUlTitle'>Home</span>
            </Link>
          </li>
          <li>
            <Link to='/search' className={`${searchIcon ? 'iconTrue' : ''}`}>
              <button className='icon'>
                <span>
                  {
                    searchIcon ?
                      <BiSearchAlt className='iconTrue' /> :
                      <BiSearch />
                  }
                </span>
              </button>
              <span className='navUlTitle'>Search</span>
            </Link>
          </li>
        </ul>
        <div className='headerLibrary'>
          <HeaderLibrary showHideNavbar={showHideNavbar} setIsLikedData={setIsLikedData} />
          {
            isLikedData === false ? (
            
              <>
                <div className='findSongs'>
                  <div className='findSongsHeader'>
                    <p>Let's find some artists to follow</p>
                    <p>We'll keep you updated on new artists</p>
                  </div>
                  <div className='findSongsLink'>
                    <Link to='/search'>
                      Browse Artists
                    </Link>
                  </div>
                </div>
              </>
            ) : ''
          }
        </div>
      </nav>
    </div>
  )
}

export default Header