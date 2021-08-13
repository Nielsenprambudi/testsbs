import { ADD_TOKEN, ADD_USERID, ADD_ROLE ,SELECT_TOKEN, DESELECT_TOKEN, DESELECT_USERID, DESELECT_ROLE } from "./ActionsType";

export const addToken = (token) => {
    return {
        type: ADD_TOKEN,
        token: token
    };
}

export const addUserId = (id) => {
    return {
        type: ADD_USERID,
        id: id
    };
}

export const addRole = (role) => {
    return {
        type: ADD_ROLE,
        role: role
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

export const deselectUserId = () => {
    return {
        type: DESELECT_USERID
    }
}

export const deselectRole = () => {
    return {
        type: DESELECT_ROLE
    }
}



