import React from 'react';
import './SongList.css';

function SongList({ songs, onSelectSong }) {
  return (
    <div className="SongList">
      <div className="SongListHeader">
        {/* Your headers for the song list */}
      </div>
      {songs.map((song, index) => (
        <div className="SongRow" key={index} onClick={() => onSelectSong(song)}>
          <div className="SongDetails">
            <span className="SongTitle">{song.title}</span>
            <span className="SongArtist">{/* Artist here */}</span>
            <span className="SongAlbum">{/* Album mockup */}</span>
            <span className="SongDate">{/* Date mockup */}</span>
            <span className="SongTime">{/* Time mockup */}</span>
          </div>
          <div className="SongActions">
            {/* Icons for adding to playlist or showing it's added */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongList;
