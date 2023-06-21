import React, { useState, useEffect } from 'react';
import { copyrightsData } from '../AlbumItemType';
import './CopyRight.scss';

interface copyrightsDaTA {
  copyrights: copyrightsData[],
  release_date: string,
}

const CopyRight = ({ copyrights, release_date }: copyrightsDaTA) => {
  const [newReleaseDate, setNewReleaseDate] = useState<string>();

  useEffect(() => {
    const date = new Date(release_date);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setNewReleaseDate(formattedDate);
  }, [release_date])

  return (
    <div className='copyRight' style={{paddingInline: '2rem'}}>
      {copyrights?.map((item, index) => {
        return (
          <div key={index}>
            <p className='newReleaseDate'>{newReleaseDate}</p>
            <p className='copyRightText'>{item.text}</p>
          </div>
        )
      })
      }
    </div>
  )
}

export default CopyRight