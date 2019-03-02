import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                <ul>
                    {
                        this.props.tracks ? this.props.tracks.map((track) => {
                            return <li key={track.id}><Track track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} /></li>;
                    }) : null
                    }
                </ul>
            </div>
        )
    }

}

export default TrackList;