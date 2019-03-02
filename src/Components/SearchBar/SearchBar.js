import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
   constructor(props){
       super(props);
       this.state = {searchBarTerm : ''};
       this.handleSearch = this.handleSearch.bind(this);
       this.handleTermChange = this.handleTermChange.bind(this);
   }

   handleSearch(event){
       this.props.onSearch(this.state.searchBarTerm);
   }

   handleTermChange(event){
        this.setState({searchBarTerm : `${event.target.value}`});
        // console.log(this.state.searchBarTerm);
   }

   render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                {/* eslint-disable-next-line */}
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
   }    
}

export default SearchBar;