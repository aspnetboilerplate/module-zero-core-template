import * as React from 'react';

import { Checkbox, Input, Modal, Tabs, Form } from 'antd';
import { GetRoles } from '../../../services/user/dto/getRolesOuput';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateUser.validation';
import { FormInstance } from 'antd/lib/form';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateUserProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  roles: GetRoles[];
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateUser extends React.Component<ICreateOrUpdateUserProps> {
  state = {
    confirmDirty: false,
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.formRef.current;
    
    if (value && value !== form!.getFieldValue('password')) {
      return Promise.reject('Two passwords that you enter is inconsistent!');
    }
    return Promise.resolve();
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { validateFields, getFieldValue } = this.props.formRef.current!;

    this.setState({
      confirmDirty: true,
    });

    if (value && this.state.confirmDirty && getFieldValue('confirm')) {
      validateFields(['confirm']);
    }

    return Promise.resolve();
  };

  render() {
    const { roles } = this.props;

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

    const { visible, onCancel, onCreate } = this.props;

    const options = roles.map((x: GetRoles) => {
      var test = { label: x.displayName, value: x.normalizedName };
      return test;
    });

    return (
      <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'User'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'User'} key={'userInfo'}>
              <Form.Item label={L('Name')} {...formItemLayout} name={'name'} rules={rules.name}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Surname')} {...formItemLayout} name={'surname'} rules={rules.surname}>
                <Input />
              </Form.Item>
              <Form.Item label={L('UserName')} {...formItemLayout} name={'userName'} rules={rules.userName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Email')} {...formItemLayout} name={'emailAddress'} rules={rules.emailAddress as []}>
                <Input />
              </Form.Item>
              {this.props.modalType === 'edit' ? (
                <Form.Item
                  label={L('Password')}
                  {...formItemLayout}
                  name={'password'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              ) : null}
              {this.props.modalType === 'edit' ? (
                <Form.Item
                  label={L('ConfirmPassword')}
                  {...formItemLayout}
                  name={'confirm'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your confirm password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              ) : null}
              <Form.Item label={L('IsActive')} {...tailFormItemLayout} name={'isActive'} valuePropName={'checked'}>
                <Checkbox>Aktif</Checkbox>
              </Form.Item>
            </TabPane>
            <TabPane tab={L('Roles')} key={'rol'} forceRender={true}>
              <Form.Item {...tailFormItemLayout} name={'roleNames'}>
                <Checkbox.Group options={options} />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateUser;
