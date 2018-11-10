import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import "./index.css";
import { Route, Switch, withRouter } from 'react-router';
import Logins from '../Login';
import Users from '../Users';
import Tenants from '../Tenants';
import Rules from '../Rules';

const { Header, Sider, Content } = Layout;

class LayoutComponent extends React.Component<any> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span onClick={() => this.props.history.push("/")}>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span onClick={() => this.props.history.push("/tenants")}>Tenants</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span onClick={() => this.props.history.push("/users")}>Users</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="upload" />
              <span onClick={() => this.props.history.push("/rules")}>Rules</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path="/login" component={Logins} />
              <Route path="/users" component={Users} />
              <Route path="/tenants" component={Tenants} />
              <Route path="/rules" component={Rules} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter<any>(LayoutComponent);
