import * as React from 'react';
import { Spin } from 'antd';

const Loading = () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);

export default Loading;
