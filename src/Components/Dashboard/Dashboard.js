import React, {useEffect, useState} from 'react'
import './Dashboard.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import {setMap} from '../../ducks/reducers/game'
import axios from 'axios'
import Lobby from '../Lobby/Lobby'


const Dashboard = props => {
    let {getUser} = props

    const [lobby, setLobby] = useState(false)
    
    useEffect(()=> {
        getUser()
    }, [getUser])

    const setMap = () => {
        props.setMap(3)
        setLobby(true)
    }


    return (
        <div>
            {props.user 
            ?
            <div className='dash'>
                {lobby 
                ? 
                    <Lobby/>
                :
                    <button onClick={setMap}>set map</button>
                }

                <div>
                <Link to='/addmap'><button className='button'>add map</button></Link>
                <Link to='/viewmaps'><button>view maps</button></Link>
                </div>
                
            </div>
            :
            // <Redirect to='/'/>
            <div></div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser, setMap})(Dashboard)
