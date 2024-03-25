import React, { useCallback } from "react";

import "./Track.css";

function Track(props) {
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