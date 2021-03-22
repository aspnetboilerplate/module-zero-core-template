import './index.less';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';

import * as React from 'react';

import { Dropdown, Menu } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import UserStore from '../../stores/userStore';
import classNames from 'classnames';
import { inject } from 'mobx-react';

declare var abp: any;

export interface ILanguageSelectProps {
  userStore?: UserStore;
}

@inject(Stores.UserStore)
class LanguageSelect extends React.Component<ILanguageSelectProps> {
  get languages() {
    return abp.localization.languages.filter((val: any) => {
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

    window.location.reload();
  }

  get currentLanguage() {
    return abp.localization.currentLanguage;
  }

  render() {
    const langMenu = (
      <Menu className={'menu'} selectedKeys={[this.currentLanguage.name]}>
        {this.languages.map((item: any) => (
          <Menu.Item key={item.name} onClick={() => this.changeLanguage(item.name)}>
            <i className={item.icon} /> {item.displayName}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <GlobalOutlined className={classNames('dropDown', 'className')} title={L('Languages')} />
      </Dropdown>
    );
  }
}

export default LanguageSelect;
