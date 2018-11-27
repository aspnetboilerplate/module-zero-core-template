import * as React from 'react';
import { Form, Input, Checkbox, Row, Divider, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { GetRoles } from 'src/services/user/dto/getRolesOuput';



class CreateOrUpdateUser extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    confirmDirty: false,
  };
  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { roles}=this.props
    debugger;
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
        xs: { span: 3 },
        sm: { span: 3 },
        md: { span: 3 },
        lg: { span: 3 },
        xl: { span: 3 },
        xxl: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 21 },
        md: { span: 21 },
        lg: { span: 21 },
        xl: { span: 21 },
        xxl: { span: 21 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, onCreate } = this.props;
    

    const options = roles.map((x:GetRoles)=>{
      
     var test= { label: x.displayName, value:x.normalizedName}
     return test;
    })
    return <Modal visible={visible} onCancel={onCancel} onOk={onCreate} title={"User"}>
        <Row style={{ marginTop: 10 }}>
          <FormItem label={'Name'} {...formItemLayout}>
            {getFieldDecorator('name', { rules: [{ required: true, message: 'Please input your name!' }] })(<Input />)}
          </FormItem>
          <FormItem label={'Surname'} {...formItemLayout}>
            {getFieldDecorator('surname', { rules: [{ required: true, message: 'Please input your surname!' }] })(<Input />)}
          </FormItem>
          <FormItem label={'User Name'} {...formItemLayout}>
            {getFieldDecorator('userName', { rules: [{ required: true, message: 'Please input your username!' }] })(<Input />)}
          </FormItem>
          <FormItem label={'Email'} {...formItemLayout}>
            {getFieldDecorator('emailAddress', { rules: [{ required: true, message: 'Please input your email!' }] })(<Input />)}
          </FormItem>
          {this.props.modalType == 'edit' ? <FormItem label="Password" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input type="password" />)}
            </FormItem> : null}
          {this.props.modalType == 'edit' ? <FormItem label="Confirm Password" {...formItemLayout}>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input type="password" />)}
            </FormItem> : null}
          <FormItem label={'isActive'} {...tailFormItemLayout}>
            {getFieldDecorator('isActive', { valuePropName: 'checked' })(<Checkbox>Aktif</Checkbox>)}
          </FormItem>
          {'Roller'}
          <Divider />
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('roleNames', { valuePropName: 'value' })(<CheckboxGroup options={options} />)}
          </FormItem>
        </Row>
      </Modal>;
  }
}

const nwUserInfoCreateOrEdit = Form.create()(CreateOrUpdateUser);
export default nwUserInfoCreateOrEdit;
