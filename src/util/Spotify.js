let userAccessToken = "";
let expiresIn ="";
const client_id = '3cc2ed6ae9cd4c7e820a89979f187280';
const redirect_uri = /* 'http://localhost:3000/callback/'; */ 'http://odijamming.s3-website.us-east-2.amazonaws.com/callback/';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${client_id}&redirect_uri=${redirect_uri}`;

let Spotify = {
    getAccessToken(){
        if(userAccessToken){
            return userAccessToken;
        } else{
            let accessToken = window.location.href.match(/access_token=([^&]*)/);
            let urlexpiresIn = window.location.href.match(/expires_in=([^&]*)/);  
            if(accessToken && urlexpiresIn){
                userAccessToken = accessToken[1];
                expiresIn = urlexpiresIn[1];
                // console.log(userAccessToken, expiresIn);
                window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            } else{
                window.location = spotifyUrl;
            }      
            
        }
    },

    search(searchTerm){
        this.getAccessToken();
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${searchTerm.replace(' ', '%20')}`, {headers: {Authorization: `Bearer ${userAccessToken}`}}).then(
            response => response.json()
        ).then(jsonResponse => {
            if(jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track => {
                    // console.log(track);
                    return {
                        id : track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            } else{
                return [];
            }
        })
    },

    savePlaylist(playlistName, trackuris){
        this.getAccessToken();
        if(!playlistName || !trackuris){return;}
        const headers = {Authorization : `Bearer ${userAccessToken}`};
        let userId = "";
        let playlistId = "";
        fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => response.json()).then(
            jsonResponse => {
                userId = jsonResponse.id;
            }
        ).then(() => {
            fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers : headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => response.json()).then(
                jsonResponse => playlistId = jsonResponse.id
            ).then(() => {
                fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({uris : trackuris})
                })
            })
        })
    }



    
};

export default Spotify;