import React, {Component} from 'react'
import Message from './Message'
import Toolbars from './Toolbars'
import ComposeMessage from './ComposeMessage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Messages extends Component {
    render() {
        let {messages, composeMode} = this.props;

        return (
            <div>
                <Toolbars />
                {composeMode && <ComposeMessage />}
                {messages.all.map((message, index) =>
                    <Message
                    key={index}
                    index={index}
                    message={message} />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    composeMode: state.composeMode.composeMode
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages)