import * as React from 'react';

import { Form, Input, Modal, Tabs } from 'antd';

import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { GetAllPermissionsOutput } from '../../../services/role/dto/getAllPermissionsOutput';
import { L } from '../../../lib/abpUtility';
import RoleStore from '../../../stores/roleStore';
import rules from './createOrUpdateRole.validation';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateRoleProps extends FormComponentProps {
  roleStore: RoleStore;
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
  permissions: GetAllPermissionsOutput[];
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

    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={this.props.visible}
        cancelText={L('Cancel')}
        okText={L('OK')}
        onCancel={this.props.onCancel}
        title={L('Role')}
        onOk={this.props.onOk}
      >
        <Tabs defaultActiveKey={'role'} size={'small'} tabBarGutter={64}>
          <TabPane tab={L('RoleDetails')} key={'role'}>
            <FormItem label={L('RoleName')} {...formItemLayout}>
              {getFieldDecorator('name', { rules: rules.name })(<Input />)}
            </FormItem>
            <FormItem label={L('DisplayName')} {...formItemLayout}>
              {getFieldDecorator('displayName', { rules: rules.displayName })(<Input />)}
            </FormItem>
            <FormItem label={L('Description')} {...formItemLayout}>
              {getFieldDecorator('description')(<Input />)}
            </FormItem>
          </TabPane>
          <TabPane tab={L('RolePermission')} key={'permission'}>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('grantedPermissions', { valuePropName: 'value' })(<CheckboxGroup options={options} />)}
            </FormItem>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateRoleProps>()(CreateOrUpdateRole);
