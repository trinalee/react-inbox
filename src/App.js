import React from "react";
import "./App.css";
import Messages from "./components/Messages";
import { connect } from 'react-redux'

const App = ({ messages }) => (
    (messages.length) ?
        (
            <div className="App">
                <Messages messages={ messages }/>
            </div>
        ) :
        (<div>Loading...</div>)
)

const mapStateToProps = state => ({
    messages: state.messages.all
})

const mapDispatchToProps = () => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
