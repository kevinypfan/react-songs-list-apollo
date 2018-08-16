import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { GET_SINGERS, ADD_SONG, GET_SONGS } from '../queries/graphql';

class AddSong extends Component {
  state = {
    singerId: '',
    firstName: '',
    lastName: '',
    title: ''
  }

  displaySingers = () => {
    var data = this.props.GET_SINGERS;
    if (data.loading) {
      return (<option disabled>Loading singers</option>);
    } else {
      return data.singers.map(singer => {
        return (<option key={singer.id} value={singer.id}>{`${singer.firstName} ${singer.lastName}`}</option>);
      });
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.ADD_SONG({
      variables: {
        singerId: this.state.singerId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        title: this.state.title
      },
      refetchQueries: [{ query: GET_SONGS }]
    });
  }

  render() {
    console.log(this.props)
    const requireOption = [
      <div className="field">
        <label>firstName:</label>
        <input type="text" onChange={(e) => this.setState({ firstName: e.target.value })} />
      </div>,
      <div className="field">
        <label>lastName:</label>
        <input type="text" onChange={(e) => this.setState({ lastName: e.target.value })} />
      </div>
    ];
    return (
      <form id="add-song" onSubmit={this.submitForm.bind(this)} >
        <div className="field">
          <label>title:</label>
          <input type="text" onChange={(e) => this.setState({ title: e.target.value })} />
        </div>
        <div className="field">
          <label>singer:</label>
          <select onChange={(e) => this.setState({ singerId: e.target.value })} >
            <option>Select singer</option>
            {this.displaySingers()}
            <option value="other">其他</option>
          </select>
          {(this.state.singerId === 'other') && requireOption}
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(GET_SINGERS, { name: "GET_SINGERS" }),
  graphql(ADD_SONG, { name: "ADD_SONG" })
)(AddSong);