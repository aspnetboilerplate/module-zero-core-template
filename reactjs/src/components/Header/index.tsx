import * as React from 'react';
import { Col, Icon, Layout, Avatar, Menu, Dropdown, Badge } from 'antd';
import { Link } from 'react-router-dom';

export interface LayoutHeaderProps {
  collapsed?: any;
  toggle?: any;
}

const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Icon type="logout" />
      <span> <Link to="/login">Logout</Link></span>
    </Menu.Item>
  </Menu>
);

const languageMenu = (
  <Menu>
    <Menu.Item key="1">
      <span>English</span>
    </Menu.Item>
    <Menu.Item key="2">
      <span>Deutsch</span>
    </Menu.Item>
    <Menu.Item key="3">
      <span>Türkçe</span>
    </Menu.Item>
  </Menu>
);

export class LayoutHeader extends React.Component<LayoutHeaderProps> {
  render() {
    return (
      <Layout.Header style={{ background: '#fff', minHeight: 83, padding: 0 }}>
        <Col style={{ textAlign: 'left' }} span={12}>
          <Icon
            style={{ marginTop: 10, marginRight: 10, textAlign: 'left' }}
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
          />
        </Col>
        <Col style={{ margin: 15, marginLeft: 10, textAlign: 'right' }}>
          <Dropdown overlay={languageMenu} trigger={['click']}>
            <Icon style={{ margin: 20 }} type="global" />
          </Dropdown>
          <Dropdown overlay={userDropdownMenu} trigger={['click']}>
            <Badge style={{ margin: 10 }} count={3}>
              <Avatar style={{ margin: 10 }} size={48} alt={'profile'} src="https://sametkabay.com/images/smtkby/smtkby240.png" />
            </Badge>
          </Dropdown>
        </Col>
      </Layout.Header>
    );
  }
}

export default LayoutHeader;
