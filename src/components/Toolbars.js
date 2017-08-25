import React, {Component} from 'react'

class Toolbars extends Component {

    onApplyLabelSelect = (e) => {
        this.props.applyLabel(e.target.value)
    }

    onRemoveLabelSelect = (e) => {
        this.props.removeLabel(e.target.value)
    }


    render() {
        let {selectedMessage, unreadCount, toggleAll, markAsRead, markAsUnread, deleteSelected} = this.props
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadCount}
                            </span>
                        {`unread message${unreadCount === 1 ? "" : "s"}`}
                    </p>
                    <button className="btn btn-default" onClick={toggleAll}>
                        <i className={`fa ${selectedMessage === "all" ? "fa-check-square-o" : selectedMessage === "none" ? "fa-square-o" : "fa-minus-square-o"}`}/>
                    </button>
                    <button className="btn btn-default" disabled={selectedMessage==="none"} onClick={markAsRead}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" disabled={selectedMessage==="none"} onClick={markAsUnread}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" disabled={selectedMessage==="none"} onChange={this.onApplyLabelSelect}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" disabled={selectedMessage==="none"} onChange={this.onRemoveLabelSelect}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" disabled={selectedMessage==="none"} onClick={deleteSelected}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbars