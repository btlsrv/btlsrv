import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import board from './board'
import axios from 'axios'
// const socket = io()
import './Gameboard.scss'
import Blank from '../Modules/Blank/Blank'
import Stoplight from '../Modules/Stoplight/Stoplight'
import Threebar from '../Modules/ThreeBar/ThreeBar'
import socket from '../../sockets'



class Gameboard extends Component {
    constructor() {
        super() 

        this.state = {
            board,
            player1Map: [],
            player2Map: [],
            currentTurn: 'player1',
            spotSelected: ''
        }
    }

    async componentDidMount() {
        this.props.getUser()
        let id = this.props.map
        const {board} = this.state
        console.log('PLAYER', this.props.player)
        if (this.props.player === 'player1') {
            await axios.get(`/api/maps/${id}`).then(res => {
                const positions = res.data
                const newBoard = board.map((space, i) => {
                    for (let key in positions) {
                        if (key.charAt(10) && positions[key] === i) {
                            space.name = key
                        }
                    }
                    return space
                })
                this.setState({
                    player1Map: newBoard,
                    // player2Map: newBoard // testing take out when finished
                })
            })
        } else {
            await axios.get(`/api/maps/${id}`).then(res => {
                const positions = res.data
                const newBoard = board.map((space, i) => {
                    for (let key in positions) {
                        if (key.charAt(10) && positions[key] === i) {
                            space.name = key
                        }
                    }
                    return space
                })
                this.setState({
                    player2Map: newBoard
                })
            })
        }
        if (this.props.player === 'player1') {
            this.initializePlayer1()
        } else if (this.props.player === 'player2') {
            this.initializePlayer2()
        }

        socket.on('gameJoined', data => {
            console.log(data)
            let { player1, player2Map } = data
            if (this.props.player === 'player1') {
                this.setState ({ player2Map})
            } else {
                this.setState ({ player1Map: player1 })
            }
            // this.setState ({ player1Map: player1, player2Map }) 
        })

        socket.on('turnsChanged', data => {
            console.log(data)
            this.setState ({ currentTurn: data })
        })

        socket.on('playerLeft', () => alert('opponent left. game over.'))
    }

    initializePlayer1 = () => {
        let { player1Map } = this.state
        let { room } = this.props
        socket.emit('startGame', { player1Map, room })
    }

    initializePlayer2 = () => {
        let { player2Map } = this.state
        let { room } = this.props
        socket.emit('joinGame', {player2Map, room})
    }

    handleClick = async space => {
        console.log('THE SPACE', space)
        const {name} = space
        if (name === 'm2_position1') {
            space.comp = <Stoplight/>
        } else if (name === 'm2_position2') {
            space.comp = <Threebar/>
        }  else if (name === 'm3_position1') {
            space.comp = <Stoplight/>
        }  else if (name === 'm3_position2') {
            space.comp = <Threebar/>
        }  else if (name === 'm3_position3') {
            space.comp = <Stoplight/>
        }  else if (name === 'm3b_position1') {
            space.comp = <Threebar/>
        }  else if (name === 'm3b_position2') {
            space.comp = <Stoplight/>
        }  else if (name === 'm3b_position3') {
            space.comp = <Threebar/>
        }  else if (name === 'm4_position1') {
            space.comp = <Stoplight/>
        }  else if (name === 'm4_position2') {
            space.comp = <Threebar/>
        }  else if (name === 'm4_position3') {
            space.comp = <Stoplight/>
        }  else if (name === 'm4_position4') {
            space.comp = <Threebar/>
        }  else if (name === 'm5_position1') {
            space.comp = <Stoplight/>
        }  else if (name === 'm5_position2') {
            space.comp = <Threebar/>
        }  else if (name === 'm5_position3') {
            space.comp = <Stoplight/>
        }  else if (name === 'm5_position4') {
            space.comp = <Threebar/>
        }  else if (name === 'm5_position5') {
            space.comp = <Stoplight/>
        }
        if (this.state.currentTurn === 'player1') {
            await this.setState({
                currentTurn: 'player2'
            })
        } else {
            await this.setState({
                currentTurn: 'player1'
            })
        }
        let { room } = this.props
        let { currentTurn } = this.state
        socket.emit('changeTurns', {currentTurn, room})
    }

    leaveGame = () => {
        let { room } = this.props
        socket.emit('leaveGame', room)
        this.props.history.push('/dashboard')
    }

    render() {
        // console.log('THE BOARD', this.state.board)
        console.log(this.state)

        return (
            // <div>Hello</div>
            <div className='gameboard'>
                <h2>Gameboard</h2>
                <div className='player-1'>
                    { this.state.player1Map.length > 0 ?
                        this.state.player1Map.map((space, i) => {
                        console.log('SPACES ON PLAYER 1 MAP', space)
                        return (
                            <div
                            key ={i}
                            onClick={() => this.handleClick(space)}>
                                {/* {space.comp} */}
                            </div>
                        )
                    })
                    :
                    null
                    }
                </div>
                <div className='player-2'>
                    {this.state.player2Map.length > 0 ?
                        this.state.player2Map.map((space, i) => {
                        console.log('SPACES ON PLAYER 2 MAP', space)
                        return (
                            <div
                            key ={i}
                            onClick={() => this.handleClick(space)}>
                                {/* {space.comp} */}
                            </div>
                        )
                    })
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
        user: state.user.data,
        room: state.game.room,
        player: state.game.player,
        map: state.game.map
    }
}

export default connect(mapStateToProps, {getUser})(Gameboard)