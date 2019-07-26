import React, {useEffect, useState} from 'react'
import './Dashboard.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getUser} from '../../ducks/reducers/user'
import {setMap} from '../../ducks/reducers/game'
import {addMap} from '../../ducks/reducers/map'
import axios from 'axios'
import Lobby from '../Lobby/Lobby'


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
        <div>
            {props.user 
            ?
            <div className='dash'>
                {lobby 
                ? 
                    <Lobby/>
                :
                <div>
                    {mapsList &&
                        mapsList.map((map, i) => {
                            return (
                                <div
                                key={i}>
                                    <p>{map.name}</p>
                                    <button onClick={() => setMap(map.map_id)}>set map</button>
                                    <button onClick={() => deleteMap(map.map_id)}>delete</button>
                                </div>
                            )
                        })
                    }
                </div>
                }

                <div>
                <button className='button' onClick={addMap}>add map</button>
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

export default connect(mapStateToProps, {getUser, setMap, addMap})(Dashboard)
