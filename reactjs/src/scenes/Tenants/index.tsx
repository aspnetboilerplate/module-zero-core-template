import { Card, Col, Row, Modal, Button, Table, Tag, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import *as React from 'react';
import { EntityDto } from 'src/services/dto/entityDto';
import CreateOrUpdateTenant from "./components/createOrUpdateTenant"
import { inject, observer } from 'mobx-react';


@inject("TenantStores")
@observer
class Tenant extends React.Component<any> {
  constructor(props: any) {
    super(props);
   
  }
 state = {
  modalVisible: false,
   maxResultCount: 10,
   skipCount: 0
};


  async componentWillMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.TenantStores.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
  }
  handleTableChange = (pagination: any) => {

    this.setState({ skipCount: (pagination.current-1) * this.state.maxResultCount! }, async () => await this.getAll());
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
    ;
    this.props.TenantStores.delete(input);
  }

  public render() {
    const { tenants } = this.props.TenantStores;
;
    const columns = [{ title: 'Tenancy Name', dataIndex: 'tenancyName', key: 'tenancyName', width: 150, render: (text: string) => <div>
            {text}
          </div> }, { title: 'Name', dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>
            {text}
          </div> }, { title: 'Active', dataIndex: 'isActive', key: 'isActive', width: 150, render: (text: boolean) => (text == true ? <Tag color="#2db7f5">
              Yes
            </Tag> : <Tag color="red">No</Tag>) }, { title: 'Actions', width: 150, render: (text: string, item: any) => <div>
            <Dropdown trigger={['click']} overlay={<Menu>
                  <Menu.Item>
                    <a onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>Düzenle</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => this.delete({ id: item.id })}>Sil</a>
                  </Menu.Item>
                </Menu>} placement="bottomLeft">
              <Button type="primary" icon="setting">
                işlemler
              </Button>
            </Dropdown>
          </div> }];
    return <Card>
        <Row>
          <Col xs={{ span: 4, offset: 0 }} sm={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }} lg={{ span: 2, offset: 0 }} xl={{ span: 2, offset: 0 }} xxl={{ span: 2, offset: 0 }}>
            <h2>Tenants</h2>
          </Col>
          <Col xs={{ span: 14, offset: 0 }} sm={{ span: 15, offset: 0 }} md={{ span: 15, offset: 0 }} lg={{ span: 1, offset: 21 }} xl={{ span: 1, offset: 21 }} xxl={{ span: 1, offset: 21 }}>
            <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }} xxl={{ span: 24, offset: 0 }}>
            <Table size={'default'}
             bordered={true}
              pagination={{ 
                pageSize: this.state.maxResultCount, 
                total: tenants == undefined ? 0 : tenants.totalCount,
                defaultCurrent: 1 }} 
              columns={columns} 
              loading={tenants == undefined ? true : false} 
            dataSource={tenants == undefined ? [] : tenants.items} onChange={this.handleTableChange}/>
          </Col>
        </Row>
        <Modal visible={this.state.modalVisible} onCancel={() => this.setState({ modalVisible: false })} title={'User'} width={550}>
          <CreateOrUpdateTenant />
        </Modal>
      </Card>;
  }
}

export default Tenant;
