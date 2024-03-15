import React from 'react';
import SongItem from '../SongItem/SongItem';
import './SearchResults.css';

function SearchResults({ results }) {
  return (
    <div className="SearchResults">
      {results.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SearchResults;
