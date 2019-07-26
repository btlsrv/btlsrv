import React, { useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import logo from '../../Assets/btlsrvlogo.svg'
import './Nav.scss'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'


const Nav = props => {
    const {getUser} = props
    useEffect(()=> {
        getUser()
    }, [getUser])

    const logout = () => {
        props.logout()
    }

    return (
        <>
        {props.user
        ?
        <div className='navbar'>
            <Link to='/'>
            <div style={{'background':'white', 'height':70}}>
            <img src={logo} alt='battle serve' className='logo'/>
            </div>
            </Link>

            <div className='link-container'>
                <Link to='/'>home</Link>
                <Link to='/dashboard'>dashboard</Link>
                <Link to='/'><button onClick={logout}>logout</button></Link>
            </div>
        </div>
        :
        <div className='navbar'>
            <Link to='/'>
            <div style={{'background':'white', 'height':70}}>
            <img src={logo} alt='battle serve' className='logo'/>
            </div>
            </Link>
        </div>
        }
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser, logout})(Nav)