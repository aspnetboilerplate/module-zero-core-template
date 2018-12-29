import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import classNames from 'classnames';
import './index.less';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';
import UserStore from 'src/stores/userStore';
import { inject } from 'mobx-react';
import Stores from 'src/stores/storeIdentifier';
import { L } from 'src/lib/abpUtility';

export interface ILanguageSelectProps {
  userStore?: UserStore;
}

@inject(Stores.UserStore)
class LanguageSelect extends React.Component<ILanguageSelectProps> {
  get languages() {
    return abp.localization.languages.filter(val => {
      return !val.isDisabled;
    });
  }

  async changeLanguage(languageName: string) {
    await this.props.userStore!.changeLanguage(languageName);

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
        <Icon type="global" className={classNames('dropDown', 'className')} title={L('Languages')} />
      </Dropdown>
    );
  }
}

export default LanguageSelect;
