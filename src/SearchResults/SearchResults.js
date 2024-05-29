import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import "./SearchResults.css";

function SearchResults(props) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <div
             className="search-list"
            >
                <Tracklist
                 tracks={props.searchResults}
                 onAdd={props.onAdd}
                 currPlay={props.currPlay} 
                 onPlay={props.onPlay}
                />
            </div>
        </div>
    );
}

export default SearchResults;