import * as React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const data = [
  { name: 'Chrome', value: 50 },
  { name: 'Mozilla Firefox', value: 30 },
  { name: 'Opera Browser', value: 15 },
  { name: 'Other', value: 5 },
];

class PieChartExample extends React.Component<any> {
  state = {
    activeIndex: 0,
  };

  getInitialState() {
    return {
      activeIndex: 0,
    };
  }

  onPieEnter(data: any, index: any) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    return (
      <PieChart width={300} height={300}>
        <Pie dataKey="value" data={data} cx={150} cy={150} outerRadius={80} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    );
  }
}

export default PieChartExample;
