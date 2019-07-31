import React, {useEffect, useState} from 'react'
import './Dashboard.scss'
// import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import {setMap} from '../../ducks/reducers/game'
import {addMap} from '../../ducks/reducers/map'
import axios from 'axios'
import Lobby from '../Lobby/Lobby'
import Chart from '../Chart/Chart'
import monkey from '../../Assets/cybermonkeys.svg'
import alpaca from '../../Assets/alpacahackas.svg'
import duck from '../../Assets/skylightducks.svg'


const Dashboard = props => {
    let {getUser} = props

    const [lobby, setLobby] = useState(false)
    const [mapsList, setMapsList] = useState([])
    const [topTen, setTopTen] = useState([])
    
    useEffect(()=> {
        getUser()
        axios.get('/api/maps').then(res => {
            setMapsList(res.data)
        })
        axios.get('/api/users').then(res => {
            setTopTen(res.data)
        })
    }, [getUser, setMapsList])

    const setMap = id => {
        props.setMap(id)
        setLobby(true)
    }

    const userPicture = id => {
        if (id === 1) {
            return monkey
        } else if (id === 2) {
            return alpaca
        } else {
            return duck
        }
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
                     {mapsList.length < 1 && !lobby ?
                    <div className='top-message'>
                        <p>click the pink "add map" button to get started</p>
                    </div>
                    :
                    <div className='top-message'>
                        <p>set a map to start or join a game!</p>
                    </div>
                    }
                    {mapsList.length > 0 &&
                        <div>{mapsList.map((map, i) => {
                            return (
                                <div
                                key={i}
                                className='map'>
                                    <p className='map-name'>{map.name}</p>
                                    <button onClick={() => setMap(map.map_id)}>set map</button>
                                    <button onClick={() => deleteMap(map.map_id)}>delete</button>
                                </div>
                            )
                        })}</div>
                    }
                </div>
                }

                <div className='right-section'>
                    <div className ='right-section-top box-and-shadow'>
                            <h2>{props.user.username}'s dashboard</h2>
                    </div>
                    <div className='right-section-middle'>
                        <div className='top-section-left'>
                            <div className='dash-faction box-and-shadow'>
                                <img src={userPicture(props.user.faction_id)} alt='user profile'/>
                            </div>
                            <div className='map-button box-and-shadow'>
                                {mapsList.length > 9 ?
                                <div>
                                    <p>you've reached the 10 map limit</p>
                                </div>
                                :
                                <button className='top-button button-text' onClick={addMap}>add map</button>
                                }
                                
                            </div>
                        </div>
                        <div className='right-section-chart box-and-shadow'>
                            <Chart/>
                        </div>
                    </div>
                    <div className='right-section-bottom box-and-shadow'>
                        <p>top ten players</p>
                        <div className='leaderboard'>
                        {topTen && 
                            topTen.map((user, i) => {
                                return (
                                    <div key={i} className='leaderboard-space'>
                                        <div className='leaderboard-user'>
                                            <img src={userPicture(user.faction_id)} alt='faction mascot'/>
                                            <h4>{user.username}</h4>
                                        </div>
                                        <div className='victories-defeats'>
                                            <h5>V:{user.victories}</h5>
                                            <h5>D:{user.defeats}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
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
