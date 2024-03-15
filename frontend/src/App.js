import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import SongList from './components/SongList/SongList';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const audioRef = useRef(new Audio()); // Use React ref to store audio element

  useEffect(() => {
    const searchMusic = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:5000/api/music/search?q=ar&searchEngine=mtmusic');
        setSongs(response.data.response);
        if (response.data.response.length > 0) {
          setSelectedSong(response.data.response[0]);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    searchMusic();
  }, []);

  const fetchAndPlayMusic = async (id) => {
    try {
      // Use template literals for variables inside strings
      const response = await axios.get(`http://0.0.0.0:5000/api/music/fetch?id=${id}`);
      const songUrl = response.data; // Assuming the response contains the direct URL to the mp3 file
      audioRef.current.src = songUrl; // Set the source of the audio element
      audioRef.current.play(); // Play the audio
    } catch (error) {
      console.error('Error fetching music: ', error);
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };

  return (
    <div className="App">
      <div className="PlaylistHeader">
        {selectedSong && (
          <>
            <img src={selectedSong.img} alt="Selected" className="PlaylistImage" />
            <h1>{selectedSong.title}</h1>
            <button onClick={() => fetchAndPlayMusic(selectedSong.id)}>Play</button>
          </>
        )}
      </div>
      <SongList songs={songs} onSelectSong={handleSelectSong} />
    </div>
  );
}

export default App;
