import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './index.css';

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

const LanguageSelect = () => {
  return (
    <Dropdown overlay={languageMenu} trigger={['click']}>
      <Icon style={{ margin: 20 }} type="global" />
    </Dropdown>
  );
};

export default LanguageSelect;
