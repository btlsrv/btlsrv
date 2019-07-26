import React from 'react'
import './Stoplight.scss'

const Stoplight = () => {
    return (
        <div className='module stoplight'>
            <div className='back-box'>
                <div className='circle yellow'></div>
                <div className='circle red'></div>
            </div>
        </div>
    )
}

export default Stoplight