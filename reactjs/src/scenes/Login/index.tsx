import { Form, Col, Input, Icon, Row, Checkbox, Button, Card, Modal, message } from 'antd';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import accountService from 'src/services/account/accountService';
import Stores from 'src/stores/storeIdentifier';
import AuthenticationStore from 'src/stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';
import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;

export interface ILoginProps extends FormComponentProps {
  authenticationStore?: AuthenticationStore;
  history: any;
  location: any;
}

@inject(Stores.AuthenticationStore)
@observer
class Login extends React.Component<ILoginProps, any> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      modalVisible: false,
      rememberMe: true,
      tenancyName: '',
    };
  }

  rememberMeCheck = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  isTenantAvaible = async () => {
    var tenancyName = this.props.form.getFieldValue('tenancyName');
    var result = await accountService.isTenantAvailable({ tenancyName: tenancyName });

    console.log(result);
    if (result.tenantId != null) {
      this.setState({ tenancyName: tenancyName });
      this.onModal();
    } else {
      message.error('Tenant Bulunamadı');
    }
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    await this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        await this.props.authenticationStore!.login(values);
        sessionStorage.setItem('rememberMe', this.state.rememberMe ? '1' : '0');
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : '/';
      }
    });
  };
  onModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  public render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;

    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <Row style={{ height: '100vh', backgroundColor: '#00bcd4' }}>
          <Row style={{ marginTop: 100 }}>
            <Col
              xs={{ span: 8, offset: 8 }}
              sm={{ span: 8, offset: 8 }}
              md={{ span: 8, offset: 8 }}
              lg={{ span: 8, offset: 8 }}
              xl={{ span: 8, offset: 8 }}
              xxl={{ span: 8, offset: 8 }}
            >
              <Card>
                <Row>
                  <Col
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 24, offset: 0 }}
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 24, offset: 0 }}
                    xl={{ span: 24, offset: 0 }}
                    xxl={{ span: 24, offset: 0 }}
                    style={{ textAlign: 'center' }}
                  >
                    Current Tenant : {this.state.tenancyName} <a onClick={this.onModal}>(Change)</a>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Modal visible={this.state.modalVisible} onCancel={this.onModal} onOk={this.isTenantAvaible}>
              <Row>
                <Col
                  xs={{ span: 8, offset: 8 }}
                  sm={{ span: 8, offset: 8 }}
                  md={{ span: 8, offset: 8 }}
                  lg={{ span: 8, offset: 8 }}
                  xl={{ span: 8, offset: 8 }}
                  xxl={{ span: 8, offset: 8 }}
                  style={{ textAlign: 'center' }}
                >
                  <h3>{'Tenant Name'}</h3>
                </Col>
                <Col>
                  <FormItem>
                    {getFieldDecorator('tenancyName', {})(
                      <Input placeholder={'Tenant Name'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Modal>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col
              xs={{ span: 8, offset: 8 }}
              sm={{ span: 8, offset: 8 }}
              md={{ span: 8, offset: 8 }}
              lg={{ span: 8, offset: 8 }}
              xl={{ span: 8, offset: 8 }}
              xxl={{ span: 8, offset: 8 }}
            >
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <h3>{'Login'}</h3>
                </div>
                <FormItem>
                  {getFieldDecorator('userNameOrEmailAddress', {
                    rules: [
                      {
                        required: true,
                        message: 'User Name is required.',
                      },
                    ],
                  })(
                    <Input
                      placeholder={'Kullanıcı adı veya mail adresi'}
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      size="large"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Password is is required.' }],
                  })(<Input placeholder={'Şifre'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" size="large" />)}
                </FormItem>
                <Row style={{ margin: '0px 0px 10px 15px ' }}>
                  <Col
                    xs={{ span: 12, offset: 0 }}
                    sm={{ span: 12, offset: 0 }}
                    md={{ span: 12, offset: 0 }}
                    lg={{ span: 12, offset: 0 }}
                    xl={{ span: 12, offset: 0 }}
                    xxl={{ span: 12, offset: 0 }}
                  >
                    <Checkbox checked={this.state.rememberMe} onChange={this.rememberMeCheck} />
                    {'RememberMe'}
                  </Col>
                  <Col
                    xs={{ span: 8, offset: 4 }}
                    sm={{ span: 8, offset: 4 }}
                    md={{ span: 8, offset: 4 }}
                    lg={{ span: 8, offset: 4 }}
                    xl={{ span: 8, offset: 4 }}
                    xxl={{ span: 8, offset: 4 }}
                  >
                    <Button style={{ backgroundColor: '#f5222d', color: 'white' }} htmlType={'submit'} type="danger">
                      Login
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(Login);
