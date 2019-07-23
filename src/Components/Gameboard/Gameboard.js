import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import io from 'socket.io-client'

const socket = io()


const Gameboard = props => {
    const [room, setRoom] = useState({
        room: 0
    })

    useEffect(()=> {
        props.getUser()
        socket.emit('startGame')
        socket.on('startedGame', players => {
            let {gameRoom} = players
            setRoom(gameRoom)
            console.log(players)
        })
    }, [])

    console.log(room)

    return (
        <div>
            <h2>Gameboard</h2>
            <div className='board'></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser})(Gameboard)