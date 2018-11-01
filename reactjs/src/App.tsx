import * as React from "react";
import "./App.css";

import * as abpUserConfiguration from "./services/abpUserConfigurationService";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./scenes/Login";
class App extends React.Component {
  componentDidMount() {
    console.log(abpUserConfiguration.initialize());
  }
  public render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
        {/* <PrivateRouter path="/activity" component={Activity} />
        <PublicRouter path="/login" component={Login} />
        <PublicRouter path="/forgetPassword" component={ForgetPassword} />
        <PrivateRouter path="/profile/:id" component={Profile} />
        <PrivateRouter path="/pushNotification" component={PushNotification} />
        <PublicRouter path="/" component={Login} />
        <PrivateRouter path="/activity/create" component={Profile} /> */}
      </Switch>
    );
  }
}

export default withRouter<any>(App);
