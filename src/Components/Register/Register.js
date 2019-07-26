import React, {useState} from 'react'
import './Register.scss'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser, login} from '../../ducks/reducers/user'
import axios from 'axios'

const Reg = props => {
    const [info, setInfo] = useState({
        username: '',
        password: '',
        email: '',
        faction_id: 0
    })

    const handleChange = e => {
        const {name, value} = e.target
        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleRegister = e => {
        e.preventDefault()
        console.log('the info we send to the backend', info)
        axios.post('/auth/register', info).then(res => {
            props.login(info)
        }).catch(err => {
            console.log(err)
            alert('username already taken')
        })
    }
    
    if(props.user) {
        return <Redirect to='/'/>
    }

    return (
        <div className='reg'>
            <form className='reg-card'>
                <input type='text' name='username' onChange={handleChange} placeholder='username'/>
                <input type='text' name='email' onChange={handleChange} placeholder='email'/>
                <input type='password' name='password' onChange={handleChange} placeholder='password'/>
                <select name='faction_id' value={info.faction_id} onChange={handleChange} placeholder='select a faction' required>
                    <option value='' selected hidden>select a faction</option>
                    <option value='1'>cyber monkeys</option>
                    <option value='2'>alpaca hackas</option>
                    <option value='3'>skylight ducks</option>
                </select>
                <button onClick={handleRegister} type='submit'>register</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, { getUser, login })(Reg)