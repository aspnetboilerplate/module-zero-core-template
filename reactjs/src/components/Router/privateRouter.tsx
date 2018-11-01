import * as React from "react";
import { Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Login from "../../scenes/Login";

export interface IPrivateRouter {
  component: any;
  path: string;
  permission: string;
}

@inject("AuthenticationStores")
@observer
class PrivateRouter extends React.Component<any> {
  public render() {
    const { component, path } = this.props;

    return this.props.AuthenticationStores.isAuthenticated ? (
      <Route path={path} component={component} />
    ) : (
      <Route path={path} component={Login} />
    );
  }
}

export default PrivateRouter;
