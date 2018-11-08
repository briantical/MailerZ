import React, { Component, Fragment } from "react";
import "./App.css";

import Login from "./authentication/Login";
class App extends Component {
  render() {
    return (
      <Fragment className="App">
        <Login />
      </Fragment>
    );
  }
}

export default App;
