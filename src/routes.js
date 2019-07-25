import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Gameboard from './Components/Gameboard/Gameboard'
import AddMap from './Components/AddMap/AddMap'
import MapsContainer from './Components/MapsContainer/MapsContainer'

export default (
    <Switch>
        <Route path='/viewmaps' component={MapsContainer}/>
        <Route path='/addmap' component={AddMap}/>
        <Route path='/gameboard' component={Gameboard}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/' exact component={Home} />
    </Switch>
)