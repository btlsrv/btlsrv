import React, { useEffect, useState } from 'react'
import './FactionPage.scss'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducers/user'
import axios from 'axios'
import monkey from '../../Assets/cybermonkeys.svg'
import alpaca from '../../Assets/alpacahackas.svg'
import duck from '../../Assets/skylightducks.svg'

const FactionPage = props => {
    const [faction, setFaction] = useState('')
    const [picture, setPicture] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const {getUser} = props
    
    useEffect(()=> {
        getUser()
        let {user} = props
        if (user.faction_id === 1) {
            setFaction('cyber monkeys')
            setPicture(monkey)
        } else if (user.faction_id === 2) {
            setFaction('alpaca hackas')
            setPicture(alpaca)
        } else {
            setFaction('skylight ducks')
            setPicture(duck)
        }
        axios.get('api/messages').then(res => {
            let messagesArray = res.data
            let updatedMessages = messagesArray.map(message => {
                if (message.username === props.user.username) {
                    let newMessage = {...message, class: 'message my-message'}
                    return newMessage
                } else {
                    let newMessage = {...message, class: 'message faction-message'}
                    return newMessage
                }
            })
            setMessages(updatedMessages)
            pageScroll()
        })
    }, [getUser, faction, messages.length])

    const handleChange = e => {
        const {value} = e.target
        setMessage(value)
    }

    const sendMessage = () => {
        let forum_id = props.user.faction_id
        let body = {
            message,
            forum_id
        }
        axios.post('/api/messages', body).then(res => {
            console.log('res', res)
            axios.get('api/messages').then(res => {
                let messagesArray = res.data
                let updatedMessages = messagesArray.map(message => {
                    if (message.username === props.user.username) {
                        let newMessage = {...message, class: 'message my-message'}
                        return newMessage
                    } else {
                        let newMessage = {...message, class: 'message faction-message'}
                        return newMessage
                    }
                })
                setMessages(updatedMessages)
            })
        })
        setMessage('')
    }

    const pageScroll = () => {
        document.getElementById('scroll').scrollBy(0, 100000000000000000)
        setTimeout('pageScroll', 0)
    }

    return (
        <div className='faction'>
            <div className='faction-header'>
                <img src={picture} alt='faction picture id' style={{'width': 75, 'marginRight': 10}}/>
                <h1>{faction}</h1>
            </div>

            <section className='faction-main'>
                <div className='leaderboard box-shadow'>

                </div>

                <div className='forum box-shadow' id="scroll">
                    {messages &&
                        messages.map((message, i) => {
                            return (
                                <div key={i} className={message.class}>
                                    <h6 className='username'>{message.username}:</h6>
                                    <p>{message.message}</p>
                                </div>
                            )
                        })
                    }
                    <div className='create-message'>
                        <input type='text' onChange={handleChange} value={message}></input>
                        <button onClick={sendMessage}>send</button>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser})(FactionPage)
