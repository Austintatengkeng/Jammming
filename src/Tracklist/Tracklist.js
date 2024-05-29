import React from "react";

import Track from "../Track/Track.js";

import "./Tracklist.css";

function Tracklist (props) {
    const safeTracks = props.tracks || [];

    return (
        <div className="Tracklist">
            {safeTracks.map((track) => {
                return (
                    <Track
                     track={track}
                     key={track.id}
                     onAdd={props.onAdd}
                     onRemove={props.onRemove}
                     isRemoval={props.isRemoval}
                     onPlay={props.onPlay}
                     currPlay={props.currPlay}
                    />
                );
            })}
        </div>
    );
}

export default Tracklist;