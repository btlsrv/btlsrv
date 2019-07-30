import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import {board1, board2, board3} from './board'
import axios from 'axios'
import './Gameboard.scss'
import Blank from '../Modules/Blank/Blank'
import Missed from '../Modules/Missed/Missed'
import Stoplight from '../Modules/Stoplight/Stoplight'
import Threebar from '../Modules/ThreeBar/ThreeBar'
import Sidebar from '../Modules/Sidebar/Sidebar'
import ManyDots from '../Modules/ManyDots/ManyDots'
import TwoMiniDots from '../Modules/TwoMiniDots/TwoMiniDots'
import Blankspot from './Blankspot'
import Missedspot from './Missedspot'
import Modulespot from './Modulespot'
import Hitspot from './Hitspot'
import Blocker from './Blocker'
import GameOver from './GameOver'
import socket from '../../sockets'

class Gameboard extends Component {
    constructor() {
        super() 

        this.state = {
            player1Map: [...board1],
            player2Map: [...board2],
            player1Hits: 16,
            player2Hits: 16,
            player2: false,
            currentTurn: 'player1',
            winner: ''
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
            let { player1Map, player2Map } = this.state
            if (this.props.player === 'player1') {
                await axios.get(`/api/maps/${map2}`).then(res => {
                    const positions = res.data
                    const newBoard = player2Map.map((space, i) => {
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
                    const newBoard = player1Map.map((space, i) => {
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

        socket.on('gameOver', async winner => {
            await this.setState ({ winner })
            if (this.props.player === this.state.winner) {
                axios.post('/api/victories')
            } else {
                axios.post('/api/defeats')
            }
        })

        socket.on('playerLeft', () => {
            alert('opponent left. Game over')
        })
    }

    componentDidUpdate(prevProps, prevState){
        let { winner } = this.state
        let { room } = this.props
        if (prevState.winner !== winner) {
            socket.emit('gameOver', {winner, room})
        }
    }

    initializePlayer1 = async() => {

        let { player1Map } = this.state
        let id = this.props.map
        await axios.get(`/api/maps/${id}`).then(res => {
            console.log('DATA COMING BACK', res.data)
            const positions = res.data
            let mapBoard = player1Map.map((space, i) => {
                for (let key in positions) {
                    if (key.charAt(10) && positions[key] === i) {
                        space.name = key
                    }
                }
                return space
            })
            let newBoard = mapBoard.map((space, i) => {
                if (space.name === 'space') {
                    return {
                        ...space,
                        comp : <Blankspot/>
                    }
                } else if (space.name === 'clicked') {
                    return {
                        ...space,
                        comp : <Missedspot/>
                    }
                } else {
                    return {
                        ...space,
                        comp : <Modulespot/>
                    }
                }
            })
            this.setState ({ player1Map: newBoard })
        }) 
        let { map:map1 } = this.props
        let { room } = this.props
        socket.emit('startGame', { map1, room })
    }

    initializePlayer2 = async() => {
        let id = this.props.map
        let { player2Map } = this.state
        await axios.get(`/api/maps/${id}`).then(res => {
            const positions = res.data
            let mapBoard = player2Map.map((space, i) => {
                for (let key in positions) {
                    if (key.charAt(10) && positions[key] === i) {
                        space.name = key
                    }
                }
                return space
            })
            let newBoard = mapBoard.map((space, i) => {
                if (space.name === 'space') {
                    return {
                        ...space,
                        comp : <Blankspot/>
                    }
                } else if (space.name === 'clicked') {
                    return {
                        ...space,
                        comp : <Missedspot/>
                    }
                } else {
                    return {
                        ...space,
                        comp : <Modulespot/>
                    }
                }
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
                    map[i].comp = <Hitspot/>
                } else if (name === 'm2_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3a_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3a_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3a_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3b_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3b_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3b_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position4') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position4') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position5') {
                    map[i].comp = <Hitspot/>
                } else {
                    map[i].comp = <Missedspot/>
                }
                this.setState ({ player1Map: map })

            } else {

                let map = this.state.player2Map
                let space = this.state.player2Map[i]
                let {name} = space


                if (name === 'm2_position1') {
                    map[i].comp = <Hitspot/>
                } else if (name === 'm2_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3a_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3a_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3a_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3b_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3b_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm3b_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm4_position4') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position1') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position2') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position3') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position4') {
                    map[i].comp = <Hitspot/>
                }  else if (name === 'm5_position5') {
                    map[i].comp = <Hitspot/>
                }  else {
                    map[i].comp = <Missedspot/>
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
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        } else if (name === 'm2_position2') {
            space.comp = <Threebar/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1' })
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm3a_position1') {
            space.comp = <Sidebar/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm3a_position2') {
            space.comp = <TwoMiniDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm3a_position3') {
            space.comp = <Threebar/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm3b_position1') {
            space.comp = <ManyDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm3b_position2') {
            space.comp = <Stoplight/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm3b_position3') {
            space.comp = <Sidebar/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm4_position1') {
            space.comp = <ManyDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm4_position2') {
            space.comp = <ManyDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm4_position3') {
            space.comp = <ManyDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm4_position4') {
            space.comp = <ManyDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm5_position1') {
            space.comp = <TwoMiniDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm5_position2') {
            space.comp = <Sidebar/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm5_position3') {
            space.comp = <Threebar/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm5_position4') {
            space.comp = <ManyDots/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        }  else if (name === 'm5_position5') {
            space.comp = <Stoplight/>
            if (this.state.currentTurn === 'player1') {
                await this.setState ({ player2Hits: this.state.player2Hits + 1 })
                if (this.state.player2Hits === 17) {
                    await this.setState ({ winner: 'player1'})
                }
            } else {
                await this.setState ({ player1Hits: this.state.player1Hits + 1 })
                if (this.state.player1Hits === 17) {
                    await this.setState ({ winner: 'player2'})
                }
            }
        } else {
            space.comp = <Missed/>
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
        console.log(board1, board2, board3)

        return (
            <>
            {this.props.player === 'player1' ? 
            <div className='gameboard'>
            {  
                this.state.winner ?
                    <GameOver winner={this.state.winner}/>
                :
                this.state.currentTurn !== this.props.player ?                                                 
                    <Blocker/>                     
                :
                null 
            }
            <div className='gameboards-main-section'>
            <div className='left-panel'>
                <div className='player-board'>
                    { this.state.player1Map.length > 0 &&
                        this.state.player1Map.map((space, i) => {
                            return (
                                <div key={i} style={{'width': 20, 'height': 20, 'margin': 1}}>{space.comp}</div>
                            )
                    })}
                    <h1 onClick={this.leaveGame}>Leave Game</h1>
                </div>
            </div>
            <div className='opponent-board'>
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
            </div>
            </div>
            </div>

            :

            <div className='gameboard'>
            {                                                   
                this.state.winner ?
                    <GameOver winner={this.state.winner}/>
                :
                this.state.currentTurn !== this.props.player ?                                                 
                    <Blocker/>                     
                :
                null                   
            }
            <div className='gameboards-main-section'>
            <div className='left-panel'>
                <div className='player-board'>
                    { this.state.player2Map.length > 0 &&
                        this.state.player2Map.map((space, i) => {
                            return (
                                <div key={i} style={{'width': 20, 'height': 20, 'margin': 1}}>{space.comp}</div>
                            )
                    })}
                    <h1 onClick={this.leaveGame}>Leave Game</h1>
                </div>
            </div>
            <div className='opponent-board'>
                {this.state.player2 &&
                    this.state.player1Map.map((space, i) => {
                    return (
                        <div
                        key ={i}
                        onClick={() => this.handleClick({space, i})}>
                            {space.comp}
                        </div>
                    )
                })
                }
            </div>
            </div>
            </div>
            }
        </>
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

