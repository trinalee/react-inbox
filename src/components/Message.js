import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

class Message extends Component {
    state = {
        selected: false
    }

    onToggleStar = () => {
        this.props.toggleStar(this.props.index)
    }

    onToggleSelected = () => {
        this.props.toggleSelected(this.props.index)
    }

    render () {
        let {subject, read, starred, labels} = this.props.message

        console.log("message render at index:", this.props.index)
        return (
            <div className= {`row message ${read ? 'read' : 'unread'} ${this.state.selected ? 'selected' : ''}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" onClick={this.onToggleSelected}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${starred ? 'fa-star' : 'fa-star-o'}`} onClick={this.onToggleStar}/>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {labels.map((label, index) => (<span key={index} className="label label-warning">{label}</span>))}
                    <a href="#">
                        {subject}
                    </a>
                </div>
            </div>
        )
    }
}

export default Message