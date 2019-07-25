import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import io from 'socket.io-client'
import board from './board'
import axios from 'axios'
// const socket = io()
import './Gameboard.scss'


class Gameboard extends Component {
    constructor() {
        super() 

        this.state = {
            room: 0,
            board
        }
    }

    componentDidMount() {
        this.props.getUser()
        let id = 3 //later this will come from redux
        const {board} = this.state
        axios.get(`/api/maps/${id}`).then(res => {
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
                board: newBoard
            })
        })
        // socket.emit('startGame')
        // socket.on('startedGame', players => {
        // let {gameRoom} = players
        // setRoom(gameRoom)
        // console.log(players)
        // })
    }

    handleClick = space => {
        console.log('THE SPACE', space)
        const {name} = space
        // if (name === 'sapce') {
        //     return class = 'missed'
        // }
    }

    render() {
        console.log('THE BOARD', this.state.board)
        return (
            <div className='gameboard'>
                <h2>Gameboard</h2>
                <div className='board'>
                    {this.state.board.map((space, i) => {
                        return (
                            <div
                            key ={i}
                            onClick={() => this.handleClick(space)}>
                                {space.comp}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser})(Gameboard)