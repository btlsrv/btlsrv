import React from 'react'
import './Blocker.scss'

const Blocker = (props) => {
    console.log(props)
    return (
        <div className='blocker'>
            <p>Opponent's Turn</p>
            <button onClick={props.leaveGame}>Leave Game</button>
        </div>
    )
}
export default Blocker