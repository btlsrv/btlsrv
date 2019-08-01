import React, {useEffect} from 'react'
import './Home.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import FactionPage from '../FactionPage/FactionPage'
import derek from '../../Assets/derek.png'
import devin from '../../Assets/devin.png'
import marshall from '../../Assets/marshall.png'
import riley from '../../Assets/riley.png'
import Btlsrvboard from './Btlsrvboard'



const Home = props => {
    const {getUser} = props
    useEffect(()=> {
        getUser()
    }, [getUser])

    return (
        <div className='home'>
            {props.user
                ?
                <FactionPage/>
                :
                <div className='body'>
                <section className='top-section'>
                    <div className='top-text'>
                        <h1 className='welcome'>welcome</h1>
                        <div className='buttons'>
                            <Link to='/login'><button>login</button></Link>
                            <Link to='/register'><button>register</button></Link>
                        </div>
                    </div>

                    <div className='btlsrv-grid'>
                        <Btlsrvboard/>
                    </div>
                </section>

                <section className='about-header'>
                    <h1 style={{'background':'white'}}>about</h1>
                    <p style={{'background':'white'}}>read about the game and its developers</p>
                </section>

                <section className='about-section'>
                    <div className='about-text'>
                        <p>We developed BTLSRV in our final weeks as students at DevMountain's web development bootcamp. The app was built with React, Sass, Node, Postgres, Massive, Express, Express-Sessions, and Socket.io. We had a great time learning and building it and hope that you enjoy playing.</p>
                    </div>

                    <div className='developers'>
                        <div>
                            <img src={derek} alt='dev'/>
                            <p>derek</p>
                        </div>
                        <div>
                            <img src={devin} alt='dev'/>
                            <p>devin</p>
                        </div>
                        <div>
                            <img src={marshall} alt='dev'/>
                            <p>marshall</p>
                        </div>
                        <div>
                            <img src={riley} alt='dev'/>
                            <p>riley</p>
                        </div>
                    </div>
                </section>
            </div>}
    </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser})(Home)