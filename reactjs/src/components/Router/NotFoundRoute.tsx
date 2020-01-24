import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export class NotFoundRoute extends Component {
  render() {
    return (
      <>
        <Route
          render={props => {
            return (
              <Redirect
                to={{
                  pathname: '/exception?type=404',
                  state: { from: props.location },
                }}
              />
            );
          }}
        />
      </>
    );
  }
}

export default NotFoundRoute;
