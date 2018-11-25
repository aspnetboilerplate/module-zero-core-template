import * as React from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './scenes/Login';
import { inject } from 'mobx-react';
import SignalRAspNetCoreHelper from 'src/lib/signalRAspNetCoreHelper';
import SessionStore from './stores/sessionStore';
import Stores from './stores/storeIdentifier';

export interface IAppProps {
  sessionStore: SessionStore;
}

@inject(Stores.SessionStore)
class App extends React.Component<IAppProps> {
  async componentDidMount() {
    await this.props.sessionStore.getCurrentLoginInformations();

    if (!!this.props.sessionStore.currentLogin.user && this.props.sessionStore.currentLogin.application.features['SignalR']) {
      if (this.props.sessionStore.currentLogin.application.features['SignalR.AspNetCore']) {
        SignalRAspNetCoreHelper.initSignalR();
      }
    }
  }

  public render() {
    return (
      <Switch>
        <Route path="/dashboard" component={Layout} />
        <Route path="/users" component={Layout} />
        <Route path="/tenants" component={Layout} />
        <Route path="/roles" component={Layout} />
        <Route path="/about" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default withRouter<any>(App);
