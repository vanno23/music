import React from 'react'
import { useParams } from 'react-router-dom'
const SearchNoResult = () => {
  const {searchPageValue} = useParams();
  return (
    <div style={{color: 'white', paddingTop: '25%', textAlign: 'center'}}>
      <h2>No results found for "{searchPageValue}"</h2>
      <p style={{padding: "10px 0 30px", fontSize: '0.875rem'}}>Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
    </div>
  )
}

export default SearchNoResult;