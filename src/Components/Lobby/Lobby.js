import React, {Component} from 'react'
import './Lobby.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import socket from '../../sockets'
import {connect} from 'react-redux'
import {setGameRoom} from '../../ducks/reducers/game'
import {withRouter} from 'react-router-dom'

class Lobby extends Component {
    constructor() {
        super()

        this.state = {
            rooms: '',
            createRoomName: '',
            gameNameInput: ''

        }
    }

    componentDidMount() {
        socket.emit('getRooms')
        socket.on('roomsGot', data => {
            console.log(data)
            if (Object.keys(data).length !== 0) {
                let roomArray = []
                let initialDataArray = Object.entries(data)
                initialDataArray.map(room => {
                    let roomObject = {
                        name: room[0],
                        sockets: room[1].length
                    }
                    return roomArray.push(roomObject)
                })
                this.setState ({ rooms: roomArray })

            }
        })
    }

    nameGame = () => this.setState ({ createRoomName: !this.state.createRoomName })

    handleChange = (e) => {
        this.setState ({ gameNameInput: e.target.value })
    }

    checkGame = () => {
        let { gameNameInput } = this.state
        if (gameNameInput) {

        } else {
            alert('please enter game name.')
        }
    }

    startGame = async() => {
        let {gameNameInput} = this.state
        if (gameNameInput) {
            if (this.state.rooms) {
                this.state.rooms.map(room => {
                    if (room.name === gameNameInput) {
                       alert ('game name already exists. Please enter different name for your game.')
                    } else {
                        this.props.setGameRoom({room: gameNameInput, player: 'player1'})
                        this.props.history.push('/gameboard')
                        socket.emit('createRoom', {room: gameNameInput})
                    }
                })
            } else {
                this.props.setGameRoom({room: gameNameInput, player: 'player1'})
                this.props.history.push('/gameboard')
                socket.emit('createRoom', {room: gameNameInput})
            }
        } else {
            alert('please enter game name')
        }
    }

    joinGame = (room) => {
        this.props.setGameRoom({room, player: 'player2'})
        socket.emit('joinRoom', {room})
        this.props.history.push('/gameboard')
    }

    render() {
        console.log(this.state)
        return (
            <div className='lobby'>
                <h2>Lobby</h2>
    
                <div className='lobby-list'>
                    {this.state.createRoomName ? 
                    <div className='game-name-inputs'>
                        <input placeholder="enter game name" onChange={this.handleChange}></input>
                        <button className='button' onClick={this.startGame}>create game</button>
                    </div>
                    :
                    <button className='button' onClick={this.nameGame}>start game</button>                    
                }
                { this.state.rooms ?
                    this.state.rooms.map((room, i) => {
                        if (room.sockets >= 2) {
                            return (
                                <button className='button-2' key={i} >Full: {room.name}</button>
                            )
                        } else {
                        return (
                            <button className='button-2' key={i} onClick={() => this.joinGame(room.name)}>Join: {room.name}</button>
                        )
                    }})
                :
                    null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.game.room
    }
}

export default connect(mapStateToProps, {setGameRoom})(withRouter(Lobby))