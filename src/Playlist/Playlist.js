import React, { useCallback } from "react";

import Tracklist from "../Tracklist/Tracklist.js";

import "./Playlist.css";

function Playlist({onRename, playlistName, playlistTracks, onRemove, currPlay, onPlay, onSave}) {
    const handleNameChange = useCallback((event) => {
        onRename(event.target.value);
    }, [onRename]);


    return (
        <div className="Playlist">
            <input value={playlistName} onChange={handleNameChange} />
            <div className="track-list">
                <Tracklist
                 tracks={playlistTracks}
                 onRemove={onRemove}
                 isRemoval={true}
                 currPlay={currPlay}
                 onPlay={onPlay}
                />
            </div>
            <button className="Playlist-save" onClick={onSave}>
             Save To Spotify
            </button>
        </div>
    )
}

export default Playlist;