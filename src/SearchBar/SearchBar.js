import React, { useCallback, useState } from "react";

import "./SearchBar.css";

function SearchBar({onSearch}) {
    const [term, setTerm] = useState('');

    const handleTermChange = useCallback((event)=> {
        setTerm(event.target.value)
    }, []);

    const handleClick = useCallback(() => {
        onSearch(term);
    }, [onSearch, term]);

    return (
        <div className="SearchBar">
            <input placeholder="Enter a Song Title" onChange={handleTermChange} ></input>
            <button className="SearchBtn" onClick={handleClick}>Search</button>
        </div>
    )
}

export default SearchBar;