import * as React from 'react';
import { Form, Input, Checkbox, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';




class CreateOrUpdateUser extends React.Component<any> {
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
      }
      
    };
    const { getFieldDecorator } = this.props.form;
    return (
      
      <Row>
        <FormItem label={'Name'} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
          <Input   />)}
        </FormItem>
        <FormItem label={'Surname'} {...formItemLayout}>
          {getFieldDecorator('surname', {
            rules: [{ required: true, message: 'Please input your surname!' }],
          })(
          <Input   />)}
        </FormItem>
        <FormItem label={'User Name'} {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
          <Input    />)}
        </FormItem>
        <FormItem label={'Email'} {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
          <Input   />)}
        </FormItem>  
        <FormItem label="Password" {...formItemLayout}
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>     
        <FormItem label="Confirm Password"  {...formItemLayout}
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password"  />
          )}
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

const nwUserInfoCreateOrEdit = Form.create()(CreateOrUpdateUser);
export default nwUserInfoCreateOrEdit;
