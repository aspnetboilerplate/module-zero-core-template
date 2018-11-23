import * as React from 'react';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Login from '../../scenes/Login';
import Stores from './../../stores/storeIdentifier';
import AuthenticationStore from './../../stores/authenticationStore';

export interface IPrivateRouterProps {
  component: any;
  path: string;
  permission: string;
  authenticationStore: AuthenticationStore;
}

@inject(Stores.AuthenticationStore)
@observer
class PrivateRouter extends React.Component<IPrivateRouterProps> {
  public render() {
    const { component, path } = this.props;

    return this.props.authenticationStore.isAuthenticated ? <Route path={path} component={component} /> : <Route path={path} component={Login} />;
  }
}

export default PrivateRouter;
