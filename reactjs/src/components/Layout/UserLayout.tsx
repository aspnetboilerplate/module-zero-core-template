import './UserLayout.less';

import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { Col } from 'antd';
import DocumentTitle from 'react-document-title';
import Footer from '../Footer';
import LanguageSelect from '../LanguageSelect';
import { userRouter } from '../Router/router.config';
import utils from '../../utils/utils';

class UserLayout extends React.Component<any> {
  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <DocumentTitle title={utils.getPageTitle(pathname)}>
        <Col className="container">
          <div className={'lang'}>
            <LanguageSelect />
          </div>
          <Switch>
            {userRouter
              .filter((item: any) => !item.isLayout)
              .map((item: any, index: number) => (
                <Route key={index} path={item.path} component={item.component} exact={item.exact} />
              ))}

            <Redirect from="/user" to="/user/login" />
          </Switch>
          <Footer />
        </Col>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
