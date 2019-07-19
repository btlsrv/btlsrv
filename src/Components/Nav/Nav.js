import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <Link to='/'>home</Link>
            <Link to='/about'>about</Link>
            <Link to='/dashboard'>dashboard</Link>
            <button>logout</button>
        </div>
    )
}

export default Nav