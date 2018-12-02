import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import classNames from 'classnames';
import './index.less';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';

class LanguageSelect extends React.Component {
  get languages() {
    return abp.localization.languages.filter(val => {
      return !val.isDisabled;
    });
  }

  changeLanguage(languageName: string) {
    abp.utils.setCookieValue(
      'Abp.Localization.CultureName',
      languageName,
      new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
      abp.appPath
    );
    location.reload();
  }
  get currentLanguage() {
    return abp.localization.currentLanguage;
  }

  render() {
    const langMenu = (
      <Menu className={'menu'} selectedKeys={[this.currentLanguage.name]}>
        {this.languages.map((item: any) => (
          <Menu.Item key={item.name}>
            <a onClick={() => this.changeLanguage(item.name)}>
              <i className={item.icon} /> {item.displayName}
            </a>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <Icon type="global" className={classNames('dropDown', 'className')} title={'Diller'} />
      </Dropdown>
    );
  }
}

export default LanguageSelect;
