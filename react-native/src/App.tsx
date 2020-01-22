/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider } from 'mobx-react';
import initializeStores from './stores/storeInitializer';
import RoutingContainer from './components/routing/routingConfig';




const stores = initializeStores();
console.disableYellowBox = true;
interface Props {

}
interface State {
  appState:any
}

export default class App extends React.Component<Props,State> {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Provider {...stores}>
       
         <RoutingContainer/>
        
      </Provider>
    );
  }
}









