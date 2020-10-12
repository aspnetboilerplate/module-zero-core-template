import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateRole from './components/createOrUpdateRole';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import RoleStore from '../../stores/roleStore';
import Stores from '../../stores/storeIdentifier';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

export interface IRoleProps {
  roleStore: RoleStore;
}

export interface IRoleState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  roleId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.RoleStore)
@observer
class Role extends AppComponentBase<IRoleProps, IRoleState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    roleId: 0,
    filter: ''
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.roleStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      this.props.roleStore.createRole();
      await this.props.roleStore.getAllPermissions();
    } else {
      await this.props.roleStore.getRoleForEdit(entityDto);
      await this.props.roleStore.getAllPermissions();
    }

    this.setState({ roleId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({
        ...this.props.roleStore.roleEdit.role,
        grantedPermissions: this.props.roleStore.roleEdit.grantedPermissionNames,
      });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.roleStore.delete(input);
      },
      onCancel() {},
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => {
      if (this.state.roleId === 0) {
        await this.props.roleStore.create(values);
      } else {
        await this.props.roleStore.update({ id: this.state.roleId, ...values });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { allPermissions, roles } = this.props.roleStore;
    const columns = [
      { title: L('RoleName'), dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('DisplayName'), dataIndex: 'displayName', key: 'displayName', width: 150, render: (text: string) => <div>{text}</div> },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            <h2>{L('Roles')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey="id"
              bordered={true}
              pagination={{ pageSize: this.state.maxResultCount, total: roles === undefined ? 0 : roles.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={roles === undefined ? true : false}
              dataSource={roles === undefined ? [] : roles.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateRole
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.roleId === 0 ? 'edit' : 'create'}
          onOk={this.handleCreate}
          permissions={allPermissions}
          roleStore={this.props.roleStore}
          formRef={this.formRef}
        />
      </Card>
    );
  }
}

export default Role;
