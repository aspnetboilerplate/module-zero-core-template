import * as React from "react";
import "./App.css";

class App extends React.Component {
  private logoSrc =
    "https://aspnetboilerplate.com/images/logos/abp-logo-long.png";
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.logoSrc} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to ASP.NET Boilerplate React.js Integration
          </h1>
        </header>
        <p className="App-intro">
          This is initial work of ABP React.js integration.
        </p>
      </div>
    );
  }
}

export default App;
