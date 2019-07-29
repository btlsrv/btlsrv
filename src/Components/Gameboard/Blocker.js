import React from 'react'

const Blocker = () => <div style={style}><p>Opponent's Turn</p></div>

export default Blocker

let style = {
    'width': '100vw',
    'height': 'calc(100vh - 70px)',
    'background': 'rgba(255,255,255,.5)',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'position': 'absolute'
}