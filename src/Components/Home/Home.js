import React, {useEffect} from 'react'
import './Home.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'

const Home = props => {
    useEffect(()=> {
            props.getUser()
    }, [props])

    return (
        <div>
            {props.user
                ?
                <div>
                    <h1 style={{'color':'white'}}>faction page</h1>f
                </div>
                :
                <div className='body'>
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