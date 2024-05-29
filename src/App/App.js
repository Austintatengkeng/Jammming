import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../util/Spotify.js';
import UserPlaylist from '../UserPlaylists/UserPlaylists.js';


function App() {
  const [playlistName, setPlaylistName] = useState("new playlist");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

 //components to play track's preview
  const [isPlaying, setIsPlaying] = useState(false);
  let previewRef = useRef();
  const [currentPlaying, setCurrentPlaying] = useState({id:'', src:''});
  

  //components to list user's Playlist
  const [userPlaylists, setUserplaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({id:'', img:require('../resources/img/newplaylist.png'), name: "new playlist"});
  const [pTracksCurr, setPTracksCurr] = useState([]);

  useEffect(() => {
    Spotify.getUserPlaylists().then(playlists => setUserplaylists(playlists));
  }, []);

  const handlePlaylistSelection = useCallback((selected) => {
    if(selected.id === ''){
      setPlaylistTracks([]);
      setPlaylistName(selected.name);
      setSelectedPlaylist(selected);
      return;
    }
    setSelectedPlaylist(selected);
    setPlaylistName(selected.name);
    Spotify.getPlaylistItems(selected.id).then(tracks => {
      setPlaylistTracks(tracks);
      setPTracksCurr(tracks);
    });
  }, []);

  const handlePlay = useCallback((toBePlayed) => {
    if(isPlaying){
      previewRef.current.pause();
      setIsPlaying(!isPlaying);
      setCurrentPlaying({ id: '', src: '' });
    }else{
      if(isPlaying && currentPlaying.id !== toBePlayed.id){
        setIsPlaying(!isPlaying);
        previewRef.current.play();
        return;
      }
      setCurrentPlaying(toBePlayed);
      previewRef.current.src = toBePlayed.src;
      previewRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentPlaying]);

  const savePlaylist = useCallback(() => {
    if(selectedPlaylist.id !== ''){
      const toAdd = playlistTracks.filter(track => !pTracksCurr.includes(track));
      const toRemove = pTracksCurr.filter(track => !playlistTracks.includes(track));

      Spotify.addPlaylistTracks(selectedPlaylist.id, toAdd.map(track => track.uri));
      Spotify.removePlaylistTracks(selectedPlaylist.id, toRemove.map(track => track.uri));
      if(!selectedPlaylist.name.match(playlistName)){
        Spotify.updatePlaylistName(selectedPlaylist.id, playlistName).then(() => {
          Spotify.getUserPlaylists().then(playlists => setUserplaylists(playlists)); 
        });
      }
      setSelectedPlaylist({id:'', img:require('../resources/img/newplaylist.png'), name: "new playlist"});
      setPlaylistName("new playlist");
      setPlaylistTracks([]);
      return;
    }
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName("new playlist").then(() => {
      setPlaylistTracks([]);
      Spotify.getUserPlaylists().then(playlists => setUserplaylists(playlists));
    });
    
  }, [playlistTracks, playlistName, selectedPlaylist, pTracksCurr]);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const addTrack = useCallback((track) => {
    if(playlistTracks.some((savedTrack) => savedTrack.id === track.id)){
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const searchTracks = useCallback((term) => {
    Spotify.search(term).then((tracks) => setSearchResults(tracks.filter((track) => !playlistTracks.includes(track))));
  }, [playlistTracks]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jammming</h1>
        <SearchBar className="SearchBar"
         onSearch={searchTracks}
        />
      </header>
      <main className='App-body'>
        <div className='Track-listing'>
          <audio ref={previewRef}/>
          <SearchResults 
            searchResults={searchResults}
            onAdd={addTrack} 
            currPlay={currentPlaying}
            onPlay={handlePlay}
            className="results"
          />
          <div className='right-components'>
            <UserPlaylist
             playlists={userPlaylists}
             onSelected={handlePlaylistSelection}
             selectedPlaylist={selectedPlaylist}
            />
            <Playlist 
            playlistTracks={playlistTracks}
            playlistName={playlistName}
            onRemove={removeTrack}
            onRename={updatePlaylistName}
            onSave={savePlaylist}
            currPlay={currentPlaying}
            onPlay={handlePlay}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
