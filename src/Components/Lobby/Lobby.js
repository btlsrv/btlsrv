import React, {Component} from 'react'
import './Lobby.scss'
// import axios from 'axios'
// import {Link} from 'react-router-dom'
import socket from '../../sockets'
import {connect} from 'react-redux'
import {setGameRoom} from '../../ducks/reducers/game'
import {withRouter} from 'react-router-dom'

class Lobby extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms: '',
            createRoomName: '',
            gameNameInput: ''

        }
    }

    componentDidMount() {
        socket.emit('getRooms')
        socket.on('roomsGot', async data => {
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
                await this.setState ({ rooms: roomArray })
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

    makeGameRoom = async () => {
        let {gameNameInput} = this.state
        this.props.setGameRoom({room: gameNameInput, player: 'player1'})
        socket.emit('createRoom', {room: gameNameInput})
        this.props.history.push('/gameboard')
    }

    startGame = async() => {
        let {gameNameInput} = this.state
        if (gameNameInput) {
            if (this.state.rooms) {
                this.state.rooms.map(room => {
                    if (room.name === gameNameInput) {
                        return alert ('game name already exists. Please enter different name for your game.')
                    } else {
                        return this.makeGameRoom()
                    }
                })
            } else {
                return this.makeGameRoom()
            }
        } else {
            return alert('please enter game name')
        }
    }

    joinGame = (room) => {
        this.props.setGameRoom({room, player: 'player2'})
        socket.emit('joinRoom', {room})
        this.props.history.push('/gameboard')
    }

    render() {
        return (
            <div className='lobby'>
                <h2>Lobby</h2>
                <button onClick={() => this.props.setLobby(false)} className='lobby-back-button'>back</button>
    
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