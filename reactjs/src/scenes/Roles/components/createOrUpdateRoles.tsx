import * as React from 'react';
import { Form, Input, Checkbox, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

class CreateOrUpdateRoles extends React.Component<any> {
  constructor(props: any) {
    super(props);
   
  }
state = {
  confirmDirty: false,
}
  compareToFirstPassword = (rule:any, value:any, callback:any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule:any, value:any, callback:any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
    return (
      
      <Row>
        <FormItem label={'Role Name'} {...formItemLayout}>
          {getFieldDecorator('roleName', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
          <Input   />)}
        </FormItem>
        <FormItem label={'Display Name'} {...formItemLayout}>
          {getFieldDecorator('displayName', {
            rules: [{ required: true, message: 'Please input your surname!' }],
          })(
          <Input   />)}
        </FormItem>
        <FormItem label={'Role Description'} {...formItemLayout}>
          {getFieldDecorator('roleDescription', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
          <Input    />)}
        </FormItem>
      
        <FormItem label={'isActive'} {...tailFormItemLayout}>
         
            {getFieldDecorator('password(repeat)', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
      
          <Checkbox  >
            Aktif
          </Checkbox>)}
        </FormItem>
       
      </Row>
    )
  }
}

const nwUserInfoCreateOrEdit = Form.create()(CreateOrUpdateRoles);
export default nwUserInfoCreateOrEdit;
