import './index.less';

import * as React from 'react';

import { Avatar, Button, Col, Row } from 'antd';

import { Link } from 'react-router-dom';
import error401 from '../../images/401.png';
import error404 from '../../images/404.png';
import error500 from '../../images/500.png';

class Exception extends React.Component<any, any> {
  public render() {
    const exception = [
      { errorCode: '404', errorImg: error404, errorDescription: 'Sorry, the page you visited does not exist' },
      {
        errorCode: '401',
        errorImg: error401,
        errorDescription: 'Sorry, you dont have access to this page',
      },
      { errorCode: '500', errorImg: error500, errorDescription: 'Sorry, the server is reporting an error' },
    ];

    let params = new URLSearchParams(this.props.match.params.type);
    const type = params.get('type');
    let error = exception.find(x => x.errorCode === type);

    if (error == null) {
      error = exception[0];
    }

    return (
      <Row style={{ marginTop: 150 }}>
        <Col
          xs={{ span: 7, offset: 1 }}
          sm={{ span: 7, offset: 1 }}
          md={{ span: 7, offset: 1 }}
          lg={{ span: 10, offset: 4 }}
          xl={{ span: 10, offset: 4 }}
          xxl={{ span: 10, offset: 4 }}
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
                  pathname: '/',
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
