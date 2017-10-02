import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {readMessage, toggleSelected, toggleStar} from "../actions";
import {Link, Route} from "react-router-dom";

const Message = ({index, message, toggleSelected, toggleStar, readMessage, messageRead}) => {
    let {subject, read, starred, labels, selected} = message;
    return (
        <div>
            <div className={`row message ${read ? 'read' : 'unread'} ${selected ? 'selected' : ''}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox"
                                   checked={selected ? true : false}
                                   onClick={() => toggleSelected(index)}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${starred ? 'fa-star' : 'fa-star-o'}`}
                               onClick={() => {
                                   toggleStar(index, message)
                               }}/>
                        </div>
                    </div>
                </div>
                <Link to={`/messages/${index + 1}`} onClick={() => readMessage(index)}>
                    <div className="col-xs-11">
                        {labels.map((label, index) =>
                            (<span key={index} className="label label-warning">{label}</span>))}
                        <a href="#">
                            {subject}
                        </a>
                    </div>
                </Link>
            </div>
            <Route path="/messages/:messageId" render={({match}) => {

                if (!messageRead) {
                    readMessage(match.params.messageId -1);
                    return;
                }

                return (
                    (messageRead.id === index + 1) &&
                    <div className="row message-body">
                        <div className="col-xs-11 col-xs-offset-1">
                            { messageRead.body }
                        </div>
                    </div>
                )
            }
            }/>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
    messageRead: state.messageRead.messageRead
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSelected,
    toggleStar,
    readMessage
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)