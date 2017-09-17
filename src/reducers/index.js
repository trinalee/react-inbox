import {combineReducers} from 'redux'
import {
    MESSAGES_RECEIVED,
    TOGGLE_SELECTED,
    TOGGLE_STAR,
    TOGGLE_ALL,
    MARK_AS_READ,
    MARK_AS_UNREAD,
    DELETE_SELECTED,
    APPLY_LABEL,
    REMOVE_LABEL,
    COMPOSE_MODE_TOGGLE,
    SEND_MESSAGE
} from '../actions'

function messages(state = {all: []}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                all: action.messages
            };
        case TOGGLE_SELECTED:
            let messageSelected = state.all[action.index];
            messageSelected.selected = !state.all[action.index].selected;

            return {
                ...state,
                all: [
                    ...state.all.slice(0, action.index),
                    messageSelected,
                    ...state.all.slice(action.index + 1)
                ]
            };
        case TOGGLE_STAR:
            return {
                ...state,
                all: [
                    ...state.all.slice(0, action.index),
                    action.messageStarred,
                    ...state.all.slice(action.index + 1)
                ]
            };
        case TOGGLE_ALL:
            if (state.all.every(message => message.selected === true)) {
                return {
                    ...state,
                    all: [
                        ...state.all.map((message) => {
                            let msg = message;
                            msg.selected = false;
                            return msg
                        })
                    ]
                };
            } else {
                return {
                    ...state,
                    all: [
                        ...state.all.map((message) => {
                            let msg = message;
                            msg.selected = true;
                            return msg
                        })
                    ]
                };
            }
        case SEND_MESSAGE:
            return {
                ...state,
                all: [
                    ...state.all,
                    action.newMessage
                ]
            };
        case MARK_AS_READ:
        case MARK_AS_UNREAD:
        case DELETE_SELECTED:
        case APPLY_LABEL:
        case REMOVE_LABEL:
            return {
                ...state,
                all: action.newMessages

            };
        default:
            return state
    }
}

function composeMode(state = {}, action) {
    switch (action.type) {
        case COMPOSE_MODE_TOGGLE:
            return {
                ...state,
                composeMode: action.composeMode
            };
        case SEND_MESSAGE:
            return {
                ...state,
                composeMode: false
            };
        default:
            return state
    }
}


export default combineReducers({
    messages,
    composeMode
})
