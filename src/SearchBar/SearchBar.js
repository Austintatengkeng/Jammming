import React from "react";

import "./SearchBar.css";

function SearchBar(props) {
    return (
        <div className="SearchBar">
            <input placeholder="Enter a Song Title"></input>
            <button className="SearchBtn">Search</button>
        </div>
    )
}

export default SearchBar;