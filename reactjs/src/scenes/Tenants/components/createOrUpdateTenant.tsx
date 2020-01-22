import * as React from 'react';

import { Checkbox, Col, Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateTenant.validation';

export interface ICreateOrUpdateTenantProps extends FormComponentProps {
  visible: boolean;
  modalType: string;
  onCreate: () => void;
  onCancel: () => void;
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

    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, onCreate } = this.props;

    return (
      <Modal visible={visible} onCancel={onCancel} onOk={onCreate} title={L('Tenants')} width={550}>
        <Form>
          <FormItem label={L('TenancyName')} {...formItemLayout}>
            {this.props.form.getFieldDecorator('tenancyName', { rules: rules.tenancyName })(<Input />)}
          </FormItem>
          <FormItem label={L('Name')} {...formItemLayout}>
            {getFieldDecorator('name', { rules: rules.name })(<Input />)}
          </FormItem>
          {this.props.modalType === 'edit' ? (
            <FormItem label={L('AdminEmailAddress')} {...formItemLayout}>
              {getFieldDecorator('adminEmailAddress', { rules: rules.adminEmailAddress })(<Input />)}
            </FormItem>
          ) : null}
          {this.props.modalType === 'edit' ? (
            <FormItem label={L('DatabaseConnectionString')} {...formItemLayout}>
              {getFieldDecorator('connectionString')(<Input />)}
            </FormItem>
          ) : null}
          <FormItem label={L('IsActive')} {...tailFormItemLayout}>
            {getFieldDecorator('isActive', { valuePropName: 'checked' })(<Checkbox />)}
          </FormItem>
          <Col>{L('Default password is  123qwe')}</Col>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateTenantProps>()(CreateOrUpdateTenant);
