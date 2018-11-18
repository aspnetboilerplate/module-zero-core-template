import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import appInitializer from './appInitializer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import AuthenticationStores from './stores/authenticationStore';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import RoleStores from './stores/roleStore';
import TenantStores from './stores/tenantStore';
import UserStores from './stores/userStore';
import SessionStore from './stores/sessionStore';

appInitializer();

const stores = {
  AuthenticationStores,
  RoleStores,
  TenantStores,
  UserStores,
  SessionStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
