import React, { useState } from 'react'
import './Login.scss'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {login} from '../../ducks/reducers/user'

const Login = (props) => {
    const [info, setInfo] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        const {name, value} = e.target
        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleLogin = e => {
        e.preventDefault()
        props.login(info)
        .catch(() => alert('Email Or Password Incorrect. Please Try Again.'))
    }
    
    if(props.user) {
        return <Redirect to='/'/>
    }

    return (
        <div className='login'>
            <form className='login-card'>
                <input type='text' name='username' onChange={handleChange} placeholder='username'/>
                <input type='password' name='password' onChange={handleChange} placeholder='password'/>
                <button onClick={handleLogin} type='submit'>Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {login})(Login)