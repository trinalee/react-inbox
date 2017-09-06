import React from 'react'

const Toolbars = ({selectedMessage,
                        unreadCount,
                        toggleAll,
                        markAsRead,
                        markAsUnread,
                        deleteSelected,
                        applyLabel,
                        removeLabel,
                        composeModeToggle}) =>  {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{unreadCount}
                        </span>{`unread message${unreadCount === 1 ? "" : "s"}`}
                    </p>
                    <a className="btn btn-danger"
                        onClick={composeModeToggle}>
                        <i className="fa fa-plus"></i>
                    </a>
                    <button className="btn btn-default"
                            onClick={toggleAll}>
                        <i className={`fa ${selectedMessage === "all" ? "fa-check-square-o" :
                            selectedMessage === "none" ? "fa-square-o" : "fa-minus-square-o"}`}/>
                    </button>
                    <button className="btn btn-default"
                            disabled={selectedMessage==="none"}
                            onClick={markAsRead}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default"
                            disabled={selectedMessage==="none"}
                            onClick={markAsUnread}>
                        Mark As Unread
                    </button>

                    <select id="apply-label-select"
                            className="form-control label-select"
                            disabled={selectedMessage==="none"}
                            onChange={(e)=>applyLabel(e.target.value)}
                            value="Apply Label">
                        <option selected>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select"
                            disabled={selectedMessage==="none"}
                            onChange={(e)=>removeLabel(e.target.value)}
                            value="Remove Label">
                        <option selected>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default"
                            disabled={selectedMessage==="none"}
                            onClick={deleteSelected}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }

export default Toolbars