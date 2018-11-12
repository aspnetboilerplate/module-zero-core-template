import * as React from "react";
import { inject, observer } from "mobx-react";

@inject("AuthenticationStores")
@observer
class Rules extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <p>Rule Component</p>
        )
    }

}


export default Rules;
