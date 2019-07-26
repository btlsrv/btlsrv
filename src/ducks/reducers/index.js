import { combineReducers } from 'redux'

import user from './user'
import game from './game'
import map from './map'

export default combineReducers({ user, game, map })