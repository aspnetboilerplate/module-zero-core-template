import * as React from 'react';

import { Checkbox, Col, Form, Input, Modal } from 'antd';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateTenant.validation';

export interface ICreateOrUpdateTenantProps {
  visible: boolean;
  modalType: string;
  onCreate: () => Promise<void>;
  onCancel: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateTenant extends React.Component<ICreateOrUpdateTenantProps> {
  render() {
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

    const { visible, onCancel, onCreate, formRef } = this.props;

    return (
      <Modal visible={visible} onCancel={onCancel} onOk={onCreate} title={L('Tenants')} width={550}>
        <Form ref={formRef}>
          <Form.Item label={L('TenancyName')} name={'tenancyName'} rules={rules.tenancyName} {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Name')} name={'name'} rules={rules.name} {...formItemLayout}>
            <Input />
          </Form.Item>
          {this.props.modalType === 'edit' ? (
            <Form.Item label={L('AdminEmailAddress')} name={'adminEmailAddress'} rules={rules.adminEmailAddress as []} {...formItemLayout}>
              <Input />
            </Form.Item>
          ) : null}
          {this.props.modalType === 'edit' ? (
            <Form.Item label={L('DatabaseConnectionString')} name={'connectionString'} {...formItemLayout}>
              <Input />
            </Form.Item>
          ) : null}
          <Form.Item label={L('IsActive')} name={'isActive'} valuePropName={'checked'} {...tailFormItemLayout}>
            <Checkbox />
          </Form.Item>
          <Col>{L('Default password is  123qwe')}</Col>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateTenant;
