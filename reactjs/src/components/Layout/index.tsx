import * as React from 'react';
import { Layout } from 'antd';
import './index.css';
import { Switch, withRouter } from 'react-router';
import Header from 'src/components/Header';
import SiderMenu from 'src/components/SiderMenu';
import Footer from 'src/components/Footer';
import DocumentTitle from 'react-document-title';
import { appRouters } from 'src/components/Router/router.config';
import { L } from 'src/lib/abpUtility';
import ProtectedRoute from 'src/components/Router/ProtectedRoute';

const { Content } = Layout;

class AppLayout extends React.Component<any> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  getPageTitle = (pathname: string) => {
    const route = appRouters.filter(route => route.path === pathname);
    const localizedAppName = L('AppName');
    if (!route) {
      return localizedAppName;
    }

    return L(route[0].title) + ' | ' + localizedAppName;
  };

  render() {
    const {
      history,
      location: { pathname },
    } = this.props;
    const { path } = this.props.match;
    const { collapsed } = this.state;
    const layout = (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu path={path} onCollapse={this.onCollapse} history={history} collapsed={collapsed} />;
        <Layout>
          <Layout.Header style={{ background: '#fff', minHeight: 83, padding: 0 }}>
            <Header collapsed={this.state.collapsed} toggle={this.toggle} />
          </Layout.Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              {appRouters.map((route, index) => {
                return <ProtectedRoute key={index} path={route.path} component={route.component} permission={route.permission} />;
              })}
            </Switch>
          </Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    );

    return <DocumentTitle title={this.getPageTitle(pathname)}>{layout}</DocumentTitle>;
  }
}

export default withRouter<any>(AppLayout);
