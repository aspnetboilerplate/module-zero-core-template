import * as React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import "./index.css"

export class Dashboard extends React.Component<any>{
    constructor(props: any) {
        super(props);
        setInterval(() => this.setState({ loading: false }), 1000);
    }
    state = {
        loading: true,
    }

    render() {
        const { loading } = this.state;
        return (
            <React.Fragment>

                <Row gutter={16}>
                    <Col
                        className={"dashboardCard"}
                        xs={{ offset: 2, span: 22 }}
                        sm={{ offset: 2, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard1"} bodyStyle={{ padding: 10 }} loading={loading} bordered={false}>
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
                        xs={{ offset: 2, span: 22 }}
                        sm={{ offset: 2, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard2"} bodyStyle={{ padding: 10 }} loading={loading} bordered={false}>
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
                        xs={{ offset: 2, span: 22 }}
                        sm={{ offset: 2, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard3"} bodyStyle={{ padding: 10 }} loading={loading} bordered={false}>
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
                        xs={{ offset: 2, span: 22 }}
                        sm={{ offset: 2, span: 22 }}
                        md={{ offset: 1, span: 11 }}
                        lg={{ offset: 1, span: 11 }}
                        xl={{ offset: 0, span: 6 }}
                        xxl={{ offset: 0, span: 6 }}
                    >
                        <Card className={"dasboardCard4"} bodyStyle={{ padding: 10 }} loading={loading} bordered={false}>
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
                    <Col className={"dasboardChart"}>
                    </Col>
                </Row>

            </React.Fragment>
        )
    }
}

export default Dashboard;