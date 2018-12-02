import * as React from 'react';
import { Col, Icon, Avatar, Menu, Dropdown, Badge } from 'antd';
import { Link } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect';
import './index.css';
import { L } from 'src/lib/abpUtility';

export interface IHeaderProps {
  collapsed?: any;
  toggle?: any;
}

const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Link to="/logout">
        <Icon type="logout" />
        <span> {L('Logout')}</span>
      </Link>
    </Menu.Item>
  </Menu>
);

export class Header extends React.Component<IHeaderProps> {
  render() {
    return (
      <React.Fragment>
        <Col style={{ textAlign: 'left' }} span={12}>
          <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.toggle} />
        </Col>
        <Col style={{ margin: '0px 15px 0px 15px', marginLeft: 10, textAlign: 'right' }}>
          <LanguageSelect /> {'   '}
          <Dropdown overlay={userDropdownMenu} trigger={['click']}>
            <Badge style={{}} count={3}>
              <Avatar style={{}} size={24} alt={'profile'} src="https://sametkabay.com/images/smtkby/smtkby240.png" />
            </Badge>
          </Dropdown>
        </Col>
      </React.Fragment>
    );
  }
}

export default Header;
