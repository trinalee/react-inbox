import React from "react";
import "./App.css";
import Toolbars from "./components/Toolbars";
import Messages from "./components/Messages";
import ComposeMessage from "./components/ComposeMessage";
import {Route} from "react-router-dom";

const App = () => (
        <div className="App">
            <Route path="/"  component={Toolbars}/>
            <Route path="/compose" exact component={ComposeMessage}/>
            <Route path="/"  component={Messages}/>
        </div>
);

export default App;

