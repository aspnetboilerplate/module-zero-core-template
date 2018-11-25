import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import appInitializer from './appInitializer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import initializeStores from './stores/storeInitializer';

appInitializer();

const stores = initializeStores();

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
