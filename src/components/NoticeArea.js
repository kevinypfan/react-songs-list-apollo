import React, { Component } from 'react';
import { Subscription } from 'react-apollo'
import { SONG_ADDED_SUBSCRIPTION } from '../queries/graphql';

class NoticeArea extends Component {

  render() {
    return (
      <div>
        <h1>最新歌曲：</h1>
        <Subscription subscription={SONG_ADDED_SUBSCRIPTION}>
          {(result) => {
            const { loading, error, data } = result;
            console.log(loading, "===", error, '---', data)
            return (
              <div>
                <h3>歌名： {!loading && data.songAdded.title}</h3>
                <p>歌手： {!loading && data.songAdded.singer.firstName + data.songAdded.singer.lastName}</p>
              </div>
            )
          }}
        </Subscription>
      </div>
    )
  }
}

export default NoticeArea;