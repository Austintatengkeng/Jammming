import React, { useCallback } from "react";

import "./Track.css";

function Track(props) {

    const handlePreview = useCallback((event) => {
        props.onPlay({id:props.track.id, src:props.track.preview});
    }, [props.onPlay])

    const previewAction = useCallback(()=> {
        if(props.track.preview){
            return (
                <div className={`pp-btn ${props.track.id === props.currPlay.id ? 'pause': 'play'}`} onClick={handlePreview}></div>
            );
        }
        return (
            <div className="pp-btn unavailable" alt="preview is unavailable"></div>
        );
    }, [props.track, props.currPlay]);

    const addTrack = useCallback((event) => {
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    const removeTrack = useCallback((event) => {
        props.onRemove(props.track);
    }, [props.onRemove, props.track]);

    const actionBtn = () => {
        if(props.isRemoval){
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
           <img src={props.track.img} className="track-cover" alt={props.track.name}/>
            <div className="Track-info">
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
            {actionBtn()}
        </div>
    );
};

export default Track;