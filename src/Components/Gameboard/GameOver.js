import React, { Component } from 'react'
import './GameOver.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class GameOver extends Component {
    render() {
    console.log(this.props)
        let { winner, player } = this.props
    return (
        <div className='gameover'>
            <div className='win-or-lose'>
            {
                winner === player ?
                    <div><p>Game Over. You won! </p></div>
                :
                    <div><p>Game over. You lost.</p></div> 
            }
            </div>
            <div className='gameover-buttons'>
                <Link to='/dashboard'>
                    <button>Go to Dashboard</button>
                </Link>
                <Link to='/'>
                    <button>Go to Faction Page</button> 
                </Link>   
            </div>     
        </div>
            )}
    }

const mapStateToProps = state => {
    return {
        player: state.game.player
    }
}

export default connect(mapStateToProps, null)(GameOver)

let style = {
    'width': '100vw',
    'height': 'calc(100vh - 70px)',
    'background': 'rgba(255,255,255,.5)',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'position': 'absolute'
}