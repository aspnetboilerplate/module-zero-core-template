import React from 'react';
import {Text} from 'react-native';
import { Button } from 'native-base';
import { NavigationStackProp } from 'react-navigation-stack';


export interface Props {
  navigation: NavigationStackProp;
}

export interface State {
 
}


export class Tenants extends React.Component<Props, State> {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      
    <Text>Tenants</Text>
    );
  }
}



export default Tenants;