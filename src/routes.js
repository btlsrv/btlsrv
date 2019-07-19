import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './Components/Home/Home'
import About from './Components/About/About'
import Dashboard from './Components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/about' component={About}/>
        <Route path='/' exact component={Home} />
    </Switch>
)