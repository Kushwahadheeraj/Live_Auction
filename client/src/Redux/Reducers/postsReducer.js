import { ADDNEW_POST, GETALL_POSTS, GET_POST, DELETE_POST } from '../Actions/type';

export const postsReducer = (state = [], action) => {
    switch (action.type) {

        case ADDNEW_POST:
            return [action.payload, ...state]
        case GETALL_POSTS:
            return [action.payload]
        case GET_POST:
            return [action.payload]
        case DELETE_POST:
            return state.filter(post => post._id !== action.payload)
        default:
            return state;
    }
}