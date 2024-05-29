import React, { useCallback } from "react";

import "./Track.css";

function Track({track, currPlay, onPlay, onAdd, onRemove, isRemoval}) {

    const handlePreview = useCallback((event) => {
        onPlay({id:track.id, src:track.preview});
    }, [onPlay, track.id, track.preview]);

    const previewAction = useCallback(()=> {
        if(track.preview){
            return (
                <div className={`pp-btn ${track.id === currPlay.id ? 'pause': 'play'}`} onClick={handlePreview}></div>
            );
        }
        return (
            <div className="pp-btn unavailable" alt="preview is unavailable"></div>
        );
    }, [track, currPlay, handlePreview]);

    const addTrack = useCallback((event) => {
        onAdd(track);
    }, [onAdd, track]);

    const removeTrack = useCallback((event) => {
        onRemove(track);
    }, [onRemove, track]);

    const actionBtn = () => {
        if(isRemoval){
            return (
                <button className="ActionBtn"
                 onClick={removeTrack}
                >
                -
                </button>
            );
        }
        return(
            <button className="ActionBtn"
             onClick={addTrack}
            >
            +
            </button>
        );
    }
    return (
        <div className="Track">
           {previewAction()}
           <img src={track.img} className="track-cover" alt={track.name}/>
            <div className="Track-info">
                <h3>{track.name}</h3>
                <p>
                    {track.artist} | {track.album}
                </p>
            </div>
            {actionBtn()}
        </div>
    );
};

export default Track;