import React, { useState, useEffect, useContext } from 'react';
import { SaveDataProps } from '../../Types/SavedData';
import { SavedDataContext } from '../../context/SavedDataContext';
import './HeaderLibrary.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import spotifyApi from '../../../api/spotifyApi';
import LibraryData from '../LibraryData/LibraryData';
import { AiOutlineClose } from 'react-icons/ai';
import { LibraryDataProps } from '../../Types/LibraryData';
import LibrarySearchPart from '../LibrarySearchPart/LibrarySearchPart';

interface ButtonProps {
  type: string;
  isActive: boolean;
  onClick: () => void;
}

interface HeaderLibraryProps {
  showHideNavbar: boolean,
  setIsLikedData: React.Dispatch<React.SetStateAction<boolean>>

}

const Button: React.FC<ButtonProps> = ({ type, isActive, onClick }) => (
  <button className={`uniqueButton ${isActive ? 'libraryActiveButton' : ''}`} onClick={onClick}>
    <span>{type}</span>
  </button>
);

const HeaderLibrary = ({showHideNavbar, setIsLikedData}: HeaderLibraryProps) => {
  const { savedData, setSavedData } = useContext(SavedDataContext);
  const [libraryData, setLibraryData] = useState<LibraryDataProps[]>([]);
  const [fullLibraryData, setFullLibraryData] = useState<LibraryDataProps[]>([]);
  const [activeButton, setActiveButton] = useState<string>('');
  const [sortedLibraryData, setSortedLibraryData] = useState<string>('Recents');
  const [librarySearchValue, setLibrarySearchValue] = useState<string>('');
  const uniqueTypes: string[] = Array.from(new Set(savedData.map((item: { type: any; }) => item.type)));

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('saveData') as string) || [];
    setSavedData(savedData);
  }, [])

  useEffect(() => {
    const fetchAlbum = async () => {
      const responses = await Promise.all(savedData.map(async (item: { type: string, id: string }) => {
        return await spotifyApi.getBrowse(`${item.type}s/${item.id}`);
      }));
      if (activeButton) {
        const newLibraryData = responses.reverse().filter((item) => item.type === activeButton.toLowerCase());
        setLibraryData(newLibraryData);
        if (sortedLibraryData === 'Oldest') {
          setLibraryData(newLibraryData.reverse());
        }
        if (librarySearchValue.length > 0) {
          const librarySearchedData = [...newLibraryData].filter((item) =>
          item.name.toLowerCase().includes(librarySearchValue.toLowerCase())
        );
        setLibraryData(librarySearchedData);
        }
      }
      else if (librarySearchValue.length > 0) {
        const librarySearchedData = [...responses.reverse()].filter((item) =>
        item.name.toLowerCase().includes(librarySearchValue.toLowerCase())
        );
        setLibraryData(librarySearchedData);
        if (sortedLibraryData === 'Oldest') {
          setLibraryData(librarySearchedData.reverse());
        }
      }
      else {
        const newResponseData = [...responses.reverse()];
        setLibraryData(newResponseData);
        if (sortedLibraryData === 'Oldest') {
          setLibraryData(newResponseData.reverse());
        }
      }
      setFullLibraryData(responses);
    };
    fetchAlbum();
  }, [savedData]);

  useEffect(() => {
    let sortedData = [...fullLibraryData];

    if (activeButton) {
      sortedData = sortedData.filter((item) => item.type === activeButton.toLowerCase());
    }

    if (sortedLibraryData === 'Oldest') {
      sortedData.reverse();
    }

    const librarySearchedData = sortedData.filter((item) =>
      item.name.toLowerCase().includes(librarySearchValue.toLowerCase())
    );

    setLibraryData(librarySearchedData);
  }, [sortedLibraryData, activeButton, librarySearchValue]);

  useEffect(() => {
    if(fullLibraryData.length > 0) {
      setIsLikedData(true);
    } else {
      setIsLikedData(false);
    }
  }, [libraryData]);


  const getUniqueLibraryData = (type: string) => {
    const newLibraryData = [...fullLibraryData].filter((item) => item.type === type.toLowerCase());
    setLibraryData(newLibraryData);
    setActiveButton(type);
  }

  const DeleteTheSelectedButton = () => {
    setActiveButton('');
    setLibraryData([...fullLibraryData]);
  }

  return (
    <div>
      <div className={`libraryTypes ${showHideNavbar ? '' : 'libraryTypesHide'}`}>

        {activeButton ? (
          <div className='activeButtonHeader'>
            <button className='closeActiveHeader' onClick={DeleteTheSelectedButton}>
              <AiOutlineClose />
            </button>
            <Button type={activeButton} isActive={true} onClick={DeleteTheSelectedButton} />
          </div>
        ) : (
          <Swiper
            spaceBetween={8}
            slidesPerView={'auto'}
          >
            {uniqueTypes.map((type, index) => (
              <SwiperSlide key={index} className='headerLibrarySlide'>
                <Button
                  type={type}
                  isActive={type === activeButton}
                  onClick={() => getUniqueLibraryData(type)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {
        fullLibraryData.length > 0 &&
        <>
          <LibrarySearchPart showHideNavbar={showHideNavbar} sortedLibraryData={sortedLibraryData} setSortedLibraryData={setSortedLibraryData} librarySearchValue={librarySearchValue} setLibrarySearchValue={setLibrarySearchValue} />
          <LibraryData libraryData={libraryData} librarySearchValue={librarySearchValue}/>
        </>
      }
    </div>
  );
};

export default HeaderLibrary;