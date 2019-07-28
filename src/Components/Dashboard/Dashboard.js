import React, {useEffect, useState} from 'react'
import './Dashboard.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import {setMap} from '../../ducks/reducers/game'
import {addMap} from '../../ducks/reducers/map'
import axios from 'axios'
import Lobby from '../Lobby/Lobby'
import Chart from '../Chart/Chart'


const Dashboard = props => {
    let {getUser} = props

    const [lobby, setLobby] = useState(false)
    const [mapsList, setMapsList] = useState([])
    
    useEffect(()=> {
        getUser()
        axios.get('api/maps').then(res => {
            setMapsList(res.data)
        })
    }, [getUser, setMapsList])

    const setMap = id => {
        props.setMap(id)
        setLobby(true)
    }

    const deleteMap = id => {
        console.log('the id', id)
        axios.delete(`/api/maps/${id}`).then(res => {
            console.log('delete res', res)
            axios.get('/api/maps').then(res => {
                console.log('second res', res)
                setMapsList(res.data)
            })
        })
    }

    const addMap = async () => {
        await axios.post('/api/maps').then(res => {
            let id = res.data[0].map_id
            props.addMap(id)
        })
        props.history.push('/addmap')
    }

    return (
        <div className='dash'>
            {props.user 
            ?
            <div className='card-container'>
                {lobby 
                ? 
                    <Lobby/>
                :
                <div className='map-list box-and-shadow'>
                    {mapsList &&
                        mapsList.map((map, i) => {
                            return (
                                <div
                                key={i}
                                className='map'>
                                    <p className='map-name'>{map.name}</p>
                                    <button onClick={() => setMap(map.map_id)}>set map</button>
                                    <button onClick={() => deleteMap(map.map_id)}>delete</button>
                                </div>
                            )
                        })
                    }
                </div>
                }

                <div className='right-section'>
                    <div className='right-section-top'>
                        <div className='map-buttons box-and-shadow'>
                            <button className='top-button button-text' onClick={addMap}>add map</button>
                            <button className='top-button'><Link to='/viewmaps' className='button-text'>view maps</Link></button>
                        </div>
                        <div className='profile box-and-shadow'>
                            <img src={props.user.profile_pic} alt='user profile image'/>
                        </div>
                    </div>
                    <div className='right-section-middle box-and-shadow'>
                        <Chart/>
                    </div>
                    <div className='right-section-bottom box-and-shadow'>
                        <p>leaderboard</p>
                        <div className='overall-leaderboard'></div>
                    </div>
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

export default connect(mapStateToProps, {getUser, setMap, addMap})(Dashboard)
