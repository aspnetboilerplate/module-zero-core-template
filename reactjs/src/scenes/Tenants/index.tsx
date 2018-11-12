import * as React from "react";
import { inject, observer } from "mobx-react";

@inject("AuthenticationStores")
@observer
class Tenants extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <p>Tenant Component</p>
        )
    }

}


export default Tenants;
