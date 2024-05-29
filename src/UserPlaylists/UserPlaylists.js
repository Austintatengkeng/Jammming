import React from "react";

import "./UserPlaylist.css";

import PlaylistItem from "../PlaylistItem/PlaylistItem.js"

function UserPlaylist (props){

    return (
        <div className="userplaylist">
            <h2>Your Playlist</h2>
            <div
             className="playlist-list"
            >
                <PlaylistItem 
                 key='' 
                 playlist={{id:'', img:require('../resources/img/newplaylist.png'), name: "new playlist"}}
                 onSelected={props.onSelected}
                 selected={props.selectedPlaylist}
                />
               
                {props.playlists.map((playlist) => {
                    return (
                        <PlaylistItem
                         key={playlist.id}
                         playlist={playlist}
                         onSelected={props.onSelected}
                         selected={props.selectedPlaylist}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default UserPlaylist;