import * as React from 'react';
import AuthenticationStore from 'src/stores/authenticationStore';
import { inject } from 'mobx-react';
import Stores from 'src/stores/storeIdentifier';

export interface ILogoutProps {
  authenticationStore?: AuthenticationStore;
}

@inject(Stores.AuthenticationStore)
class Logout extends React.Component<ILogoutProps> {
  componentDidMount() {
    this.props.authenticationStore!.logout();
    window.location.href = '/';
  }

  render() {
    return null;
  }
}

export default Logout;
