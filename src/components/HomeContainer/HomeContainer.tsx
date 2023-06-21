import './HomeContainer.scss';
import MoreAlbum from '../AlbumItem/MoreAlbum/MoreAlbum';

const HomeContainer = () => {
  return (
    <div className='HomeContainer'>
      <div>
        <MoreAlbum artistName='' artistId='' page='home' title='Popular Artists' api='search?q=genre:pop&type=artist&limit=10'/>
      </div>

      <div>
        <MoreAlbum artistName='' artistId='' page='home' title='Popular New Releases' api='browse/new-releases?limit=10'/>
      </div>

      <div>
        <MoreAlbum artistName='' artistId='' page='home' title='Explore Electronic Music' api='search?type=artist&q=genre:electronic&limit=10'/>
      </div>

      <div>
        <MoreAlbum artistName='' artistId='' page='home' title='Popular Rock Bands' api='search?q=genre:rock&type=artist&limit=10'/>
      </div>
    </div>
  )
}

export default HomeContainer