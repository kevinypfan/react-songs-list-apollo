import './App.css'
import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';

import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import SongList from './components/SongList'
import AddSong from './components/AddSong'
import NoticeArea from './components/NoticeArea'

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/subscriptions`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});




class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>歌曲清單</h1>
          <SongList />
          <AddSong />
          <NoticeArea />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
