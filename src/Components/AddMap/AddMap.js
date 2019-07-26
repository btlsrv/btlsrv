import React, { Component } from 'react'
import board from './Board'
import moduleTwo from '../Modules/ModuleTwo/ModuleTwo'
import moduleThree from '../Modules/ModuleThree/ModuleThree'
import moduleThreeB from '../Modules/ModuleThreeB/ModuleThreeB'
import moduleFour from '../Modules/ModuleFour/ModuleFour'
import moduleFive from '../Modules/ModuleFive/ModuleFive'
import  '../Modules/Styles/Styles.scss'
import Stoplight from '../Modules/Stoplight/Stoplight'
import ThreeBar from '../Modules/ThreeBar/ThreeBar'

export default class MyTest extends Component {
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
            alertMessage: false
        }
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
            moduleTwo[0].position = i 
            moduleTwo[1].position = i + 1
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
        } else if (currentIndex === 1 && i <= 9) {
            return this.resetPiece(2)
        } else if (board[i].class !== 'box blank' || board[i + 10].class !== 'box blank') {
            return this.resetPiece(2)
        } else {
            board.splice(i, 1, moduleTwo[0])
            board.splice(i + 10, 1, moduleTwo[1])
            moduleTwo[0].position = i
            moduleTwo[1].position = i + 10
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
            moduleThree[0].position = i
            moduleThree[1].position = i + 1
            moduleThree[2].position = i + 2
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
        } else if ( currentIndex === 1 && i <= 9) {
            return this.resetPiece(3)
        } else if ( currentIndex === 1 && i >= 90) {
            return this.resetPiece(3)
        } else if ( currentIndex === 2 && i <= 19) {
            return this.resetPiece(3)
        }  else if (board[i].class !== 'box blank' || 
                    board[i + 10].class !== 'box blank' || 
                    board[i + 20].class !== 'box blank') {
            return this.resetPiece(3)            
        } else {
            board.splice(i, 1, moduleThree[0])
            board.splice(i + 10, 1, moduleThree[1])
            board.splice(i + 20, 1, moduleThree[2])
            moduleThree[0].position = i
            moduleThree[1].position = i + 10
            moduleThree[2].position = i + 20
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
            moduleThreeB[0].position = i
            moduleThreeB[1].position = i + 1
            moduleThreeB[2].position = i + 2
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
        } else if ( currentIndex === 1 && i <= 9) {
            return this.resetPiece(33)
        } else if ( currentIndex === 1 && i >= 90) {
            return this.resetPiece(33)
        } else if ( currentIndex === 2 && i <= 19) {
            return this.resetPiece(33)
        }  else if (board[i].class !== 'box blank' || 
                    board[i + 10].class !== 'box blank' || 
                    board[i + 20].class !== 'box blank') {
            return this.resetPiece(33)            
        } else {
            board.splice(i, 1, moduleThreeB[0])
            board.splice(i + 10, 1, moduleThreeB[1])
            board.splice(i + 20, 1, moduleThreeB[2])
            moduleThreeB[0].position = i
            moduleThreeB[1].position = i + 10
            moduleThreeB[2].position = i + 20
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
            moduleFour[0].position = i
            moduleFour[1].position = i + 1
            moduleFour[2].position = i + 2
            moduleFour[3].position = i + 3
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
        } else if ( currentIndex === 1 && i <= 9) {
            return this.resetPiece(4)
        } else if ( currentIndex === 1 && i >= 80) {
            return this.resetPiece(4)
        } else if ( currentIndex === 2 && i <= 19) {
            return this.resetPiece(4)
        } else if ( currentIndex === 2 && i >= 90) {
            return this.resetPiece(4)
        } else if ( currentIndex === 3 && i <= 29) {
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
            moduleFour[0].position = i
            moduleFour[1].position = i + 10
            moduleFour[2].position = i + 20
            moduleFour[3].position = i + 30
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
            moduleFive[0].position = i
            moduleFive[1].position = i + 1
            moduleFive[2].position = i + 2
            moduleFive[3].position = i + 3
            moduleFive[4].position = i + 4
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
        } else if ( currentIndex === 1 && i <= 9) {
            return this.resetPiece(5)
        } else if ( currentIndex === 1 && i >= 70) {
            return this.resetPiece(5)
        } else if ( currentIndex === 2 && i <= 19) {
            return this.resetPiece(5)
        } else if ( currentIndex === 2 && i >= 80) {
            return this.resetPiece(5)
        } else if ( currentIndex === 3 && i <= 29) {
            return this.resetPiece(5)
        } else if ( currentIndex === 3 && i >= 90) {
            return this.resetPiece(5)
        } else if ( currentIndex === 4 && i <= 39) {
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
            moduleFive[0].position = i
            moduleFive[1].position = i + 10
            moduleFive[2].position = i + 20
            moduleFive[3].position = i + 30
            moduleFive[4].position = i + 40
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

        let p21 = moduleTwo[0].position
        let p22 = moduleTwo[1].position
        let p31 = moduleThree[0].position
        let p32 = moduleThree[1].position
        let p33 = moduleThree[2].position
        let p31b = moduleThreeB[0].position
        let p32b = moduleThreeB[1].position
        let p33b = moduleThreeB[2].position
        let p41 = moduleFour[0].position
        let p42 = moduleFour[1].position
        let p43 = moduleFour[2].position
        let p44 = moduleFour[3].position
        let p51 = moduleFive[0].position
        let p52 = moduleFive[1].position
        let p53 = moduleFive[2].position
        let p54 = moduleFive[3].position
        let p55 = moduleFive[4].position

        let obj = {
            name: 'board',
            class: 'box blank'
        }

        if (num === 2) {
            board[p21] = obj
            board[p22] = obj
            moduleTwo = moduleTwo.map(piece => {
                piece.position = null
                return piece
            })
            this.setState({
                board: board,
                moduleTwo, 
                modTwoDisplay: true
            })
        } else if (num === 3) {
            board[p31] = obj
            board[p32] = obj
            board[p33] = obj
            moduleThree = moduleThree.map(piece => {
                piece.position = null
                return piece
            })
            this.setState({
                board: board,
                moduleThree, 
                modThreeDisplay: true
            })
        } else if (num === 33) {
            board[p31b] = obj
            board[p32b] = obj
            board[p33b] = obj
            moduleThreeB = moduleThreeB.map(piece => {
                piece.position = null
                return piece
            })
            this.setState({
                board: board,
                moduleThreeB, 
                modThreeBDisplay: true
            })
        } else if (num === 4) {
            board[p41] = obj
            board[p42] = obj
            board[p43] = obj
            board[p44] = obj
            moduleFour = moduleFour.map(piece => {
                piece.position = null
                return piece
            })
            this.setState({
                board: board,
                moduleFour, 
                modFourDisplay: true
            })
        } else if (num === 5) {
            board[p51] = obj
            board[p52] = obj
            board[p53] = obj
            board[p54] = obj
            board[p55] = obj
            moduleFive = moduleFive.map(piece => {
                piece.position = null
                return piece
            })
            this.setState({
                board: board,
                moduleFive, 
                modFiveDisplay: true
            })
        }
    }

    render() {
        return (
            <div className='main'>

                {this.state.alertMessage && <p className='alert'>choose another spot</p>}

                <div className='mod-2'>    
                {this.state.modTwoDisplay &&
                <div className='flex'  
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
                                        className={piece.class}
                                        onMouseDown={() => this.setState({ currentIndex: i })}>
                                            <Stoplight/>
                                    </div>
                            )  
                            } else if (piece.name === 'threebar') {
                                return (
                                    <div 
                                        key={i}
                                        className={piece.class}
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
                <div className='flex'  
                    onDragStart={e => this.onDragStart(e, 3)}
                    draggable
                    onClick={() => this.handleRotate('modThreeDirection', this.state.modThreeDirection)}
                    style={{'flexDirection':this.state.modThreeDirection}}
                    >
                        {this.state.moduleThree.map((piece, i) => {
                            if (piece.name === 'stoplight'){
                            return (
                                <div
                                key={i}
                                className={piece.class}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <Stoplight/>
                                </div>
                            )} else if (piece.name === 'threebar'){
                                return (
                                    <div 
                                        key={i}
                                        className={piece.class}
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
                <div className='flex'  
                    onDragStart={e => this.onDragStart(e, 33)}
                    draggable
                    onClick={() => this.handleRotate('modThreeBDirection', this.state.modThreeBDirection)}
                    style={{'flexDirection':this.state.modThreeBDirection}}
                    >
                        {this.state.moduleThreeB.map((piece, i) => {
                            if (piece.name === 'stoplight'){
                            return (
                                <div
                                key={i}
                                className={piece.class}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <Stoplight/>
                                </div>
                            )} else if (piece.name === 'threebar'){
                                return (
                                    <div 
                                        key={i}
                                        className={piece.class}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <ThreeBar/>
                                    </div>
                                )
                            } else {
                               return (<></>) 
                            }
                        })} 
                </div>}

                {this.state.modFourDisplay &&
                <div className='flex'  
                    onDragStart={e => this.onDragStart(e, 4)}
                    draggable
                    onClick={() => this.handleRotate('modFourDirection', this.state.modFourDirection)}
                    style={{'flexDirection':this.state.modFourDirection}}
                    >
                        {this.state.moduleFour.map((piece, i) => {
                            if (piece.name === 'stoplight'){
                            return (
                                <div
                                key={i}
                                className={piece.class}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <Stoplight/>
                                </div>
                            )} else if (piece.name === 'threebar'){
                                return (
                                    <div 
                                        key={i}
                                        className={piece.class}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <ThreeBar/>
                                    </div>
                                )
                            } else {
                               return (<></>) 
                            }
                        })}
                </div>}

                {this.state.modFiveDisplay &&
                <div className='flex'  
                    onDragStart={e => this.onDragStart(e, 5)}
                    draggable
                    onClick={() => this.handleRotate('modFiveDirection', this.state.modFiveDirection)}
                    style={{'flexDirection':this.state.modFiveDirection}}
                    >
                        {this.state.moduleFive.map((piece, i) => {
                            if (piece.name === 'stoplight'){
                            return (
                                <div
                                key={i}
                                className={piece.class}
                                onMouseDown={() => this.setState({currentIndex: i})}>
                                    <Stoplight/>
                                </div>
                            )} else if (piece.name === 'threebar'){
                                return (
                                    <div 
                                        key={i}
                                        className={piece.class}
                                        onMouseDown={() => this.setState({currentIndex: i})}>
                                            <ThreeBar/>
                                    </div>
                                )
                            } else {
                               return (<></>) 
                            }
                        })} 
                </div>}
                </div>

                <div className='board'>
                    {this.state.board.map((space, i) => {
                        if (space.name === 'stoplight') {
                            return (
                            <div 
                            key={i} 
                            className={space.class}
                            onClick={() => this.resetPiece(space.number)}>
                                <Stoplight/>
                            </div>
                        )} if (space.name === 'threebar') {
                            return (
                                <div 
                                key={i} 
                                className={space.class}
                                onClick={() => this.resetPiece(space.number)}>
                                    <ThreeBar/>
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