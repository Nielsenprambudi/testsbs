import { ADD_TOKEN, SELECT_TOKEN, DESELECT_TOKEN } from "../actions/ActionsType";

const initialState = {
    token: null
};

export default (state = initialState, action) => 
{
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case SELECT_TOKEN:
            return { state }
        case DESELECT_TOKEN:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}
