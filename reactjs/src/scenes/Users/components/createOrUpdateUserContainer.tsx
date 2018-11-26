
import { Tabs } from 'antd';
import CreateOrUpdateUser from './createOrUpdateUser';
import CreateOrUpdateUserRole from './createOrUpdateUserRole';
import * as React from 'react';



const TabPane = Tabs.TabPane;

class CreateOrUpdateUserContainer extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const tabs = [
      {
        tabName: 'Kullanıcı Bilgileri',
        key: 'userInfo',
        component: <CreateOrUpdateUser onCreate={this.props.onCreateonCreate} />,
      },
      {
        tabName: 'Roller',
        key: 'team',
        component: <CreateOrUpdateUserRole onChangeRole={this.props.onChangeRole} />,
      }
    ];

    const item = tabs.map((item: any) => (
      <TabPane
        tab={item.tabName}
        key={item.key}
        style={{ marginLeft: 25, marginRight: 25, width: 450 }}
      >
        {item.component}
      </TabPane>
    ));
    return (
      <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
        {item}
      </Tabs>
    );
  }
}

export default CreateOrUpdateUserContainer;
