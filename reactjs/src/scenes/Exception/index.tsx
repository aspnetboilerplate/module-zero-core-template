



import error404 from 'src/images/404.png';
import error401 from 'src/images/401.png';
import error500 from 'src/images/500.png';
import { Link } from 'react-router-dom';

import './index.css';
import  * as  React from 'react';
import { Row, Col, Avatar, Button } from 'antd';


const exception = [
  {
    errorCode: '404',
    errorImg: error404,
    errorDescription: 'Sorry, the page you visited does not exist',
  },
  {
    errorCode: '401',
    errorImg: error401,
    errorDescription: 'Kardeş, Nere gidiyon',
  },
  {
    errorCode: '500',
    errorImg: error500,
    errorDescription: 'Kardeş yavas , Sunucu Gitti',
  },
];

class Exception extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    let params = new URLSearchParams(this.props.location.search);
    const test = params.get('type');

    var error = exception.find(x => x.errorCode === test);

    if (error == null) {
      error = exception[0];
    }

    return (
      <Row style={{ marginTop: 150 }}>
        <Col
          xs={{ span: 7, offset: 1 }}
          sm={{ span: 7, offset: 1 }}
          md={{ span: 7, offset: 1 }}
          lg={{ span: 5, offset: 8 }}
          xl={{ span: 5, offset: 8 }}
          xxl={{ span: 5, offset: 8 }}
        >
          <Avatar shape="square" className={'errorAvatar'} src={error!.errorImg} />
        </Col>
        <Col
          xs={{ span: 7, offset: 1 }}
          sm={{ span: 7, offset: 1 }}
          md={{ span: 7, offset: 1 }}
          lg={{ span: 5, offset: 1 }}
          xl={{ span: 5, offset: 1 }}
          xxl={{ span: 5, offset: 1 }}
          style={{ marginTop: 75 }}
        >
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <h1 className={'errorTitle'}>{error!.errorCode}</h1>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <h5 className={'errorDescription'}> {error!.errorDescription}</h5>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Button type={'primary'}>
              <Link
                to={{
                  pathname: '/dashboard',
                }}
              >
                Back to Home
              </Link>
            </Button>
          </Col>
        </Col>
        <Col />
      </Row>
    );
  }
}

export default Exception;
