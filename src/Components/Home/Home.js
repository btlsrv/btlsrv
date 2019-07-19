import React from 'react'
import './Home.scss'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <body>
            <section className='top-section'>
                <h1 className='welcome'>welcome</h1>
                <div className='video'></div>

                <div className='buttons'>
                    <Link to='/login'><button>login</button></Link>
                    <Link to='/register'><button>register</button></Link>
                </div>
            </section>

            <section className='about-section'>
                <h1>about</h1>
                <p>info about the game and stuff</p>
            </section>
        </body>
    )
}

export default Home