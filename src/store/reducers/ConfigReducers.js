import { ADD_TOKEN, ADD_USERID ,SELECT_TOKEN, DESELECT_TOKEN, DESELECT_USERID, DESELECT_ROLE, ADD_ROLE } from "../actions/ActionsType";

const initialState = {
    token: null,
    id: null,
    role: null
};

export default (state = initialState, action) => 
{
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case ADD_USERID:
            return {
                ...state,
                id: action.id
            }
        case ADD_ROLE:
            return {
                ...state,
                role: action.role
            }
        case SELECT_TOKEN:
            return { state }
        case DESELECT_TOKEN:
            return {
                ...state,
                token: null
            }
        case DESELECT_USERID:
            return {
                ...state,
                id: null
            }
        case DESELECT_ROLE:
            return {
                ...state,
                role: null
            }
        default:
            return state
    }
}
