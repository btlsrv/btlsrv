import axios from 'axios'

export function add(num1, num2) {
    return num1 + num2
}

//// Dashboard Component
export async function getMaps() {
    let maps = axios.get('/api/maps')
    return maps
}

export function setMap(id){
    props.setMap(id)
    setLobby(true)
}

export function deleteMap (id) {
    console.log('the id', id)
    axios.delete(`/api/maps/${id}`).then(res => {
        console.log('delete res', res)
        axios.get('/api/maps').then(res => {
            console.log('second res', res)
            setMapsList(res.data)
        })
    })
}

export async function addMap() {
    await axios.post('/api/maps').then(res => {
        let id = res.data[0].map_id
        props.addMap(id)
    })
    props.history.push('/addmap')
}

/// Login Component
export function handleChange(e) {
    const {name, value} = e.target
    setInfo({
        ...info,
        [name]: value
    })
}

export function handleLogin(e) {
    e.preventDefault()
    props.login(info)
}

/// AddMap Component 

export async function saveMap(){
    let map_id = this.props.id
    let name = this.state.name
    let newBoard = this.state.board.filter(space => {
        return space.name !== 'board'
    })
    let objArray = newBoard.map(piece => {
        for (let key in piece) {
            if (key.includes('position')) {
                let newObj = {
                    [key]: piece[key]
                }
                return newObj
            }
        }
    })
}

export function handleRotate(str, direction) {
    if (direction === 'row') {
    this.setState({
        [str]: 'column'
    })} else {
        this.setState({
            [str]: 'row'
        })
    }
}

/// User reducer

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/getuser')
    }
}

export function login(loginInfo) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', loginInfo)
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout')
    }
}

