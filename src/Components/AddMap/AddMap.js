import React, { Component } from 'react'
import board from './Board'
import moduleTwo from '../Modules/ModuleTwo/ModuleTwo'
import moduleThree from '../Modules/ModuleThree/ModuleThree'
import moduleThreeB from '../Modules/ModuleThreeB/ModuleThreeB'
import moduleFour from '../Modules/ModuleFour/ModuleFour'
import moduleFive from '../Modules/ModuleFive/ModuleFive'
import  '../Modules/Styles/Styles.scss'
import './AddMap.scss'
import Stoplight from '../Modules/Stoplight/Stoplight'
import ThreeBar from '../Modules/ThreeBar/ThreeBar'
import Sidebar from '../Modules/Sidebar/Sidebar'
import TwoMiniDots from '../Modules/TwoMiniDots/TwoMiniDots'
import ManyDots from '../Modules/ManyDots/ManyDots'
import { connect } from 'react-redux'
import axios from 'axios'
import blank from './Blank'

class AddMap extends Component {
    constructor() {
        super()

        this.state = {
            board,
            moduleTwo,
            modTwoDisplay: true,
            modTwoDirection: 'row',
            moduleThree,
            modThreeDisplay: true,
            modThreeDirection: 'row',
            moduleThreeB,
            modThreeBDisplay: true,
            modThreeBDirection: 'row',
            moduleFour,
            modFourDisplay: true,
            modFourDirection: 'row',
            moduleFive,
            modFiveDisplay: true,
            modFiveDirection: 'row',
            currentPiece: 0,
            currentIndex: null,
            name: ''
        }
    }

    handleChange = e => {
        this.setState({
            name: e.target.value
        })
    }

    saveMap = async() => {
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

        let p21 = await objArray.findIndex(obj => obj.m2_position1)
        let p22 = await objArray.findIndex(obj => obj.m2_position2)         
        let p31 = await objArray.findIndex(obj => obj.m3a_position1) 
        let p32 = await objArray.findIndex(obj => obj.m3a_position2)
        let p33 = await objArray.findIndex(obj => obj.m3a_position3)
        let p31b = await objArray.findIndex(obj => obj.m3b_position1) 
        let p32b = await objArray.findIndex(obj => obj.m3b_position2)
        let p33b = await objArray.findIndex(obj => obj.m3b_position3) 
        let p41 = await objArray.findIndex(obj => obj.m4_position1) 
        let p42 = await objArray.findIndex(obj => obj.m4_position2) 
        let p43 = await objArray.findIndex(obj => obj.m4_position3) 
        let p44 = await objArray.findIndex(obj => obj.m4_position4) 
        let p51 = await objArray.findIndex(obj => obj.m5_position1) 
        let p52 = await objArray.findIndex(obj => obj.m5_position2) 
        let p53 = await objArray.findIndex(obj => obj.m5_position3) 
        let p54 = await objArray.findIndex(obj => obj.m5_position4) 
        let p55 = await objArray.findIndex(obj => obj.m5_position5) 

        if (p21 === -1) {
            p21 = 0
        } else if (p22 === -1) {
            p22 = 0
        }else if (p31 === -1) {
            p31 = 0
        } else if (p32 === -1) {
            p32 = 0
        } else if (p33 === -1) {
            p33 = 0
        } else if (p31b === -1) {
            p31b = 0
        } else if (p32b === -1) {
            p32b = 0
        } else if (p33b === -1) {
            p33b = 0
        } else if (p41 === -1) {
            p41 = 0
        } else if (p42 === -1) {
            p42 = 0
        } else if (p43 === -1) {
            p43 = 0
        } else if (p44 === -1) {
            p44 = 0
        } else if (p51 === -1) {
            p51 = 0
        } else if (p52 === -1) {
            p52 = 0
        } else if (p53 === -1) {
            p53 = 0
        } else if (p54 === -1) {
            p54 = 0
        } else if (p55 === -1) {
            p55 = 0
        }

        let body = {
            map_id,
            ...objArray[p21],
            ...objArray[p22],
            ...objArray[p31],
            ...objArray[p32],
            ...objArray[p33],
            ...objArray[p31b],
            ...objArray[p32b],
            ...objArray[p33b],
            ...objArray[p41],
            ...objArray[p42],
            ...objArray[p43],
            ...objArray[p44],
            ...objArray[p51],
            ...objArray[p52],
            ...objArray[p53],
            ...objArray[p54],
            ...objArray[p55],
            name
        }

         this.resetPiece(2)
         this.resetPiece(3)
         this.resetPiece(33)
         this.resetPiece(4)
         this.resetPiece(5)

        axios.post('/api/modules', body).then(res => {
            this.props.history.push('/dashboard')
        })
    }

