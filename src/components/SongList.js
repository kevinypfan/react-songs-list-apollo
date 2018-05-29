import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { GET_SONGS } from '../queries/graphql'
import SongDetail from './SongDetail'


class SongList extends Component {
  state = {
    selected: null
  }

  displaySongs = () => {
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading songs...</div>);
    } else {
      return data.songs.map(song => {
        return (
          <li key={song.id} onClick={(e) => this.setState({ selected: song.id })}>
            <span>{song.votes}</span>
            {song.title}
          </li>
        );
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="song-list">
          {this.displaySongs()}
        </ul>
        <SongDetail songId={this.state.selected} />
      </div>
    )
  }

}

export default graphql(GET_SONGS)(SongList)