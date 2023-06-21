import React from 'react'
import { artistDataProps } from '../../Types/Artist';
import './Topresult.scss';
import { Link } from 'react-router-dom';

interface TopResultProps {
  topResult: artistDataProps;
  handleSaveData: (type: string, id: string) => void;
}
const Topresult = ({ topResult, handleSaveData }: TopResultProps) => {

  return (
    <div className='topResult'>
      <h2 className='topResultTitle'>Top Result</h2>
      <Link to={`/${topResult?.type}/${topResult?.id}`} onClick={() => handleSaveData(topResult?.type, topResult?.id)}>
        <div className='topResultContainer'>
          <div className='topResultImg'>
            <img src={topResult?.images?.[0]?.url} alt="" />
          </div>
          <div className='topResultDetails'>
            <p className='topResultName'>
              {topResult?.name}
            </p>
            <span className='topResultType'>{topResult?.type}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Topresult;