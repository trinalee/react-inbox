export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export function fetchMessages() {
    return async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
        const json = await response.json();
        dispatch({
            type: MESSAGES_RECEIVED,
            messages: json._embedded.messages
        })
    }
}

export const TOGGLE_STAR = 'TOGGLE_STAR';
export function toggleStar(index, message) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: [index + 1],
                    command: 'star',
                    star: !message.starred
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
        const messageStarred = message;
        messageStarred.starred = !message.starred;

        dispatch({
            type: TOGGLE_STAR,
            index,
            messageStarred
        })
    }
}

export const MARK_AS_READ = 'MARK_AS_READ';
export function markAsRead(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.all.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: true
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const newMessages = messages.all.map(message => {
            let msg = message;
            msg.read = message.selected ? true : message.read;
            msg.selected = false;
            return msg;
        });

        dispatch({
            type: MARK_AS_READ,
            newMessages
        });
    }
}

export const MARK_AS_UNREAD = 'MARK_AS_UNREAD';
export function markAsUnread(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.all.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: false
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const newMessages = messages.all.map(message => {
            let msg = message;
            msg.read = message.selected ? false : message.read;
            msg.selected = false;
            return msg;
        });

        dispatch({
            type: MARK_AS_UNREAD,
            newMessages
        });
    }
}

export const DELETE_SELECTED = 'DELETE_SELECTED';
export function deleteSelected(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.all.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'delete'
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const newMessages = messages.all.filter(message => !message.selected);

        dispatch({
            type: DELETE_SELECTED,
            newMessages
        });
    }
}

export const APPLY_LABEL = 'APPLY_LABEL';
export function applyLabel(labelName, messages) {
    if (labelName !== 'Apply label') {
        return async (dispatch) => {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: messages.all.filter(message =>
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

            const newMessages = messages.all.map(message => {
                let msg = message;
                if (message.selected
                    && !message.labels.some(label => (label === labelName))) {
                    msg.labels.push(labelName)
                }
                msg.selected = false;
                return msg
            });

            dispatch({
                type: APPLY_LABEL,
                newMessages
            });
        }
    }
}

export const REMOVE_LABEL = 'REMOVE_LABEL';
export function removeLabel(labelName, messages) {
    if (labelName !== 'Remove label') {
        return async (dispatch) => {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: messages.all.filter(message => message.selected).map(msg => msg.id),
                    command: 'removeLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const newMessages = messages.all.map(message => {
                let msg = message;
                let labels;
                if (message.selected
                    && message.labels.some(label => (label === labelName))) {
                    labels = message.labels.filter(label => (label !== labelName));
                    msg.labels = labels
                }
                msg.selected = false;
                return msg
            });

            dispatch({
                type: REMOVE_LABEL,
                newMessages
            });
        }
    }
}

export const COMPOSE_MODE_TOGGLE = 'COMPOSE_MODE_TOGGLE';
export function composeModeToggle(prevComposeMode) {
    return async (dispatch) => {
        dispatch({
            type: COMPOSE_MODE_TOGGLE,
            composeMode: !prevComposeMode
        });
    }
}

export const SEND_MESSAGE = 'SEND_MESSAGE';
export function sendMessage(msgSubject, msgBody) {
    return async (dispatch) => {
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

        dispatch({
            type: SEND_MESSAGE,
            newMessage
        })
    }
}

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export function toggleSelected(index) {
    return async (dispatch) => {
        dispatch({
            type: TOGGLE_SELECTED,
            index,
        })
    }
}

export const TOGGLE_ALL = 'TOGGLE_ALL';
export function toggleAll() {
    return async (dispatch) => {
        dispatch({
            type: TOGGLE_ALL
        })
    }
}