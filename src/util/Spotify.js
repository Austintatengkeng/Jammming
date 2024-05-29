const clientId = '0ac6284c1cf84f60853d294eaf2eda4d';
const redirectUri = 'http://localhost:3000/'; 
let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }

        const accessTokenCurr = window.location.href.match(/access_token=([^&]*)/);
        const expiresInCurr = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenCurr && expiresInCurr){
            accessToken = accessTokenCurr[1];
            const expiresIn = Number(expiresInCurr[1]);
            window.setTimeout(() => accessToken = '', expiresIn *1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                img:track.album.images[0].url,
                uri: track.uri,
                preview: track.preview_url
            }));
        }).catch(error => {
            console.error('Error fetching search results: ', error);
            return [];
        });
    },
    savePlaylist(playlistName, trackUris){
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`}
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, {headers:headers}
        ).then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(responseJSON => {
            userId = responseJSON.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response =>{ 
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(responseJSON => {
                const playlistId = responseJSON.id;
                return Spotify.addPlaylistTracks(playlistId, trackUris);
            });
        }).catch(error => {
            console.error('Error Saving playlist: ', error);
        });
    },
    getUserPlaylists(retry = 0) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
    
        return fetch('https://api.spotify.com/v1/me/playlists', { headers })
          .then(response => {
            if (!response.ok) {
              if (response.status === 429) {
                if (retry < 3) {
                  const retryAfter = response.headers.get('Retry-After');
                  console.warn(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
                  return new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
                    .then(() => Spotify.getUserPlaylists(retry + 1));
                } else {
                  throw new Error('Rate limit exceeded. Please try again later.');
                }
              }
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          }).then(jsonResponse => {
            if (!jsonResponse.items) {
              return [];
            }
            console.log('Fetched Playlists:', jsonResponse.items);
            return jsonResponse.items.map(playlist => ({
              id: playlist.id,
              img: playlist.images[0]?.url || 'defaultImageURL', // Add a default image URL
              name: playlist.name
            }));
          }).catch(error => {
            console.error('Error fetching playlists:', error);
            return [];
          });
      },
    
    getPlaylistItems(playlistId){
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {headers}).then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(jsonResponse => {
            console.log("fetched playlistItems: ", jsonResponse);
            return jsonResponse.items.map(item => {
                return {
                    id:item.track.id,
                    name:item.track.name,
                    img:item.track.album.images[0].url,
                    album:item.track.album.name,
                    artist:item.track.artists[0].name,
                    preview:item.track.preview_url,
                    uri:item.track.uri
                }
            });
        }).catch(error =>{
            console.error('Error fetching playlistItems:', error);
            return [];
        });
    },

    addPlaylistTracks(playlistID, trackUris){
        const accessToken= Spotify.getAccessToken();
        const headers = {
            Authorization:`Bearer ${accessToken}`
        };
        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers:headers,
            method:'POST',
            body: JSON.stringify({uris:trackUris})
        }).catch(error => {
            console.error('Error Saving playlist: ', error);
        });
    },

    removePlaylistTracks(playlistID, trackUris){
        const accessToken= Spotify.getAccessToken();
        const headers = {
            Authorization:`Bearer ${accessToken}`
        };
        const body = JSON.stringify({
            tracks:trackUris.map(trackUri =>({uri:trackUri}))
        });
        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers:headers,
            method:'DELETE',
            body: body
        }).catch(error => {
            console.error('Error Saving playlist: ', error);
        });
    },

    updatePlaylistName(playlistID, newName){
        const accessToken= Spotify.getAccessToken();
        const headers = {
            Authorization:`Bearer ${accessToken}`
        };
        const body = JSON.stringify({name: newName});
        return fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
            headers:headers,
            method:'PUT',
            body: body
        }).catch(error => {
            console.error('Error Saving playlist: ', error);
        });
    }

}

export default Spotify;