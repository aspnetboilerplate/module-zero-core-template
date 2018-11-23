import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import appInitializer from './appInitializer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import initializeStores from './stores/storeInitializer';

appInitializer();

const stores = initializeStores();

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
