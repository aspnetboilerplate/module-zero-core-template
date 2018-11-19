import * as React from 'react';
import { List } from 'antd';
import "./index.css";

export interface ListItem {
    title: string;
    body: string | React.ReactNode;
}

export interface IListExampleProps {
    value: ListItem[];
    header?: string;
    footer?: string;
}

class ListExample extends React.Component<IListExampleProps>{
    render() {
        return (
            <List
                header={this.props.header}
                footer={this.props.footer}
                split={false}
                size="small"
                dataSource={this.props.value}
                renderItem={(item: any) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                        />
                        {item.body}
                    </List.Item>
                )}
            />
        )
    }

}

export default ListExample;