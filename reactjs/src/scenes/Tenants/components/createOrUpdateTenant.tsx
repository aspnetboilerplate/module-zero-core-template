import * as React from 'react';
import { Form, Input, Checkbox,Col, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { L } from 'src/lib/abpUtility';


export declare type ModalType  = 'edit' | 'create';


class CreateOrUpdateTenant extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
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
     
      return <Modal visible={visible} onCancel={onCancel} onOk={onCreate} title={'User'} width={550}>
          <Form>
          <FormItem label={L('TenancyName')} {...formItemLayout}>
              {this.props.form.getFieldDecorator('tenancyName', { rules: [{ required: true, message: 'Please input your name!' }] })(<Input />)}
            </FormItem>
          <FormItem label={L('Name')} {...formItemLayout}>
              {getFieldDecorator('name', { rules: [{ required: true, message: 'Please input your surname!' }] })(<Input />)}
            </FormItem>
          {this.props.modalType == 'edit' ? <FormItem label={L('AdminEmailAddress')} {...formItemLayout}>
                {getFieldDecorator('adminEmailAddress', {
                  rules: [{ type: 'email', required: true, message: 'Please input your username!' }],
                })(<Input />)}
              </FormItem> : null}
            {this.props.modalType == 'edit' ? <FormItem label={L('DatabaseConnectionString')} {...formItemLayout}>
                {getFieldDecorator('connectionString')(<Input />)}
              </FormItem> : null}
          <FormItem label={L('IsActive')} {...tailFormItemLayout}>
              {getFieldDecorator('isActive', { valuePropName: 'checked' })(<Checkbox>Aktif</Checkbox>)}
            </FormItem>
            <Col>{'Default password is  123qwe'}</Col>
          </Form>
        </Modal>;
     
  }
}

const nwUserInfoCreateOrEdit = Form.create()(CreateOrUpdateTenant);
export default nwUserInfoCreateOrEdit;
