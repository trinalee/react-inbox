import React, {Component} from 'react'
import Message from './Message'
import Toolbars from './Toolbars'

class Messages extends Component {
    state = {
        messages: [],
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001/api/messages')
        const data = await response.json()
        this.setState({
            messages: data._embedded.messages
        })
    }

    toggleStar = (index) => {
        let message = this.state.messages[index]
        message.starred = !this.state.messages[index].starred

        this.setState(prevState => ({
            messages: [
            ...prevState.messages.slice(0, index),
            message,
            ...prevState.messages.slice(index + 1)
            ]
        }))
    }

    toggleSelected = (index) => {
        console.log("toggleSelected", index)
        let message = this.state.messages[index]
        message.selected = !this.state.messages[index].selected

        this.setState(prevState => ({
            messages: [
                ...prevState.messages.slice(0, index),
                message,
                ...prevState.messages.slice(index + 1)
            ]
        }))
    }

    markRead = () => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message
                msg.read = message.selected ? true : message.read
                return msg
            })
        }))
    }


    markUnread = () => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message
                msg.read = message.selected ? false : message.read
                return msg
            })
        }))
    }

    render() {
        console.log("messages", this.state.messages)
        return (
            <div>
                <Toolbars
                    markRead={this.markRead}
                    markUnread={this.markUnread}
                />
                {this.state.messages.map((message, index) => <Message
                    key={index}
                    index={index}
                    message={message}
                    toggleStar={this.toggleStar}
                    toggleSelected={this.toggleSelected}
                />)}
            </div>
        )
    }
}

export default Messages