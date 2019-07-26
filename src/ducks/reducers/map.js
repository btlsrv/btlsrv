const ADD_MAP = 'ADD_MAP'

const initialState = {
    id: null
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_MAP:
            return {
                ...state, 
                id: payload
            }
        default:
            return state
    }
}

export function addMap(id) {
    return {
        type: ADD_MAP,
        payload: id
    }
}