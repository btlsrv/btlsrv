// import axios from 'axios'

module.exports = {
    add: (num1, num2) => {
        return num1 + num2
    },

    getMaps: async (req, res) => {
        let maps = await axios.get('/api/maps')
        this.setState({
            maplist: maps.data
        })
    },

    setMap: (id) => {
        props.setMap(id)
        setLobby(true)
    },

    addMap: async (req, res) => {
        let { id } = req.session.user

        axios.delete(`/api/maps/${id}`).then(res => {
            console.log('delete res', res)
            axios.get('/api/maps').then(res => {
                console.log('second res', res)
                setMapsList(res.data)
            })
        })
    },

    deleteMap: async (req, res) => {
        let { id } = req.session.user

        await axios.post('/api/maps').then(res => {
            let id = res.data[0].map_id
            props.addMap(id)
        })
        props.history.push('/addmap')
    },

    handleChange: (e) => {
        const { name, value } = e.target
        setInfo({
            ...info,
            [name]: value
        })
    },

    handleLogin: (e) => {
        e.preventDefault()
        props.login(info)
    },

    saveMap: () => {
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
    },

    handleRotate: (str, direction) => {
        if (direction === 'row') {
            this.setState({
                [str]: 'column'
            })} else {
                this.setState({
                    [str]: 'row'
                })
            }
    },

    getUser: () => {
        return {
            type: GET_USER,
            payload: axios.get('/auth/getuser')
        }
    },

    login: () => {
        return {
            type: LOGIN_USER,
            payload: axios.post('/auth/login', loginInfo)
        }
    },

    logout: () => {
        return {
            type: LOGOUT_USER,
            payload: axios.get('/auth/logout')
        }
    },

    onDrop: (e, i) => {
        let length = +e.dataTransfer.getData('length')
        let {moduleTwo, moduleThree, moduleThreeB, moduleFour, moduleFive, modTwoDirection, modThreeDirection, modThreeBDirection, modFourDirection, modFiveDirection, currentIndex} = this.state
       
        if (length === 2 && modTwoDirection === 'row') {
            let rowI = this.check(i)            
            this.setTwoRow(currentIndex, rowI, i)
        }
        if (length === 3 && modThreeDirection === 'row') {
            let rowI = this.check(i)            
            this.setThreeRow(currentIndex, rowI, i)
        }
        if (length === 33 && modThreeBDirection === 'row') {
            let rowI = this.check(i)            
            this.setThreeBRow(currentIndex, rowI, i)
        }
        if (length === 4 && modFourDirection === 'row') {
            let rowI = this.check(i)            
            this.setFourRow(currentIndex, rowI, i)
        }
        if (length === 5 && modFiveDirection === 'row') {
            let rowI = this.check(i)            
            this.setFiveRow(currentIndex, rowI, i)
        }

        length === 2 && modTwoDirection === 'column' && this.setTwoColumn(currentIndex, i)
        length === 3 && modThreeDirection === 'column' && this.setThreeColumn(currentIndex, i)
        length === 33 && modThreeBDirection === 'column' && this.setThreeBColumn(currentIndex, i)
        length === 4 && modFourDirection === 'column' && this.setFourColumn(currentIndex, i)
        length === 5 && modFiveDirection === 'column' && this.setFiveColumn(currentIndex, i)

        this.setState({
            moduleTwo,
            moduleThree,
            moduleThreeB,
            moduleFour,
            moduleFive
        })

        this.setSave()
    },

    setFiveColumn: (currentIndex, i) => {
        i = - currentIndex * 10 + i           
        if (currentIndex === 0 && i >= 60) {
            return this.resetPiece(5)
        } else if ( currentIndex === 1 && i <= -1) {
            return this.resetPiece(5)
        } else if ( currentIndex === 1 && i >= 60) {
            return this.resetPiece(5)
        } else if ( currentIndex === 2 && i <= -1) {
            return this.resetPiece(5)
        } else if ( currentIndex === 2 && i >= 60) {
            return this.resetPiece(5)
        } else if ( currentIndex === 3 && i <= -1) {
            return this.resetPiece(5)
        } else if ( currentIndex === 3 && i >= 60) {
            return this.resetPiece(5)
        } else if ( currentIndex === 4 && i <= -1) {
            return this.resetPiece(5)
        } else if (board[i].class !== 'box blank' || 
                    board[i + 10].class !== 'box blank' || 
                    board[i + 20].class !== 'box blank' || 
                    board[i + 30].class !== 'box blank' || 
                    board[i + 40].class !== 'box blank') {
                    return this.resetPiece(5)            
        } else {
            board.splice(i, 1, moduleFive[0])
            board.splice(i + 10, 1, moduleFive[1])
            board.splice(i + 20, 1, moduleFive[2])
            board.splice(i + 30, 1, moduleFive[3])
            board.splice(i + 40, 1, moduleFive[4])
            moduleFive[0].m5_position1 = i
            moduleFive[1].m5_position2 = i + 10
            moduleFive[2].m5_position3 = i + 20
            moduleFive[3].m5_position4 = i + 30
            moduleFive[4].m5_position5 = i + 40
            this.setState({
                modFiveDisplay: false,
                moduleFive: moduleFive
            })
        }
    },

    setFiveRow: (currentIndex, rowI, i) => {
        i =  i - currentIndex
        let length = 5
        if (currentIndex === 0 && +rowI >= 6) {
            return this.resetPiece(5)
        } else if ( currentIndex === 1 && +rowI === 0) {
            return this.resetPiece(5)
        } else if ( currentIndex === 1 && +rowI >= 7) {
            return this.resetPiece(5)
        } else if ( currentIndex === 2 && +rowI <= 1) {
            return this.resetPiece(5)
        } else if ( currentIndex === 2 && +rowI >= 8) {
            return this.resetPiece(5)
        } else if ( currentIndex === 3 && +rowI <= 2) {
            return this.resetPiece(5)
        } else if ( currentIndex === 3 && +rowI === 9) {
            return this.resetPiece(5)
        } else if ( currentIndex === 4 && +rowI <= 3) {
            return this.resetPiece(5)
        } else if (board[i].class !== 'box blank' || 
                    board[i + 1].class !== 'box blank' || 
                    board[i + 2].class !== 'box blank' || 
                    board[i + 3].class !== 'box blank' || 
                    board[i + 4].class !== 'box blank') {
                    return this.resetPiece(5)            
            } else {
            board.splice(i, length, moduleFive[0], moduleFive[1], moduleFive[2], moduleFive[3], moduleFive[4])
            moduleFive[0].m5_position1 = i
            moduleFive[1].m5_position2 = i + 1
            moduleFive[2].m5_position3 = i + 2
            moduleFive[3].m5_position4 = i + 3
            moduleFive[4].m5_position5 = i + 4
            this.setState({
                modFiveDisplay: false,
                moduleFive: moduleFive
            })
        }
    },

    setFourColumn: (currentIndex, i) => {
        i = - currentIndex * 10 + i           
        if (currentIndex === 0 && i >= 70) {
            return this.resetPiece(4)
        } else if ( currentIndex === 1 && i <= -1) {
            return this.resetPiece(4)
        } else if ( currentIndex === 1 && i >= 70) {
            return this.resetPiece(4)
        } else if ( currentIndex === 2 && i <= -1) {
            return this.resetPiece(4)
        } else if ( currentIndex === 2 && i >= 70) {
            return this.resetPiece(4)
        } else if ( currentIndex === 3 && i <= -1) {
            return this.resetPiece(4)
        } else if (board[i].class !== 'box blank' || 
                    board[i + 10].class !== 'box blank' || 
                    board[i + 20].class !== 'box blank' || 
                    board[i + 30].class !== 'box blank') {
                    return this.resetPiece(4)            
        } else {
            board.splice(i, 1, moduleFour[0])
            board.splice(i + 10, 1, moduleFour[1])
            board.splice(i + 20, 1, moduleFour[2])
            board.splice(i + 30, 1, moduleFour[3])
            moduleFour[0].m4_position1 = i
            moduleFour[1].m4_position2 = i + 10
            moduleFour[2].m4_position3 = i + 20
            moduleFour[3].m4_position4 = i + 30
            this.setState({
                modFourDisplay: false,
                moduleFour: moduleFour
            })
        }
    },

    setFourRow: (currentIndex, rowI, i) => {
        let length = 4
        i =  i - currentIndex
        if (currentIndex === 0 && +rowI >= 7) {
            return this.resetPiece(4)
        } else if ( currentIndex === 1 && +rowI === 0) {
            return this.resetPiece(4)
        } else if ( currentIndex === 1 && +rowI >= 8) {
            return this.resetPiece(4)
        } else if ( currentIndex === 2 && +rowI <= 1) {
            return this.resetPiece(4)
        } else if ( currentIndex === 2 && +rowI === 9) {
            return this.resetPiece(4)
        } else if ( currentIndex === 3 && +rowI <= 2) {
            return this.resetPiece(4)
        } else if (board[i].class !== 'box blank' || 
                    board[i + 1].class !== 'box blank' || 
                    board[i + 2].class !== 'box blank' || 
                    board[i + 3].class !== 'box blank') {
            return this.resetPiece(4)            
        } else {
            board.splice(i, length, moduleFour[0], moduleFour[1], moduleFour[2], moduleFour[3])
            moduleFour[0].m4_position1 = i
            moduleFour[1].m4_position2 = i + 1
            moduleFour[2].m4_position3 = i + 2
            moduleFour[3].m4_position4 = i + 3
            this.setState({
                modFourDisplay: false,
                moduleFour: moduleFour
            }) 
        }
    },

    setThreeBColumn: (currentIndex, i) => {
        i = - currentIndex * 10 + i           
        if (currentIndex === 0 && i >= 80) {
            return this.resetPiece(33)
        } else if ( currentIndex === 1 && i <= -1) {
            return this.resetPiece(33)
        } else if ( currentIndex === 1 && i >= 80) {
            return this.resetPiece(33)
        } else if ( currentIndex === 2 && i <= -1) {
            return this.resetPiece(33)
        }  else if (board[i].class !== 'box blank' || 
                    board[i + 10].class !== 'box blank' || 
                    board[i + 20].class !== 'box blank') {
            return this.resetPiece(33)            
        } else {
            board.splice(i, 1, moduleThreeB[0])
            board.splice(i + 10, 1, moduleThreeB[1])
            board.splice(i + 20, 1, moduleThreeB[2])
            moduleThreeB[0].m3b_position1 = i
            moduleThreeB[1].m3b_position2 = i + 10
            moduleThreeB[2].m3b_position3 = i + 20
            this.setState({
                modThreeBDisplay: false,
                moduleThreeB: moduleThreeB
            })
        }
    },

    setThreeBRow: (currentIndex, rowI, i) => {
        let length = 3
        i = i - currentIndex
        if (currentIndex === 0 && +rowI >= 8) {
            return this.resetPiece(33)
        } else if ( currentIndex === 1 && +rowI === 0) {
            return this.resetPiece(33)
        } else if ( currentIndex === 1 && +rowI === 9) {
            return this.resetPiece(33)
        } else if ( currentIndex === 2 && +rowI <= 1) {
            return this.resetPiece(33)
        } else if (board[i].class !== 'box blank' || 
                    board[i + 1].class !== 'box blank' || 
                    board[i + 2].class !== 'box blank') {
            return this.resetPiece(33)            
        } else {
            board.splice(i, length, moduleThreeB[0], moduleThreeB[1], moduleThreeB[2])
            moduleThreeB[0].m3b_position1 = i
            moduleThreeB[1].m3b_position2 = i + 1
            moduleThreeB[2].m3b_position3 = i + 2
            this.setState({
                modThreeBDisplay: false,
                moduleThreeB: moduleThreeB
            })
        }
    },

    setThreeColumn: (currentIndex, i) => {
        i = - currentIndex * 10 + i           
        if (currentIndex === 0 && i >= 80) {
            return this.resetPiece(3)
        } else if ( currentIndex === 1 && i <= -1) {
            return this.resetPiece(3)
        } else if ( currentIndex === 1 && i >= 80) {
            return this.resetPiece(3)
        } else if ( currentIndex === 2 && i <= -1) {
            return this.resetPiece(3)
        }  else if (board[i].class !== 'box blank' || 
                    board[i + 10].class !== 'box blank' || 
                    board[i + 20].class !== 'box blank') {
            return this.resetPiece(3)            
        } else {
            board.splice(i, 1, moduleThree[0])
            board.splice(i + 10, 1, moduleThree[1])
            board.splice(i + 20, 1, moduleThree[2])
            moduleThree[0].m3a_position1 = i
            moduleThree[1].m3a_position2 = i + 10
            moduleThree[2].m3a_position3 = i + 20
            this.setState({
                modThreeDisplay: false,
                moduleThree: moduleThree
            })
        }
    },

    setThreeRow: (currentIndex, rowI, i) => {
        let length = 3
        i = i - currentIndex
        if (currentIndex === 0 && +rowI >= 8) {
            return this.resetPiece(3)
        } else if ( currentIndex === 1 && +rowI === 0) {
            return this.resetPiece(3)
        } else if ( currentIndex === 1 && +rowI === 9) {
            return this.resetPiece(3)
        } else if ( currentIndex === 2 && +rowI <= 1) {
            return this.resetPiece(3)
        } else if (board[i].class !== 'box blank' || 
                    board[i + 1].class !== 'box blank' || 
                    board[i + 2].class !== 'box blank') {
            return this.resetPiece(3)            
        } else {
            board.splice(i, length, moduleThree[0], moduleThree[1], moduleThree[2])
            moduleThree[0].m3a_position1 = i
            moduleThree[1].m3a_position2 = i + 1
            moduleThree[2].m3a_position3 = i + 2
            this.setState({
                modThreeDisplay: false,
                moduleThree: moduleThree
            })
        }
    }
}