import React, {useEffect} from 'react'
import './Home.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import icon from '../../Assets/personicon.png'
import FactionPage from '../FactionPage/FactionPage'

const Home = props => {
    useEffect(()=> {
            props.getUser()
    }, [props])

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

                    <div className='video'></div>
                </section>

                <section className='about-header'>
                    <h1>about</h1>
                    <p>info about the game and stuff</p>
                </section>

                <section className='about-section'>
                    <div className='about-text'>
                        <p>Words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words words wordswords words words words words words words words words words words words</p>
                    </div>

                    <div className='developers'>
                        <div>
                            <img src={icon} alt='dev'/>
                            <p>riley</p>
                        </div>
                        <div>
                            <img src={icon} alt='dev'/>
                            <p>derek</p>
                        </div>
                        <div>
                            <img src={icon} alt='dev'/>
                            <p>marshall</p>
                        </div>
                        <div>
                            <img src={icon} alt='dev'/>
                            <p>devin</p>
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