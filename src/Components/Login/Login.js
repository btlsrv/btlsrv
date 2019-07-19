import React, { useState } from 'react'
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

    const handleLogin = () => {
        props.login(info)
    }
    
    if(props.user) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <input type='text' name='username' onChange={handleChange} placeholder='username'/>
            <input type='text' name='password' onChange={handleChange} placeholder='password'/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {login})(Login)