    onDragStart = (e, length) => {
        e.dataTransfer.setData('length', length)
        this.setState({
            currentPiece: length
        })
    }

    onDragOver = async (e, i) => {
        e.preventDefault()
    }
   
    check = (i) => {
            let rowI = i.toString()
            if(rowI.length === 2) {
                let newerI = rowI.charAt(1)
               return newerI
            } else {
               return i
            }
    }

    setTwoRow = (currentIndex, rowI, i) => {
        let length = 2
        i =  i - currentIndex
        if (currentIndex === 0 && +rowI === 9) {
            return this.resetPiece(2)
        } else if (currentIndex === 1 && +rowI === 0) {
            return this.resetPiece(2)
        } else if (board[i].class !== 'box blank' || board[i + 1].class !== 'box blank') {
            return this.resetPiece(2)
        } else {
            board.splice(i, length, moduleTwo[0], moduleTwo[1])
            moduleTwo[0].m2_position1 = i 
            moduleTwo[1].m2_position2 = i + 1
            this.setState({
                modTwoDisplay: false,
                moduleTwo: moduleTwo
            })
        }       
    }

    setTwoColumn = (currentIndex, i) => {
        // Need to fix math so we can place the currentIndex 1 on the row 10-19
        i = - currentIndex * 10 + i         
        if (currentIndex === 0 && i >= 90) {
            return this.resetPiece(2)
        } else if (currentIndex === 1 && i <= -1) {
            return this.resetPiece(2)
        } else if (board[i].class !== 'box blank' || board[i + 10].class !== 'box blank') {
            return this.resetPiece(2)
        } else {
            board.splice(i, 1, moduleTwo[0])
            board.splice(i + 10, 1, moduleTwo[1])
            moduleTwo[0].m2_position1 = i
            moduleTwo[1].m2_position2 = i + 10
            this.setState({
                modTwoDisplay: false,
                moduleTwo: moduleTwo
            })
        } 
    }

