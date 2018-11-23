import * as React from 'react';
import { Layout, Menu, Icon, Avatar, Col } from 'antd';
import './index.css';
import { Route, Switch, withRouter } from 'react-router';
import Users from '../Users';
import Tenants from '../Tenants';
import Roles from '../Roles';
import SubMenu from 'antd/lib/menu/SubMenu';
import AbpLogo from 'src/images/abp-logo-long.png';
import About from '../About';
import Dashboard from '../Dashboard';
import LayoutHeader from 'src/components/Header';

const { Sider, Content } = Layout;

class LayoutComponent extends React.Component<any> {
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

  render() {
    const {path} = this.props.match;

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} className={'sidebar'} width={256} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          {this.state.collapsed ? <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
              <Avatar shape="square" style={{ height: 27, width: 64 }} src={AbpLogo} />
            </Col> : <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
              <Avatar shape="square" style={{ height: 54, width: 128 }} src={AbpLogo} />
            </Col>}

          <Menu theme="dark" mode="inline" defaultSelectedKeys={path}>
            <Menu.Item key={'/dashboard'} onClick={() => this.props.history.push('/dashboard')}>
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key={'/tenants'} onClick={() => this.props.history.push('/tenants')}>
              <Icon type="appstore" />
              <span>Tenants</span>
            </Menu.Item>
            <Menu.Item key={'/users'} onClick={() => this.props.history.push('/users')}>
              <Icon type="user" />
              <span>Users</span>
            </Menu.Item>
            <Menu.Item key={'/roles'} onClick={() => this.props.history.push('/roles')}>
              <Icon type="tags" />
              <span>Rules</span>
            </Menu.Item>
          <Menu.Item key={'/about'} onClick={() => this.props.history.push('/about')}>
              <Icon type="info-circle" />
              <span>About</span>
            </Menu.Item>
            <SubMenu key="6" title={<span>
                  <Icon type="bars" />
                  <span>Multi Level Menu</span>
                </span>}>
              <SubMenu key="7" title={<span>
                    <Icon type="bars" />
                    <span>ASP.NET Boilerplate</span>
                  </span>}>
                <Menu.Item key="8">
                  <span>Home</span>
                </Menu.Item>
                <Menu.Item key="9">
                  <span>Templates</span>
                </Menu.Item>
                <Menu.Item key="10">
                  <span>Samples</span>
                </Menu.Item>
                <Menu.Item key="11">
                  <span>Documents</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="12" title={<span>
                    <Icon type="bars" />
                    <span>ASP.NET Zero</span>
                  </span>}>
                <Menu.Item key="13">
                  <span>Home</span>
                </Menu.Item>
                <Menu.Item key="14">
                  <span>Description</span>
                </Menu.Item>
                <Menu.Item key="15">
                  <span>Features</span>
                </Menu.Item>
                <Menu.Item key="16">
                  <span>Pricing</span>
                </Menu.Item>
                <Menu.Item key="17">
                  <span>Faq</span>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <LayoutHeader collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content style={{ margin: '0 16px' }}>
          <Switch>
                {/* <Route path="/login" component={Logins} /> */}
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/users" component={Users} />
                <Route path="/tenants" component={Tenants} />
                <Route path="/roles" component={Roles} />
                <Route path="/about" component={About} />
              </Switch>
            {/* <div style={{ marginTop: 24, padding: 24, background: '#fff', minHeight: 360 }}>
              
            </div> */}
          </Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Asp.Net Boilerplate - React ©2018 <a href="https://github.com/ryoldash/module-zero-core-template">Github Page</a>
          </Layout.Footer>
        </Layout>
      </Layout>;
  }
}

export default withRouter<any>(LayoutComponent);
