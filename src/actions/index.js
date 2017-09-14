export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export function fetchMessages() {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:3001/api/messages`);
        const json = await response.json();
        dispatch({
            type: MESSAGES_RECEIVED,
            messages: json._embedded.messages
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

export const TOGGLE_STAR = 'TOGGLE_STAR';
export function toggleStar(index, message) {
    return async (dispatch) => {
        await fetch(`http://localhost:3001/api/messages`, {
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