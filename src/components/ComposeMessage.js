import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {sendMessage} from '../actions'

const ComposeMessage = ({sendMessage}) => {
    return (
        <form className="form-horizontal well" onSubmit={(e) => {
            e.preventDefault();
            sendMessage(e.target.subject.value, e.target.body.value)
        }}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject"
                       className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text"
                           className="form-control"
                           id="subject"
                           placeholder="Enter a subject"
                           name="subject"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body"
                       className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body"
                              id="body"
                              className="form-control"/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit"
                           value="Send"
                           className="btn btn-primary"/>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    sendMessage
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComposeMessage)