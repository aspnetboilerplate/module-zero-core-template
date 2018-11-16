import * as React from 'react';
import './App.css';

import * as abpUserConfiguration from './services/abpUserConfigurationService';
import { withRouter, Switch, Route } from 'react-router-dom';
import Layout from './scenes/Layout';

import Login from "./scenes/Login"
class App extends React.Component {
  componentDidMount() {
    console.log(abpUserConfiguration.initialize());
  }
  public render() {
    return (
        <Switch>      
          <Route path="/dashboard" component={Layout} />
          <Route path="/users" component={Layout} />
          <Route path="/tenants" component={Layout} />
          <Route path="/roles" component={Layout} />
          <Route path="/about" component={Layout} />
          <Route path="/login" component={Login } /> 
          <Route path="/" component={Login } />         
        </Switch>
     )
  }
}

export default withRouter<any>(App);
