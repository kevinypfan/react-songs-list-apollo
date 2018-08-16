import gql from 'graphql-tag'

export const SONG_ADDED_SUBSCRIPTION = gql`
subscription onSongAdded {
  songAdded {
    id
    title
    votes
    singer {
      id
      firstName
      lastName
    }
  }
}
`;

export const GET_SONGS = gql`
{
  songs {
    id
    title
    votes
    singer {
      id
      firstName
      lastName
    }
  }
}
`

export const GET_SONG_BY_ID = gql`
query ($id: ID!){
  song(id: $id) {
    id
    title
    votes
    singer {
      id
      firstName
      lastName
      songs {
        id
        title
        votes
      }
    }
  }
}
`

export const GET_SINGERS = gql`
{
  singers {
    id
    firstName
    lastName
  }
}
`

export const ADD_SONG = gql`
mutation($singerId: ID!, $firstName: String, $lastName: String, $title: String!) {
  addSong(singerId: $singerId, firstName: $firstName, lastName: $lastName, title: $title) {
    id
    title
    votes
    singer {
      id
      firstName
      lastName
      songs {
        id
        title
        votes
      }
    }
  }
}
`

export const UPVOTE_SONG = gql`
mutation($songId: ID!) {
  upvoteSong(songId: $songId) {
    id
    title
    votes
    singer {
      id
      lastName
      firstName
      songs {
        id
        title
        votes
      }
    }
  }
}
`