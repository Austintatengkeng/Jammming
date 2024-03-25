import React, { useCallback } from "react";

import Tracklist from "../Tracklist/Tracklist.js";

import "./Playlist.css";

function Playlist(props) {
    const handleNameChange = useCallback((event) => {
        props.onRename(event.target.value);
    }, [props.onRename]);

    return (
        <div className="Playlist">
            <input defaultValue={"new playlist"} onChange={handleNameChange} />
            <Tracklist
             tracks={props.playlistTracks}
             onRemove={props.onRemove}
             isRemoval={true}
            />
            <button className="Playlist-save">
             Save To Spotify
            </button>
        </div>
    )
}

export default Playlist;