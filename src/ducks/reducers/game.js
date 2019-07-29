const SET_GAME_ROOM = 'SET_GAME_ROOM'
const SET_MAP = 'SET_MAP'

const initialState = {
    room: '',
    player: '',
    map: 0
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_GAME_ROOM:
            return { ...state, room: action.payload.room, player: action.payload.player}
        case SET_MAP: 
            return {...state, map: action.payload}
        default:
            return state
    }
}

export function setGameRoom(data){
    return {
        type: SET_GAME_ROOM,
        payload: data
    }
}

export function setMap(num) {
    return {
        type: SET_MAP,
        payload: num
    }
}