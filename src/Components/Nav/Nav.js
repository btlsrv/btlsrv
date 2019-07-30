import React, { useEffect } from 'react'
import {Link, withRouter} from 'react-router-dom'
import logo from '../../Assets/btlsrvlogo.svg'
import './Nav.scss'
// import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'


const Nav = props => {
    const {getUser} = props
    useEffect(()=> {
        getUser()
    }, [getUser])

    const logout = async() => {
        await props.logout()
        props.history.push('/')
    }
    console.log(props)
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
                <button onClick={logout}>logout</button>
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

export default connect(mapStateToProps, {getUser, logout})(withRouter(Nav))