import React from 'react'

const Blocker = (props) => {
    console.log(props)
    return (
        <div style={style}>
            <p>Opponent's Turn</p>
            <button onClick={props.leaveGame}>Leave Game</button>
        </div>
    )
}
export default Blocker

let style = {
    'width': '100vw',
    'height': 'calc(100vh - 70px)',
    'background': 'rgba(255,255,255,.5)',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'position': 'absolute',
    'padding': 10
}