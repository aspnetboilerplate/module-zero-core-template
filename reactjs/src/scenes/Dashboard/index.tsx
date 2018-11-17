import * as React from 'react';
import { Row, Col, Card, Icon } from 'antd';

import "./index.css"
import LineChartExample from './LineChartExample';
import PieChartExample from './PieChartExample';
import BarChartExample from './BarChartExample';

export class Dashboard extends React.Component<any>{
    constructor(props: any) {
        super(props);
        setInterval(() => this.setState({ cardLoading: false }), 1000);
        setInterval(() => this.setState({ lineChartLoading: false }), 1500);
        setInterval(() => this.setState({ barChartLoading: false }), 2000);
        setInterval(() => this.setState({ pieChartLoading: false }), 1000);
    }
    state = {
        cardLoading: true,
        lineChartLoading: true,
        barChartLoading: true,
        pieChartLoading: true,
    }

    render() {
        const { cardLoading, lineChartLoading, barChartLoading, pieChartLoading } = this.state;
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col
                        className={"dashboardCard"}
                        xs={{ offset: 1, span: 22 }}
                        sm={{ offset: 1, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard-task"} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
                            <Col span={8}>
                                <Icon className={"dashboardCardIcon"} type="check" />
                            </Col>
                            <Col span={16}>
                                <p className={"dashboardCardName"}>New Task</p>
                                <label className={"dashboardCardCounter"}>125</label>
                            </Col>
                        </Card>
                    </Col>
                    <Col
                        className={"dashboardCard"}
                        xs={{ offset: 1, span: 22 }}
                        sm={{ offset: 1, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard-ticket"} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
                            <Col span={8}>
                                <Icon className={"dashboardCardIcon"} type="question" />
                            </Col>
                            <Col span={16}>
                                <p className={"dashboardCardName"}>New Ticket</p>
                                <label className={"dashboardCardCounter"}>257</label>
                            </Col>
                        </Card>
                    </Col>
                    <Col
                        className={"dashboardCard"}
                        xs={{ offset: 1, span: 22 }}
                        sm={{ offset: 1, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard-comment"} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
                            <Col span={8}>
                                <Icon className={"dashboardCardIcon"} type="message" />
                            </Col>
                            <Col span={16}>
                                <p className={"dashboardCardName"}>New Comments</p>
                                <label className={"dashboardCardCounter"}>243</label>
                            </Col>
                        </Card>
                    </Col>
                    <Col
                        className={"dashboardCard"}
                        xs={{ offset: 1, span: 22 }}
                        sm={{ offset: 1, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard-visitor"} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
                            <Col span={8}>
                                <Icon className={"dashboardCardIcon"} type="user-add" />
                            </Col>
                            <Col span={16}>
                                <p className={"dashboardCardName"}>New Visitors</p>
                                <label className={"dashboardCardCounter"}>1225</label>
                            </Col>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className={"dashboardBox"}>
                        <Card title="Visit Statistics" loading={lineChartLoading} bordered={false}>
                            <LineChartExample />
                        </Card >
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card title="Payment Statistics" className={"dashboardBox"} loading={barChartLoading} bordered={false}>
                            <BarChartExample />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Browser Usage" className={"dashboardBox"} loading={pieChartLoading} bordered={false}>
                            <PieChartExample />
                        </Card>

                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Dashboard;