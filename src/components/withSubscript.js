import React, { Component } from 'react'
import { Subscription } from 'react-apollo'

const withSubscription = (WrappedComponent, graphqlTag) => {
  return class extends Component {
    render() {
      return (
        <Subscription subscription={graphqlTag}>
          <WrappedComponent {...this.props} onSubscriptData={} />
        </Subscription>
      );
    }
  }
}

export default withSubscription;
