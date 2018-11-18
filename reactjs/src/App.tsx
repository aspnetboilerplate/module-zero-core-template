import * as React from 'react';
import './App.css';
import { withRouter, Switch, Route } from 'react-router-dom';
import Layout from './scenes/Layout';
import Login from './scenes/Login';
import { inject } from 'mobx-react';
import SignalRAspNetCoreHelper from 'src/lib/signalRAspNetCoreHelper';

@inject('SessionStore')
class App extends React.Component<any> {
  async componentDidMount() {
    await this.props.SessionStore.getCurrentLoginInformations();

    if (!!this.props.SessionStore.currentLogin.user && this.props.SessionStore.currentLogin.application.features['SignalR']) {
      if (this.props.SessionStore.currentLogin.application.features['SignalR.AspNetCore']) {
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
