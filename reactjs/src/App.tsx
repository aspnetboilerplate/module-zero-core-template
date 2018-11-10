import * as React from "react";
import "./App.css";

import * as abpUserConfiguration from "./services/abpUserConfigurationService";
import { withRouter } from "react-router-dom";
import Layout from "./scenes/Layout";
class App extends React.Component {
  componentDidMount() {
    console.log(abpUserConfiguration.initialize());
  }
  public render() {
    return (
      <Layout />
    );
  }
}

export default withRouter<any>(App);
