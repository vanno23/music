import React, { useState, useEffect, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import './LibrarySearchPart.scss';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { RiArrowUpSFill } from 'react-icons/ri';

interface LibrarySearchPartProps {
  librarySearchValue: string;
  sortedLibraryData: string;
  setSortedLibraryData: React.Dispatch<React.SetStateAction<string>>;
  setLibrarySearchValue: React.Dispatch<React.SetStateAction<string>>;
  showHideNavbar: boolean,
}

const LibrarySearchPart = ({ showHideNavbar, sortedLibraryData, setSortedLibraryData, librarySearchValue, setLibrarySearchValue }: LibrarySearchPartProps) => {
  const [activeSearchButton, setActiveSearchButton] = useState<boolean>(false);
  const sortedLibrartArray: string [] = ['Recents','Oldest'];
  const [activeSortedLibraryData, setActiveSortedLibraryData] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (
        !target.closest('.librarySearchInput') &&
        librarySearchValue.length === 0 &&
        !target.closest('.LibrarySearchButton') &&
        !target.closest('.deleteSearchValue')
      ) {
        setActiveSearchButton(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [librarySearchValue]);

  
  const handleSearchClick = () => {
    setActiveSearchButton(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCloseClick = () => {
    setLibrarySearchValue('');
    setSortedLibraryData('Recents');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const sortedLibraryButton = (item: string) => {
    setSortedLibraryData(item);
    setActiveSortedLibraryData(false);
  }

  useEffect(() => {
    if(activeSortedLibraryData) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!event.target) return;
        const target = event.target as HTMLElement;
        if (!target.closest('.sortedLibrary')) {
          setActiveSortedLibraryData(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [activeSortedLibraryData])

  return (
    <div className={`LibrarySearchPart ${showHideNavbar ? '' : 'LibrarySearchPartHide'}`}>
      <div className={`LibrarySearchHeader ${activeSearchButton ? 'activeSearch' : ''}`}>
        <input
          className='librarySearchInput'
          ref={inputRef}
          type="text"
          placeholder='Search in Your Library'
          value={librarySearchValue}
          onChange={(e) => setLibrarySearchValue(e.target.value)}
        />

        <button className={`LibrarySearchButton`} onClick={handleSearchClick}>
          <BiSearch />
        </button>
        <button className={`deleteSearchValue ${librarySearchValue.length > 0 ? 'activeDeleteSearchValue' : ''}`} onClick={handleCloseClick}>
          <AiOutlineClose />
        </button>
      </div>

      <div className='sortedLibrary'>
        <div className='sortedLibraryHeader' onClick={() => setActiveSortedLibraryData(!activeSortedLibraryData)}>
          <span>
            {sortedLibraryData}
          </span>
            <RiArrowUpSFill className={`sortedLibraryIcon ${activeSortedLibraryData ? 'activeSortedLibraryIcon' : ''}`}/>
        </div>
        <div className={`sortedLibraryData ${activeSortedLibraryData ? 'activeSortedLibraryData' : ''}`}>
          <ul>
            <li className='sortedLibraryDataTitle'>Sort by</li>
            {
              sortedLibrartArray.map((item, index) => {
                return(
                  <li key={index} className={`${item === sortedLibraryData ? 'activeSortedLibraryButton' : ''}`}>
                    <button onClick={() => sortedLibraryButton(item)}>
                      {item}
                      {
                        item === sortedLibraryData ?
                        <AiOutlineCheck className='sortedLibraryCheckIcon'/>
                        : ''
                      }
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LibrarySearchPart;
