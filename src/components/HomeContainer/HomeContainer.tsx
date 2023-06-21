import './HomeContainer.scss';
import MoreAlbum from '../AlbumItem/MoreAlbum/MoreAlbum';

const HomeContainer = () => {
  return (
    <div className='HomeContainer'>
      <div>
        {/* <div className='homeItemHeader'>
          <h2>Popular Artists</h2>
          <Link to='/section/popular_artist'>Show All</Link>
        </div> */}
        <MoreAlbum artistName='' artistId='' page='home' title='Popular Artists' api='search?q=genre:pop&type=artist&limit=10'/>
      </div>

      <div>
        {/* <div className='homeItemHeader'>
          <h2>Popular New Releases</h2>
          <Link to='/section/new_releases'>Show All</Link>
        </div> */}
        <MoreAlbum artistName='' artistId='' page='home' title='Popular New Releases' api='browse/new-releases?limit=10'/>
      </div>

      <div>
        {/* <div className='homeItemHeader'>
          <Link to='/section/electronic_music'>Show All</Link>
        </div> */}
        <MoreAlbum artistName='' artistId='' page='home' title='Explore Electronic Music' api='search?type=artist&q=genre:electronic&limit=10'/>
      </div>

      <div>
        {/* <div className='homeItemHeader'>
          <h2>Popular Rock Bands</h2>
          <Link to='/section/rock_bands'>Show All</Link>
        </div> */}
        <MoreAlbum artistName='' artistId='' page='home' title='Popular Rock Bands' api='search?q=genre:rock&type=artist&limit=10'/>
      </div>
    </div>
  )
}

export default HomeContainer