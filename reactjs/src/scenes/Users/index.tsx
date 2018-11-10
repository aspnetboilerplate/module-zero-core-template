import * as React from "react";
import { inject, observer } from "mobx-react";

@inject("AuthenticationStores")
@observer
class Users extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <p>User Component</p>
        )
    }

}

export default Users;
