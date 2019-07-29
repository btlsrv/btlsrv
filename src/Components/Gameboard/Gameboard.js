import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import {board1, board2} from './board'
import axios from 'axios'
import './Gameboard.scss'
import Blank from '../Modules/Blank/Blank'
import Stoplight from '../Modules/Stoplight/Stoplight'
import Threebar from '../Modules/ThreeBar/ThreeBar'
import socket from '../../sockets'




class Gameboard extends Component {
    constructor() {
        super() 

        this.state = {
            player1Map: board1,
            player2Map: board2,
            player2: false,
            currentTurn: 'player1'
        }
    }

    async componentDidMount() {
        this.props.getUser()
        if (this.props.player === 'player1') {
            this.initializePlayer1()
        } else if (this.props.player === 'player2') {
            this.initializePlayer2()
        }

        socket.on('gameJoined', async data => {
            let { map1, map2 } = data
            this.setState ({ player2: true })
            if (this.props.player === 'player1') {
                await axios.get(`/api/maps/${map2}`).then(res => {
                    const positions = res.data
                    const newBoard = board2.map((space, i) => {
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

            } else {
                await axios.get(`/api/maps/${map1}`).then(res => {
                    const positions = res.data
                    const newBoard = board1.map((space, i) => {
                        for (let key in positions) {
                            if (key.charAt(10) && positions[key] === i) {
                                space.name = key
                            }
                        }
                        return space
                    })
                    this.setState({
                        player1Map: newBoard,
                    })
                })
            }
        })

        socket.on('turnsChanged', async data => {
            let { currentTurn, spotSelected } = data
            await this.setState ({ currentTurn })
            if (this.props.player === this.state.currentTurn) {
                this.handleClickOpposite(spotSelected)
            }
        })

        socket.on('playerLeft', () => {
            alert('opponent left. Game over')
            // this.props.history.push('/dashboard')
        })
    }

    initializePlayer1 = async() => {

        let { player1Map } = this.state
        let id = this.props.map
        await axios.get(`/api/maps/${id}`).then(res => {
            const positions = res.data
            let newBoard = player1Map.map((space, i) => {
                for (let key in positions) {
                    if (key.charAt(10) && positions[key] === i) {
                        space.name = key
                    }
                }
                return space
            })
            this.setState ({ player1Map: newBoard })
        }) 
        let { map:map1 } = this.props
        let { room } = this.props
        socket.emit('startGame', { map1, room })
    }

    initializePlayer2 = async() => {
        let id = this.props.map
        await axios.get(`/api/maps/${id}`).then(res => {
            const positions = res.data
            let newBoard = board2.map((space, i) => {
                for (let key in positions) {
                    if (key.charAt(10) && positions[key] === i) {
                        space.name = key
                    }
                }
                return space
            })
            this.setState({ player2Map: newBoard})
        })
        let { map:map2, room } = this.props
        socket.emit('joinGame', {map2, room})
    }

    handleClickOpposite = (spotSelected) => {
        const { i } = spotSelected
        if (this.props.player === this.state.currentTurn) {
            if (this.props.player === 'player1') {
                let map = this.state.player1Map
                let space = this.state.player1Map[i]
                let {name} = space

                if (name === 'm2_position1') {
                    map[i].comp = <Stoplight/>
                } else if (name === 'm2_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm3_position1') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm3_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm3_position3') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm3b_position1') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm3b_position2') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm3b_position3') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm4_position1') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm4_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm4_position3') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm4_position4') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm5_position1') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm5_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm5_position3') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm5_position4') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm5_position5') {
                    map[i].comp = <Stoplight/>
                }
                this.setState ({ player1Map: map })

            } else {

                let map = this.state.player2Map
                let space = this.state.player2Map[i]
                let {name} = space

                if (name === 'm2_position1') {
                    map[i].comp = <Stoplight/>
                } else if (name === 'm2_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm3_position1') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm3_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm3_position3') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm3b_position1') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm3b_position2') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm3b_position3') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm4_position1') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm4_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm4_position3') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm4_position4') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm5_position1') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm5_position2') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm5_position3') {
                    map[i].comp = <Stoplight/>
                }  else if (name === 'm5_position4') {
                    map[i].comp = <Threebar/>
                }  else if (name === 'm5_position5') {
                    map[i].comp = <Stoplight/>
                }
                this.setState ({ player2Map: map })
                
            }
        }
    }

    handleClick = async (spotSelected) => {
        console.log(spotSelected)
        
        const {name} = spotSelected.space
        const { space } = spotSelected

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
        socket.emit('changeTurns', {currentTurn, room, spotSelected})
    }

    leaveGame = () => {
        let { room } = this.props
        socket.emit('leaveGame', room)
        this.props.history.push('/dashboard')
    }

    render() {
        console.log(this.props)

        return (
            <div className='gameboard'>
                <h2>Gameboard</h2>
                {                                                   
                    this.state.currentTurn === this.props.player ? 
                        <h6>Your Turn</h6>                          
                    :                                                   
                        <h6>Opponent's turn</h6>                      
                }
                <div className='player-1'>
                    { this.state.player1Map.length > 0 ?
                        this.state.player1Map.map((space, i) => {
                        return (
                            <div
                            key ={i}
                            onClick={() => this.handleClick({space, i})}>
                                {space.comp}
                            </div>
                        )
                    })
                    :
                    null
                    }
                </div>
                <div className='player-2'>
                    {this.state.player2 ?
                        this.state.player2Map.map((space, i) => {
                        return (
                            <div
                            key ={i}
                            onClick={() => this.handleClick({space, i})}>
                                {space.comp}
                            </div>
                        )
                    })
                    :
                    <h1>Waiting for Opponent</h1>
                    }
                    <h1 onClick={this.leaveGame}>Leave Game</h1>
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