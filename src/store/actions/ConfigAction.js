import { ADD_TOKEN, SELECT_TOKEN, DESELECT_TOKEN } from "./ActionsType";

export const addToken = (token) => {
    return {
        type: ADD_TOKEN,
        token: token
    };
}

export const selectToken = () => {
    return {
        type: SELECT_TOKEN
    }
}

export const deselectToken = () => {
    return {
        type: DESELECT_TOKEN
    }
}



