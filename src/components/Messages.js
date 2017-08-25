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

    deleteSelected = () => {
        this.setState(prevState => ({
                messages: prevState.messages.filter(message => message.selected ? false : true)
            }))
    }

    markAsRead = () => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message
                msg.read = message.selected ? true : message.read
                return msg
            })
        }))
    }

    markAsUnread = () => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message
                msg.read = message.selected ? false : message.read
                return msg
            })
        }))
    }

    applyLabel = (labelName) => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message
                if (labelName !== "Apply label"
                    && message.selected
                    && !message.labels.some(label => (label === labelName))) {
                    msg.labels.push(labelName)
                }
                return msg
            })
        }))
    }

    removeLabel = (labelName) => {
        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message
                let labels
                if (labelName !== "Remove label"
                    && message.selected
                    && message.labels.some(label => (label === labelName))) {
                    labels = message.labels.filter(label => (label !== labelName))
                    msg.labels = labels
                }
                return msg
            })
        }))
    }

    toggleAll = () => {
        if (this.state.messages.every(message => message.selected === true)) {
            this.setState(prevState => ({
                messages: prevState.messages.map(message => {
                    let msg = message
                    msg.selected = false
                    return msg
                })
            }))
        } else {
            this.setState(prevState => ({
                messages: prevState.messages.map(message => {
                    let msg = message
                    msg.selected = true
                    return msg
                })
            }))
        }
    }

    render() {
        let unreadCount = this.state.messages ?
            this.state.messages.reduce((count, message) => {
            if (message.read === false) {
                return count + 1
            } else {
                return count
            }
        }, 0) : 0

        let selectedMessage = this.state.messages ?
                this.state.messages.every(message => message.selected === true) ? "all" :
                this.state.messages.every(message => message.selected === false || message.selected === undefined) ? "none" : "some"
            : "none"

        return (
            <div>
                <Toolbars
                    selectedMessage={selectedMessage}
                    unreadCount={unreadCount}
                    markAsRead={this.markAsRead}
                    markAsUnread={this.markAsUnread}
                    applyLabel={this.applyLabel}
                    removeLabel={this.removeLabel}
                    toggleAll={this.toggleAll}
                    deleteSelected={this.deleteSelected}
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