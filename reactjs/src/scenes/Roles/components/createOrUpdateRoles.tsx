import * as React from 'react';
import { Form, Input, Checkbox, Modal, Tabs } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import CheckboxGroup from 'antd/lib/checkbox/Group';
import { GetAllPermissionsOutput } from 'src/services/role/dto/getAllPermissionsOutput';
import { L } from 'src/lib/abpUtility';



const TabPane = Tabs.TabPane;
class CreateOrUpdateRoles extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  state = {
    confirmDirty: false,
  };

  render() {
    debugger;
    const { permission } = this.props;
    debugger;
    const options = permission.map((x: GetAllPermissionsOutput) => {
      var test = { label: x.displayName, value: x.name };
      return test;
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
    return <Modal 
    visible={this.props.visible} 
    cancelText={L('Cancel')} 
    okText={L('OK')} 
    onCancel={this.props.onCancel}  
    title={L('Role')} 
    onOk={this.props.onOk}>
        <Tabs defaultActiveKey={'Role'} size={'small'} tabBarGutter={64}>
        <TabPane tab={L('RoleDetails')} key={'role'}>
            <FormItem label={L('RoleName')} {...formItemLayout}>
              {getFieldDecorator('name', { rules: [{ required: true, message: 'Please input your name!' }] })(<Input />)}
            </FormItem>
            <FormItem label={L('DisplayName')} {...formItemLayout}>
              {getFieldDecorator('displayName', { rules: [{ required: true, message: 'Please input your surname!' }] })(<Input />)}
            </FormItem>
            <FormItem label={L('Description')} {...formItemLayout}>
              {getFieldDecorator('description', { rules: [{ required: true, message: 'Please input your username!' }] })(<Input />)}
            </FormItem>
          <FormItem label={L('IsActive')} {...tailFormItemLayout}>
              {getFieldDecorator('isStatic', {
                rules: [{ required: true, message: 'Please input your username!' }],
                valuePropName: 'checked',
              })(<Checkbox>Aktif</Checkbox>)}
            </FormItem>
          </TabPane>
        <TabPane tab={L('RolePermission')} key={'permission'}>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('permissions', { valuePropName: 'value' })(<CheckboxGroup options={options} />)}
            </FormItem>
          </TabPane>
        </Tabs>
      </Modal>;
  }
}

const nwUserInfoCreateOrEdit = Form.create()(CreateOrUpdateRoles);
export default nwUserInfoCreateOrEdit;
