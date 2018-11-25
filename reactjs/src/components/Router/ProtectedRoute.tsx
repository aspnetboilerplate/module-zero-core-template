import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import { isGranted } from 'src/lib/abpUtility';

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!abp.session.userId)
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );

        if (permission && !isGranted(permission)) {
          console.log('Not authorized!');
          return (
            <Alert message="No permission." type="error" showIcon />
            // <Redirect
            //   to={{
            //     pathname: '/error-403', //TODO: implement NotAuthorized component
            //     state: { from: props.location },
            //   }}
            // />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
