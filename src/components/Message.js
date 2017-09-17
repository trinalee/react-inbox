import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toggleSelected, toggleStar} from '../actions'

const Message = ({index, message, toggleSelected, toggleStar}) => {
    let {subject, read, starred, labels, selected} = message;
    return (
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
            <div className="col-xs-11">
                {labels.map((label, index) =>
                    (<span key={index} className="label label-warning">{label}</span>))}
                <a href="#">
                    {subject}
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSelected,
    toggleStar
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)