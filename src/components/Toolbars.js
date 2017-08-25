import React, {Component} from 'react'

class Toolbars extends Component {

    onApplyLabelSelect = (e) => {
        this.props.applyLabel(e.target.value)
    }

    onRemoveLabelSelect = (e) => {
        this.props.removeLabel(e.target.value)
    }


    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">2</span>
                        unread messages
                    </p>

                    <button className="btn btn-default" onClick={this.props.toggleAll}>
                        <i className="fa fa-check-square-o"/>
                    </button>

                    <button className="btn btn-default" onClick={this.props.markAsRead}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={this.props.markAsUnread}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" onChange={this.onApplyLabelSelect}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={this.onRemoveLabelSelect}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.props.deleteSelected}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbars