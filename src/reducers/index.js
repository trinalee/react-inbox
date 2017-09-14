import {combineReducers} from 'redux'
import { MESSAGES_RECEIVED, TOGGLE_SELECTED, TOGGLE_STAR } from '../actions'

function messages(state = {all: []}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            console.log("**** MESSAGES_RECEIVED ", action.messages)
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
        default:
            return state
    }
}

export default combineReducers({
    messages
})
