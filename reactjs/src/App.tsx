import * as React from 'react';
import './App.css';
import { inject } from 'mobx-react';
import SignalRAspNetCoreHelper from 'src/lib/signalRAspNetCoreHelper';
import SessionStore from './stores/sessionStore';
import Stores from './stores/storeIdentifier';
import Router from 'src/components/Router';

export interface IAppProps {
  sessionStore?: SessionStore;
}

@inject(Stores.SessionStore)
class App extends React.Component<IAppProps> {
  async componentWillMount() {
    await this.props.sessionStore!.getCurrentLoginInformations();

    if (!!this.props.sessionStore!.currentLogin.user && this.props.sessionStore!.currentLogin.application.features['SignalR']) {
      if (this.props.sessionStore!.currentLogin.application.features['SignalR.AspNetCore']) {
        SignalRAspNetCoreHelper.initSignalR();
      }
    }
  }

  public render() {
    return <Router />;
  }
}

export default App;
