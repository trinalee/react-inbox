import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import store from "./store";
import {Provider} from "react-redux";
import {fetchMessages} from "./actions";
import {BrowserRouter as Router} from "react-router-dom";

store.dispatch(fetchMessages())

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
