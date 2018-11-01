import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import AuthenticationStores from "./stores/authenticationStore";
import { Provider } from "mobx-react";
import { HashRouter } from "react-router-dom";
const stores = {
  AuthenticationStores
};

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
