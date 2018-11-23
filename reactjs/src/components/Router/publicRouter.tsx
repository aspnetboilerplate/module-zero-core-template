import * as React from 'react';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import AuthenticationStore from 'src/stores/authenticationStore';
import Stores from './../../stores/storeIdentifier';

export interface IPublicRouterProps {
  component: any;
  path: string;
  permission: string;
  authenticationStore: AuthenticationStore;
}

@inject(Stores.AuthenticationStore)
@observer
class PublicRouter extends React.Component<IPublicRouterProps> {
  public render() {
    const { component, path } = this.props;

    return this.props.authenticationStore.isAuthenticated ? <Route path={path} component={component} /> : <Route path={path} component={component} />;
  }
}

export default PublicRouter;
