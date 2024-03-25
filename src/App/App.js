import React, { useCallback, useState } from 'react';
import './App.css';

import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';


function App() {
  const [playlistName, setPlaylistName] = useState("new playlist");
  const [searchResults, setSearchResults] = useState([{ id:1, name:"test nama", album:"test album", artist:"test artist"}, { id:2, name:"test nama", album:"test album", artist:"test artist"},{ id:3, name:"test nama", album:"test album", artist:"test artist"}]);
  const [playlist, setPlaylist] = useState([]);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const addTrack = useCallback((track) => {
    if(playlist.some((savedTrack) => savedTrack.id === track.id)){
      return;
    }
    setPlaylist((prevTracks) => [...prevTracks, track]);
  }, [playlist]);

  const removeTrack = useCallback((track) => {
    setPlaylist((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1><span>Jamm</span>ming</h1>
      </header>
      <body className='App-body'>
        <SearchBar />
        <div className='Track-listing'>
          <SearchResults 
            searchResults={searchResults}
            onAdd={addTrack} 
          />
          <Playlist 
            playlistTracks={playlist}
            onRemove={removeTrack}
            onRename={updatePlaylistName}
          />
        </div>
      </body>
    </div>
  );
}

export default App;
