import React from 'react';
import {Text} from 'react-native';
import { Button } from 'native-base';
import { NavigationStackProp } from 'react-navigation-stack';


export interface Props {
  navigation: NavigationStackProp;
}

export interface State {
 
}


export class Dasboard extends React.Component<Props, State> {

  constructor(props) {
    super(props);

  }

  render() {
    return (
     <Button  onPress={() => this.props.navigation.openDrawer()}><Text>asdasdasd12</Text></Button>
    );
  }
}



export default Dasboard;