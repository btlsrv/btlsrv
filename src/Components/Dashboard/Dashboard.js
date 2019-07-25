import React, {useEffect, useState} from 'react'
import './Dashboard.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io()

const Dashboard = props => {
    let {getUser} = props
    
    useEffect(()=> {
        getUser()
    }, [getUser])

    const databaseCall = () => {
        axios.get('/api/maps/3').then(res => {
            console.log(res)
        })
    }

    return (
        <div>
            {props.user 
            ?
            <div className='dash'>
                {/* <h1 className='welcome'>welcome, {props.user.username}</h1> */}
                <div>
                <Link to='/gameboard'><button className='button' onClick={databaseCall}>start game</button></Link>
                <div className='game-list'>
                <button>join</button>
                <button>join</button>
                <button>join</button>
                <button>join</button>
                </div>
                </div>

                <div>
                <Link to='/addmap'><button className='button'>add map</button></Link>
                <Link to='/viewmaps'><button>view maps</button></Link>
                </div>
                
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
