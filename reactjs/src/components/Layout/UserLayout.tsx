import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Switch, Route, Redirect } from 'react-router-dom';
import utils from 'src/utils/utils';
import { userRouter } from '../Router/router.config';
import { Col } from 'antd';
// import "./UserLayout.css";
import "./UserLayout.less";
import Footer from '../Footer';

class UserLayout extends React.Component<any> {
  render() {
    const {
      location: { pathname },
    } = this.props;
    return (
      <DocumentTitle title={utils.getPageTitle(pathname)}>
          <Col className="container">
            <Switch>
              {userRouter
                .filter((item: any) => !item.isLayout)
                .map((item: any, index: number) => (
                  <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                ))}

              <Redirect from="/user" to="/user/login" />
            </Switch>
            <Footer/>
          </Col>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
