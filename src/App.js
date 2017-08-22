import React, {Component} from "react";
import "./App.css";
import Messages from "./components/Messages";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Messages />
      </div>
    );
  }
}

export default App;
