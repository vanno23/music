import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import ShowAll from './components/sectionShowAll/ShowAll';
import Header from './components/Header/Header';
import AlbumSection from './pages/AlbumSection';
import TrackPage from './pages/TrackPage';
import ArtistPage from './pages/ArtistPage';
import PlaylistPage from './pages/PlaylistPage';
import SearchPage from './pages/SearchPage';
import { SavedDataProvider } from './components/context/SavedDataContext';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className='main'>
      <SavedDataProvider>
        <Header />
        <div className='mainView'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/search/:searchPageValue' element={<SearchPage />} />
            <Route path='/search/:searchPageValue/:searchType' element={<SearchPage />} />
            <Route path='/genre/:genre_id' element={<ShowAll page={'genre'} />} />
            <Route path='/album/:album_id' element={<AlbumSection />} />
            <Route path='/track/:track_id' element={<TrackPage />} />
            <Route path='/artist/:artist_id' element={<ArtistPage />} />
            <Route path='/playlist/:playlist_id' element={<PlaylistPage />} />
          </Routes>
          <Footer />
        </div>
      </SavedDataProvider>
    </div>
  );
}

export default App;
