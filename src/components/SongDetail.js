import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_SONG_BY_ID, UPVOTE_SONG } from '../queries/graphql'

class SongDetail extends Component {

  upvoteHandler = (songId) => {
    this.props.UPVOTE_SONG({
      variables: {
        songId
      },
      refetchQueries: [{ query: GET_SONG_BY_ID }]
    })
  }

  displaySongDetails = () => {
    const { song } = this.props.GET_SONG_BY_ID;
    if (song) {
      return (
        <div id="list-container">
          <div>
            <h2>
              {song.title}
              <span>
                <button onClick={() => this.upvoteHandler(song.id)}>Like</button>
                {song.votes}
              </span>
            </h2>
          </div>
          <p>{`${song.singer.firstName} ${song.singer.lastName}`}</p>
          <p>All songs by this singer:</p>
          <ul className="other-songs">
            {song.singer.songs.map(item => {
              return (
                <li key={item.id}>
                  <div id="list-container">
                    {item.title}<span><button onClick={() => this.upvoteHandler(item.id)}>Like</button> {item.votes}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      );
    } else {
      return (<div>No song selected...</div>);
    }
  }
  render() {
    return (
      <div id="song-details">
        {this.displaySongDetails()}
      </div>
    );
  }
}

export default compose(graphql(GET_SONG_BY_ID, {
  name: 'GET_SONG_BY_ID',
  options: (props) => {
    return {
      variables: {
        id: props.songId
      }
    }
  }
}),
  graphql(UPVOTE_SONG, { name: 'UPVOTE_SONG' })
)(SongDetail);