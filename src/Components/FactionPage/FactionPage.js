import React, { useEffect, useState } from 'react'
import './FactionPage.scss'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducers/user'
import axios from 'axios'

const FactionPage = props => {
    const [faction, setFaction] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(()=> {
        getUser()
        let {user} = props
        if (user.faction_id === 1) {
            setFaction('cyber monkeys')
        } else if (user.faction_id === 2) {
            setFaction('alpaca hackas')
        } else {
            setFaction('skylight ducks')
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
        })
    }, [getUser, setFaction])

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

    return (
        <div className='faction'>
            <h1>{faction}</h1>

            <section className='faction-main'>
                <div className='leaderboard box-shadow'>

                </div>

                <div className='forum box-shadow'>
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
