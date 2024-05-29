import React, { useCallback } from "react";

import "./PlaylistItem.css";

function PlaylistItem ({playlist, onSelected, selected}){

    const handleSelect = useCallback((event) => {
        onSelected(playlist);
    }, [playlist, onSelected]);

    return(
        <div 
         className={`playlist ${playlist.id === selected.id ? 'selected' : ''}`}
         onClick={handleSelect}
        >
            <img src={playlist.img} alt={playlist.name}
            />
            <h3>{playlist.name}</h3>
        </div>
    )
}

export default PlaylistItem;