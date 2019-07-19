import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../Assets/btlsrvlogo.svg'
import './Nav.scss'

const Nav = () => {
    return (
        <div className='navbar'>
            <Link to='/'>
            <div style={{'background':'white', 'height':70}}>
            <img src={logo} alt='battle serve' className='logo'/>
            </div>
            </Link>

            <div className='link-container'>
                <Link to='/'>home</Link>
                <Link to='/dashboard'>dashboard</Link>
                <button>logout</button>
            </div>
        </div>
    )
}

export default Nav