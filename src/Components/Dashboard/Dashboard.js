import React, {useEffect, useState} from 'react'
import './Dashboard.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import io from 'socket.io-client'

const socket = io()

const Dashboard = props => {
    useEffect(()=> {
        props.getUser()
    }, [props])

    return (
        <div>
            {props.user 
            ?
            <div className='dash'>
                <h1 className='welcome'>welcome, {props.user.username}</h1>
                <Link to='/gameboard'><button className='button'>start game</button></Link>
                <Link to='/addmap'><button className='button'>add map</button></Link>
                <div className='game-list'></div>
            </div>
            :
            // <Redirect to='/'/>
            <div></div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser})(Dashboard)
