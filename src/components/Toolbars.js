import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

import {
    applyLabel,
    clearReadMessage,
    composeModeToggle,
    deleteSelected,
    markAsRead,
    markAsUnread,
    removeLabel,
    toggleAll
} from "../actions";

export class Toolbars extends Component {
    render() {
        let {
            messages,
            toggleAll,
            markAsRead,
            markAsUnread,
            deleteSelected,
            applyLabel,
            removeLabel,
            location,
            clearReadMessage
        } = this.props;

        const unreadCount = messages.all ?
            messages.all.reduce((count, message) => {
                if (message.read === false) {
                    return count + 1
                } else {
                    return count
                }
            }, 0) : 0;

        const selectedMessage = messages.all ?
            messages.all.every(message => message.selected === true) ? "all" :
                messages.all.every(message => message.selected === false
                || message.selected === undefined) ? "none" : "some"
            : "none";

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadCount}
                        </span>{`unread message${unreadCount === 1 ? "" : "s"}`}
                    </p>
                    <Link className="btn btn-danger"
                          to= {location.pathname === '/compose' ? '/' : '/compose'}
                          onClick={clearReadMessage}>
                        <i className="fa fa-plus"></i>
                    </Link>
                    <button className="btn btn-default"
                            onClick={toggleAll}>
                        <i className={`fa ${selectedMessage === "all" ? "fa-check-square-o" :
                            selectedMessage === "none" ? "fa-square-o" : "fa-minus-square-o"}`}/>
                    </button>
                    <button className="btn btn-default"
                            disabled={selectedMessage === "none"}
                            onClick={() => markAsRead(messages)}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default"
                            disabled={selectedMessage === "none"}
                            onClick={() => markAsUnread(messages)}>
                        Mark As Unread
                    </button>

                    <select id="apply-label-select"
                            className="form-control label-select"
                            disabled={selectedMessage === "none"}
                            onChange={(e) => applyLabel(e.target.value, messages)}
                            value="Apply Label">
                        <option selected>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select"
                            disabled={selectedMessage === "none"}
                            onChange={(e) => removeLabel(e.target.value, messages)}
                            value="Remove Label">
                        <option selected>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default"
                            disabled={selectedMessage === "none"}
                            onClick={() => deleteSelected(messages)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    };
}
;

const mapStateToProps = state => ({
    messages: state.messages,
    composeMode: state.composeMode
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleAll,
    markAsRead,
    markAsUnread,
    deleteSelected,
    applyLabel,
    removeLabel,
    composeModeToggle,
    clearReadMessage
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Toolbars))