    setThreeRow = (currentIndex, rowI, i) => {
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

    setThreeColumn = (currentIndex, i) => {
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
    }

    setThreeBRow = (currentIndex, rowI, i) => {
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
    }

    setThreeBColumn = (currentIndex, i) => {
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
    }

    setFourRow = (currentIndex, rowI, i) => {
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
    }

    setFourColumn = (currentIndex, i) => {
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
    }

    setFiveRow = (currentIndex, rowI, i) => {
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
    }

    setFiveColumn = (currentIndex, i) => {
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
    }


    onDrop = async (e, i) => {
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
    }

    handleRotate = (str, direction) => {
        if (direction === 'row') {
        this.setState({
            [str]: 'column'
        })} else {
            this.setState({
                [str]: 'row'
            })
        }
    }

    resetPiece = num => {
        let {board, moduleTwo, moduleThree, moduleThreeB, moduleFour, moduleFive} = this.state

        // let newBoard = [...board]

        // make an array of all the positions

        let p21 = moduleTwo[0].m2_position1
        let p22 = moduleTwo[1].m2_position2
        let p31 = moduleThree[0].m3a_position1
        let p32 = moduleThree[1].m3a_position2
        let p33 = moduleThree[2].m3a_position3
        let p31b = moduleThreeB[0].m3b_position1
        let p32b = moduleThreeB[1].m3b_position2
        let p33b = moduleThreeB[2].m3b_position3
        let p41 = moduleFour[0].m4_position1
        let p42 = moduleFour[1].m4_position2
        let p43 = moduleFour[2].m4_position3
        let p44 = moduleFour[3].m4_position4
        let p51 = moduleFive[0].m5_position1
        let p52 = moduleFive[1].m5_position2
        let p53 = moduleFive[2].m5_position3
        let p54 = moduleFive[3].m5_position4
        let p55 = moduleFive[4].m5_position5

        let obj = {
            name: 'board',
            class: 'box blank'
        }

        if (num === 2) {
            board[p21] = obj
            board[p22] = obj
            this.setState({
                board: board,
                modTwoDisplay: true
            })
        } else if (num === 3) {
            board[p31] = obj
            board[p32] = obj
            board[p33] = obj
            this.setState({
                board: board,
                modThreeDisplay: true
            })
        } else if (num === 33) {
            board[p31b] = obj
            board[p32b] = obj
            board[p33b] = obj
            this.setState({
                board: board, 
                modThreeBDisplay: true
            })
        } else if (num === 4) {
            board[p41] = obj
            board[p42] = obj
            board[p43] = obj
            board[p44] = obj
            this.setState({
                board: board,
                modFourDisplay: true
            })
        } else if (num === 5) {
            board[p51] = obj
            board[p52] = obj
            board[p53] = obj
            board[p54] = obj
            board[p55] = obj
            this.setState({
                board: board,
                modFiveDisplay: true
            })
        }
    }

    render() {
        return (
            <div className='add-map'>
                
                <div className='main'>
                
                <div className='module-container'> 
                <div className='top-left-box'>
                    <p>name your new map</p>
                    <div className='input-button-container'>
                        <input className='add-map-input' onChange={this.handleChange}></input>
                        <button className='add-map-button' onClick={this.saveMap}>save</button>
                    </div>
                </div>   
                {this.state.modTwoDisplay &&
                <div className='flex cut-2'  
                    onDragStart={e => this.onDragStart(e, 2)}
                    draggable
                    onClick={() => this.handleRotate('modTwoDirection',this.state.modTwoDirection)}
                    style={{'flexDirection':this.state.modTwoDirection}}
                    >
                        {this.state.moduleTwo.map((piece, i) => {
                            if (piece.name === 'stoplight') {
                                return (
                                    <div
                                        key={i}
                                        onMouseDown={() => this.setState({ currentIndex: i })}>
                                            <Stoplight/>
                                    </div>
                            )  
                            } else if (piece.name === 'threebar') {
                                return (
                                    <div 
                                        key={i}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                         <ThreeBar/>
                                    </div>
                                )
                            } else {
                                return (<></>)
                            }
                        })}
                </div>}

                {this.state.modThreeDisplay &&
                <div className='flex cut-3'  
                    onDragStart={e => this.onDragStart(e, 3)}
                    draggable
                    onClick={() => this.handleRotate('modThreeDirection', this.state.modThreeDirection)}
                    style={{'flexDirection':this.state.modThreeDirection}}
                    >
                        {this.state.moduleThree.map((piece, i) => {
                            if (piece.name === 'sidebar'){
                            return (
                                <div
                                key={i}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <Sidebar/>
                                </div>
                            )} else if (piece.name === 'twominidots'){
                                return (
                                    <div 
                                        key={i}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <TwoMiniDots/>
                                    </div>
                                )} else if (piece.name === 'threebar'){
                                return (
                                    <div 
                                        key={i}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <ThreeBar/>
                                    </div>
                                )
                            } else {
                               return (<></>) 
                            }
                        })} 
                </div>}

                {this.state.modThreeBDisplay &&
                <div className='flex cut-3b'  
                    onDragStart={e => this.onDragStart(e, 33)}
                    draggable
                    onClick={() => this.handleRotate('modThreeBDirection', this.state.modThreeBDirection)}
                    style={{'flexDirection':this.state.modThreeBDirection}}
                    >
                        {this.state.moduleThreeB.map((piece, i) => {
                            if (piece.name === 'manydots'){
                            return (
                                <div
                                key={i}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <ManyDots/>
                                </div>
                            )} else if (piece.name === 'stoplight'){
                                return (
                                    <div 
                                        key={i}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <Stoplight/>
                                    </div>
                                )} else if (piece.name === 'sidebar'){
                                    return (
                                        <div 
                                            key={i}
                                            onMouseDown={() => this.setState({currentIndex: i})}>
                                                <Sidebar/>
                                        </div>
                                    )} else {
                               return (<></>) 
                            }
                        })} 
                </div>}

                {this.state.modFourDisplay &&
                <div className='flex cut-4'  
                    onDragStart={e => this.onDragStart(e, 4)}
                    draggable
                    onClick={() => this.handleRotate('modFourDirection', this.state.modFourDirection)}
                    style={{'flexDirection':this.state.modFourDirection}}
                    >
                        {this.state.moduleFour.map((piece, i) => {
                            if (piece.name === 'manydots'){
                            return (
                                <div
                                key={i}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <ManyDots/>
                                </div>
                            )} else if (piece.name === 'manydots'){
                                return (
                                    <div 
                                        key={i}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <ManyDots/>
                                    </div>
                                )} else if (piece.name === 'manydots'){
                                    return (
                                        <div 
                                            key={i}
                                            onMouseDown={() => this.setState({currentIndex: i})}>
                                                <ManyDots/>
                                        </div>
                                    )} else if (piece.name === 'manydots'){
                                        return (
                                            <div 
                                                key={i}
                                                onMouseDown={() => this.setState({currentIndex: i})}>
                                                    <ManyDots/>
                                            </div>
                                        )} else {
                               return (<></>) 
                            }
                        })}
                </div>}

                {this.state.modFiveDisplay &&
                <div className='flex cut-5'  
                    onDragStart={e => this.onDragStart(e, 5)}
                    draggable
                    onClick={() => this.handleRotate('modFiveDirection', this.state.modFiveDirection)}
                    style={{'flexDirection':this.state.modFiveDirection}}
                    >
                        {this.state.moduleFive.map((piece, i) => {
                            if (piece.name === 'twominidots'){
                            return (
                                <div
                                key={i}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <TwoMiniDots/>
                                </div>
                            )} else if (piece.name === 'sidebar'){
                                return (
                                    <div 
                                        key={i}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <Sidebar/>
                                    </div>
                                )} else if (piece.name === 'threebar'){
                                    return (
                                        <div 
                                            key={i}
                                            onMouseDown={() => this.setState({currentIndex: i})}>
                                                <ThreeBar/>
                                        </div>
                                    )} else if (piece.name === 'manydots'){
                                        return (
                                            <div 
                                                key={i}
                                                onMouseDown={() => this.setState({currentIndex: i})}>
                                                    <ManyDots/>
                                            </div>
                                        )} else if (piece.name === 'stoplight'){
                                            return (
                                                <div 
                                                    key={i}
                                                    onMouseDown={() => this.setState({currentIndex: i})}>
                                                        <Stoplight/>
                                                </div>
                                            )} else {
                               return (<></>) 
                            }
                        })} 
                </div>}
                </div>
                </div>

                <div className='board'>
                    {this.state.board.map((space, i) => {
                        if (space.name === 'stoplight') {
                            return (
                            <div 
                            key={i}
                            onClick={() => this.resetPiece(space.number)}>
                                <Stoplight/>
                            </div>
                        )} else if (space.name === 'threebar') {
                            return (
                                <div 
                                key={i} 
                                onClick={() => this.resetPiece(space.number)}>
                                    <ThreeBar/>
                            </div> 
                        )} else if (space.name === 'twominidots') {
                            return (
                                <div 
                                key={i} 
                                onClick={() => this.resetPiece(space.number)}>
                                    <TwoMiniDots/>
                            </div> 
                        )} else if (space.name === 'manydots') {
                            return (
                                <div 
                                key={i} 
                                onClick={() => this.resetPiece(space.number)}>
                                    <ManyDots/>
                            </div> 
                        )} else if (space.name === 'sidebar') {
                            return (
                                <div 
                                key={i} 
                                onClick={() => this.resetPiece(space.number)}>
                                    <Sidebar/>
                            </div> )
                        } else {
                            return (
                                <div 
                                key={i} 
                                className={space.class}
                                onDragOver={e => this.onDragOver(e, i)}
                                onDrop={e => this.onDrop(e, i)}
                                />
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state in ADD MAP', state)
    return {
        id: state.map.id
    }
}

export default connect(mapStateToProps)(AddMap)