import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {searchResults : [],
        playlistName: "New Playlist",
        playlistTracks : []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let playlistTracks = this.state.playlistTracks;
    if(!playlistTracks.includes(track)){
      playlistTracks.push(track);
      this.setState({playlistTracks : playlistTracks});
    } else{
      alert(`This track is already in the playlist ${this.state.playlistName}`);
    }

  }

  removeTrack(track){
    let playlistTracks = this.state.playlistTracks;
    playlistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    // console.log(playlistTracks);
    this.setState({playlistTracks : playlistTracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
     //console.log(this.state.playlistName);
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map((playlistTrack) => {
      return playlistTrack.uri;
    });
    // Spotify.getAccessToken();
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistTracks : [], playlistName : "New Playlist"});
  }

  search(searchTerm){
    //let searchResults = Spotify.search(searchTerm);
    // console.log(searchResults);
    Spotify.search(searchTerm).then((searchResults) => {this.setState({searchResults : searchResults})});
  }

  render() {
    return (
      <div>
        { /* <h1>Ja<span className="highlight">mmm</span>ing</h1> */ }
        <h1>Ja<span className="green">m</span><span className="yellow">m</span><span className="red">m</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
