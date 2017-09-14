import React, {Component} from 'react'
import Message from './Message'
import Toolbars from './Toolbars'
import ComposeMessage from './ComposeMessage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Messages extends Component {
    state = {
        messages: [],
    }

    async componentDidMount() {
        let { messages } = this.props;
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
        // const data = await response.json();
        this.setState({
            messages: messages,
            composeMode: false
        })
    }

    toggleStar = async (index) => {
        let message = this.state.messages[index];
        message.starred = !this.state.messages[index].starred;

        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: [index + 1],
                command: 'star',
                star: message.starred
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState(prevState => ({
            messages: [
                ...prevState.messages.slice(0, index),
                message,
                ...prevState.messages.slice(index + 1)
            ]
        }))
    }

    toggleSelected = (index) => {
        let message = this.state.messages[index];
        message.selected = !this.state.messages[index].selected;

        this.setState(prevState => ({
            messages: [
                ...prevState.messages.slice(0, index),
                message,
                ...prevState.messages.slice(index + 1)
            ]
        }))
    }

    deleteSelected = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: this.state.messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'delete'
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState(prevState => ({
            messages: prevState.messages.filter(message => !message.selected)
        }))
    }

    markAsRead = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: this.state.messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: true
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message;
                msg.read = message.selected ? true : message.read;
                msg.selected = false;
                return msg
            })
        }))
    }

    markAsUnread = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: this.state.messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: false
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        this.setState(prevState => ({
            messages: prevState.messages.map(message => {
                let msg = message;
                msg.read = message.selected ? false : message.read;
                msg.selected = false;
                return msg
            })
        }))
    }

    applyLabel = async (labelName) => {
        if (labelName !== "Apply label") {

            console.log("messageIds ", this.state.messages.filter(message =>
                (message.selected
                && !message.labels.some(label => (label === labelName))))
                .map(msg => msg.id))
            console.log("labelName ", labelName);

            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: this.state.messages.filter(message =>
                        (message.selected
                        && !message.labels.some(label => (label === labelName))))
                        .map(msg => msg.id),
                    command: 'addLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            this.setState(prevState => ({
                messages: prevState.messages.map(message => {
                    let msg = message;
                    if (message.selected
                        && !message.labels.some(label => (label === labelName))) {
                        msg.labels.push(labelName)
                    }
                    msg.selected = false;
                    return msg
                })
            }))

        }
    };

    removeLabel = async (labelName) => {
        if (labelName !== "Remove label") {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: this.state.messages.filter(message => message.selected)
                        .map(msg => msg.id),
                    command: 'removeLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            this.setState(prevState => ({
                messages: prevState.messages.map(message => {
                    let msg = message;
                    let labels;
                    if (message.selected
                        && message.labels.some(label => (label === labelName))) {
                        labels = message.labels.filter(label => (label !== labelName));
                        msg.labels = labels
                    }
                    msg.selected = false;
                    return msg
                })
            }));
        }
    };

    toggleAll = () => {
        if (this.state.messages.every(message => message.selected === true)) {
            this.setState(prevState => ({
                messages: prevState.messages.map(message => {
                    let msg = message;
                    msg.selected = false;
                    return msg
                })
            }))
        } else {
            this.setState(prevState => ({
                messages: prevState.messages.map(message => {
                    let msg = message;
                    msg.selected = true;
                    return msg
                })
            }))
        }
    };

    composeModeToggle = () => {
        this.setState(prevState => ({
            composeMode: !prevState.composeMode
        }))
    };

    onSendMessage = async (msgSubject, msgBody) => {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                subject: msgSubject,
                body: msgBody
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const newMessage = await response.json()

        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                newMessage
            ],
            composeMode: false
        }));
    }

    render() {
        if (!this.props.messages.all.length) return (<div>Loading...</div>)
        let unreadCount = this.props.messages.all ?
            this.props.messages.all.reduce((count, message) => {
                if (message.read === false) {
                    return count + 1
                } else {
                    return count
                }
            }, 0) : 0

        let selectedMessage = this.props.messages.all ?
            this.props.messages.all.every(message => message.selected === true) ? "all" :
                this.props.messages.all.every(message => message.selected === false
                || message.selected === undefined) ? "none" : "some"
            : "none";

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
                    composeModeToggle={this.composeModeToggle}
                />

                {this.state.composeMode &&
                <ComposeMessage
                    onSendMessage={this.onSendMessage}

                />}

                {this.props.messages.all.map((message, index) => <Message
                    key={index}
                    index={index}
                    message={message}
                />)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages)