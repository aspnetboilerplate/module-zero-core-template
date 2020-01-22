import { createStackNavigator } from "react-navigation-stack";
import Login from "../../scenes/Login/login";
import { createDrawerNavigator } from "react-navigation-drawer";
import Dasboard from "../../scenes/Dashboard/Dashboard";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SideBar from "../sidebar/sidebar";
import React from "react";
import Users from "../../scenes/Users/users";
import Tenants from "../../scenes/Tenants/tenants";
import Roles from "../../scenes/Roles/roles";
import Loader from "../loader/loader";
import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import { httpServiceFunc } from "../../services/httpService";
import { Root } from "native-base";




const AppStack = createStackNavigator({ Login: Login });

const AuthStack = createDrawerNavigator({
  Dashboard: {
    screen: Dasboard,
  },
  User: {
    screen: Users
  },
  Tenants: {
    screen: Tenants
  },
  Roles: {
    screen: Roles,
  }
},
  {
    initialRouteName: "Dashboard",
    contentOptions: {
      activeTintColor: "red"
    },
    edgeWidth: 200,
    drawerBackgroundColor: "rgba(255,255,255,0)",
    contentComponent: (props) => <SideBar {...props} />

  });


const Routing = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: "App",
  }
));

interface Props {
}
interface State {
loading:boolean
}


export default class RoutingContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state={loading:false}
    const func = new httpServiceFunc();
    func.showFunction(()=>this.setState({loading:true}));
    func.hideFunction (()=>this.setState({loading:false}));
    //this functions callback 
  }
  render() {
   
    return (
      <Root>
        <Routing />
        <Loader loading={this.state.loading} />
      </Root>
    );
  }
}
