import * as React from 'react';

import { Input, Modal, Tabs, Form, Checkbox } from 'antd';
import { GetAllPermissionsOutput } from '../../../services/role/dto/getAllPermissionsOutput';
import { L } from '../../../lib/abpUtility';
import RoleStore from '../../../stores/roleStore';
import rules from './createOrUpdateRole.validation';
import { FormInstance } from 'antd/lib/form';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateRoleProps {
  roleStore: RoleStore;
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
  permissions: GetAllPermissionsOutput[];
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateRole extends React.Component<ICreateOrUpdateRoleProps> {
  state = {
    confirmDirty: false,
  };

  render() {
    const { permissions } = this.props;

    const options = permissions.map((x: GetAllPermissionsOutput) => {
      return { label: x.displayName, value: x.name };
    });

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    return (
      <Modal
        visible={this.props.visible}
        cancelText={L('Cancel')}
        okText={L('OK')}
        onCancel={this.props.onCancel}
        title={L('Role')}
        onOk={this.props.onOk}
        destroyOnClose={true}
      >
        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'role'} size={'small'} tabBarGutter={64}>
            <TabPane tab={L('RoleDetails')} key={'role'}>
              <Form.Item label={L('RoleName')} name={'name'} rules={rules.name} {...formItemLayout}>
                <Input />
              </Form.Item>
              <Form.Item label={L('DisplayName')} name={'displayName'} rules={rules.displayName} {...formItemLayout}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Description')} name={'description'} {...formItemLayout}>
                <Input />
              </Form.Item>
            </TabPane>
            <TabPane tab={L('RolePermission')} key={'permission'} forceRender={true}>
              <Form.Item {...tailFormItemLayout} name={'grantedPermissions'} valuePropName={'value'}>
                <Checkbox.Group options={options} />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateRole;
