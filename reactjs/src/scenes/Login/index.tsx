import './index.less';

import * as React from 'react';

import { Button, Card, Checkbox, Col, Form, Icon, Input, Modal, Row } from 'antd';
import { inject, observer } from 'mobx-react';

import AccountStore from '../../stores/accountStore';
import AuthenticationStore from '../../stores/authenticationStore';
import { FormComponentProps } from 'antd/lib/form';
import { L } from '../../lib/abpUtility';
import { Redirect } from 'react-router-dom';
import SessionStore from '../../stores/sessionStore';
import Stores from '../../stores/storeIdentifier';
import TenantAvailabilityState from '../../services/account/dto/tenantAvailabilityState';
import rules from './index.validation';

const FormItem = Form.Item;
declare var abp: any;

export interface ILoginProps extends FormComponentProps {
  authenticationStore?: AuthenticationStore;
  sessionStore?: SessionStore;
  accountStore?: AccountStore;
  history: any;
  location: any;
}

@inject(Stores.AuthenticationStore, Stores.SessionStore, Stores.AccountStore)
@observer
class Login extends React.Component<ILoginProps> {
  changeTenant = async () => {
    let tenancyName = this.props.form.getFieldValue('tenancyName');
    const { loginModel } = this.props.authenticationStore!;

    if (!tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      window.location.href = '/';
      return;
    } else {
      await this.props.accountStore!.isTenantAvailable(tenancyName);
      const { tenant } = this.props.accountStore!;
      switch (tenant.state) {
        case TenantAvailabilityState.Available:
          abp.multiTenancy.setTenantIdCookie(tenant.tenantId);
          loginModel.tenancyName = tenancyName;
          loginModel.toggleShowModal();
          window.location.href = '/';
          return;
        case TenantAvailabilityState.InActive:
          Modal.error({ title: L('Error'), content: L('TenantIsNotActive') });
          break;
        case TenantAvailabilityState.NotFound:
          Modal.error({ title: L('Error'), content: L('ThereIsNoTenantDefinedWithName{0}', tenancyName) });
          break;
      }
    }
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { loginModel } = this.props.authenticationStore!;
    await this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        await this.props.authenticationStore!.login(values);
        sessionStorage.setItem('rememberMe', loginModel.rememberMe ? '1' : '0');
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : '/';
      }
    });
  };

  public render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.authenticationStore!.isAuthenticated) return <Redirect to={from} />;

    const { loginModel } = this.props.authenticationStore!;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col className="name">
        <Form className="" onSubmit={this.handleSubmit}>
          <Row>
            <Row style={{ marginTop: 100 }}>
              <Col span={8} offset={8}>
                <Card>
                  <Row>
                    {!!this.props.sessionStore!.currentLogin.tenant ? (
                      <Col span={24} offset={0} style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={loginModel.toggleShowModal}>
                          {L('CurrentTenant')} : {this.props.sessionStore!.currentLogin.tenant.tenancyName}
                        </Button>
                      </Col>
                    ) : (
                      <Col span={24} offset={0} style={{ textAlign: 'center' }}>
                        <Button type="link" onClick={loginModel.toggleShowModal}>
                          {L('NotSelected')}
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row>
              <Modal
                visible={loginModel.showModal}
                onCancel={loginModel.toggleShowModal}
                onOk={this.changeTenant}
                title={L('ChangeTenant')}
                okText={L('OK')}
                cancelText={L('Cancel')}
              >
                <Row>
                  <Col span={8} offset={8}>
                    <h3>{L('TenancyName')}</h3>
                  </Col>
                  <Col>
                    <FormItem>
                      {getFieldDecorator('tenancyName', {})(
                        <Input placeholder={L('TenancyName')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                      )}
                    </FormItem>
                    {!getFieldValue('tenancyName') ? <div>{L('LeaveEmptyToSwitchToHost')}</div> : ''}
                  </Col>
                </Row>
              </Modal>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col span={8} offset={8}>
                <Card>
                  <div style={{ textAlign: 'center' }}>
                    <h3>{L('WellcomeMessage')}</h3>
                  </div>
                  <FormItem>
                    {getFieldDecorator('userNameOrEmailAddress', { rules: rules.userNameOrEmailAddress })(
                      <Input placeholder={L('UserNameOrEmail')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                    )}
                  </FormItem>

                  <FormItem>
                    {getFieldDecorator('password', { rules: rules.password })(
                      <Input
                        placeholder={L('Password')}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        size="large"
                      />
                    )}
                  </FormItem>
                  <Row style={{ margin: '0px 0px 10px 15px ' }}>
                    <Col span={12} offset={0}>
                      <Checkbox checked={loginModel.rememberMe} onChange={loginModel.toggleRememberMe} style={{ paddingRight: 8 }} />
                      {L('RememberMe')}
                      <br />
                      <a>{L('ForgotPassword')}</a>
                    </Col>

                    <Col span={8} offset={4}>
                      <Button style={{ backgroundColor: '#f5222d', color: 'white' }} htmlType={'submit'} type="danger">
                        {L('LogIn')}
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Row>
        </Form>
      </Col>
    );
  }
}

export default Form.create()(Login);
