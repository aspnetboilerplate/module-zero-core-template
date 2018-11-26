import { Card, Col, Row, Button, Table, Tag, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import *as React from 'react';
import CreateOrUpdateUser from './components/createOrUpdateUser';
import { EntityDto } from 'src/services/dto/entityDto';
import { observer, inject } from 'mobx-react';




@inject("UserStores")
@observer
class Team extends React.Component<any> {
  formRef: any;
  constructor(props: any) {
    super(props);
   
  }
 state = {
  modalVisible: false,
  maxResultCount: 10,
  skipCount: 0,
  userId:0

};
  async componentWillMount(){
  await this.getAll();
  } 

  async getAll(){
    await this.props.UserStores.getAll({maxResultCount:this.state.maxResultCount,skipCount:this.state.skipCount});
  }
  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };
  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };
  setPermissions() {
    this.props.UserStores.updateUserPermissions();
    this.Modal();
  }
  async createOrUpdateModalOpen(entityDto: EntityDto) {
    
    if (entityDto.id == 0) {
      await this.props.UserStores.createUser();
      await this.props.UserStores.getRoles();
    }
    else {
      await this.props.UserStores.get(entityDto);
      await this.props.UserStores.getRoles();
    }
    this.setState({ userId: entityDto.id });
    this.Modal();
    
    debugger;
    this.formRef.props.form.setFieldsValue({ ...this.props.UserStores.editUser, roleNames: this.props.UserStores.editUser.roleNames });
    
  }

  
  delete(input: EntityDto) {
    this.props.UserStores.delete(input);
  }
  handleCreate= ()=> {
   
    debugger;
    const form = this.formRef.props.form;

    form.validateFields(async (err: any, values: any) => {
      debugger;
      if (err) {
        return;
      }
      else {
        if (this.state.userId == 0) {
          await this.props.UserStores.create(values);
        }
        else {
          await this.props.UserStores.update({ id: this.state.userId, ...values });
        }
      }
      await this.getAll();
      this.setState({ modalVisible: false });
      form.resetFields();
    });
  }

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  }
  public render() {

    const { users } = this.props.UserStores;
    const columns = [
     
      {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: 'Email Adress',
        dataIndex: 'surname',
        key: 'surname',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: 'Active',
        dataIndex: 'isActive',
        key: 'isActive',
        width: 150,
        render: (text: boolean) =>
          text == true ? <Tag color="#2db7f5">Yes</Tag> : <Tag color="red">No</Tag>,
      },
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
      }
    ];
    return <Card>
        <Row>
          <Col xs={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 2, offset: 0 }} xl={{ span: 2, offset: 0 }} xxl={{ span: 2, offset: 0 }}>
            {' '}
            <h2>Users</h2>
          </Col>
          <Col xs={{ span: 14, offset: 0 }} sm={{ span: 15, offset: 0 }} md={{ span: 15, offset: 0 }} lg={{ span: 1, offset: 21 }} xl={{ span: 1, offset: 21 }} xxl={{ span: 1, offset: 21 }}>
            <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }} xxl={{ span: 24, offset: 0 }}>
            <Table size={'default'} bordered={true} columns={columns} pagination={{ pageSize: 10, total: users == undefined ? 0 : users.totalCount, defaultCurrent: 1 }} loading={users == undefined ? true : false} dataSource={users == undefined ? [] : users.items} onChange={this.handleTableChange} />
          </Col>
        </Row>
        <CreateOrUpdateUser 
        wrappedComponentRef={this.saveFormRef} 
        visible={this.state.modalVisible} 
        onCancel={() => this.setState({
              modalVisible: false,
            })} 
            modalType={this.state.userId == 0 ? 'edit' : 'create'} 
        onCreate={this.handleCreate}
        roles={this.props.UserStores.roles} />
      </Card>;
  }
}

export default Team;
