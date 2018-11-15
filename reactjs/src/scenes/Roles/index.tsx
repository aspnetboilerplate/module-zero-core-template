import { Card, Col, Row, Modal, Button, Table, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import *as React from 'react';
import { EntityDto } from 'src/services/dto/entityDto';
import CreateOrUpdateRules from "./components/createOrUpdateRoles"
import { observer, inject } from 'mobx-react';


@inject('RoleStores')
@observer
class Role extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount:0
  };

  async componentWillMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.RoleStores.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
  }
  handleTableChange = (pagination: any) => {

    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };
  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  createOrUpdateModalOpen(entityDto: EntityDto) {
    // if (entityDto.id == 0) {
    //   this.props.UserStores.onCreate();
    // } else {
    //   this.props.UserStores.getUserForEdit(entityDto);
    // }
    this.Modal();
  }

  delete(input: EntityDto) {
    debugger;
    this.props.RoleStores.delete(input);
  }
  public render() {
    const { roles } = this.props.RoleStores;
    ;
    const columns = [
      { title: 'Role Name', dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>{text}</div> },
      { title: 'Display Name', dataIndex: 'displayName', key: 'displayName', width: 150, render: (text: string) => <div>{text}</div> },
      {
        title: 'Actions',
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item>
                    <a onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>Düzenle</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => this.delete({ id: item.id })}>Sil</a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon="setting">
                işlemler
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];
    return <Card>
        <Row>
          <Col xs={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 2, offset: 0 }} xl={{ span: 2, offset: 0 }} xxl={{ span: 2, offset: 0 }}>
            <h2>Roles</h2>
          </Col>
          <Col xs={{ span: 14, offset: 0 }} sm={{ span: 15, offset: 0 }} md={{ span: 15, offset: 0 }} lg={{ span: 1, offset: 21 }} xl={{ span: 1, offset: 21 }} xxl={{ span: 1, offset: 21 }}>
            <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }} xxl={{ span: 24, offset: 0 }}>
          <Table size={'default'} bordered={true} pagination={{ pageSize: this.state.maxResultCount, total: roles == undefined ? 0 : roles.totalCount, defaultCurrent: 1 }} columns={columns} loading={roles == undefined ? true : false} dataSource={roles == undefined ? [] : roles.items} onChange={this.handleTableChange} />
          </Col>
        </Row>
        <Modal visible={this.state.modalVisible} onCancel={() => this.setState({ modalVisible: false })} title={'User'} width={550}>
          <CreateOrUpdateRules />
        </Modal>
      </Card>;
  }
}

export default Role;
