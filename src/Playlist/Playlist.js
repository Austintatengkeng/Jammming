import React, { useCallback } from "react";

import Tracklist from "../Tracklist/Tracklist.js";

import "./Playlist.css";

function Playlist(props) {
    const handleNameChange = useCallback((event) => {
        props.onRename(event.target.value);
    }, [props.onRename]);


    return (
        <div className="Playlist">
            <input value={props.playlistName} onChange={handleNameChange} />
            <div className="track-list">
                <Tracklist
                 tracks={props.playlistTracks}
                 onRemove={props.onRemove}
                 isRemoval={true}
                 currPlay={props.currPlay}
                 onPlay={props.onPlay}
                />
            </div>
            <button className="Playlist-save" onClick={props.onSave}>
             Save To Spotify
            </button>
        </div>
    )
}

export default Playlist;