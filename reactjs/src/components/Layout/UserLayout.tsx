import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Switch, Route, Redirect } from 'react-router-dom';
import utils from 'src/utils/utils';
// import { userRouter } from '../Router/router.config';
// import Login from 'src/scenes/Login';
import { userRouter } from '../Router/router.config';

class UserLayout extends React.Component<any> {
  render() {
    debugger;
    const {
      location: { pathname },
    } = this.props;
    return (
      <DocumentTitle title={utils.getPageTitle(pathname)}>
        <Switch>
          {userRouter
            .filter((item: any) => !item.isLayout)
            .map((item: any, index: number) => (
              <Route key={index} path={item.path} component={item.component} exact={item.exact} />
            ))}

          <Redirect from="/user" to="/user/login" />
        </Switch>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
