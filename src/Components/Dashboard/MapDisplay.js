import React, { Component } from 'react'
import './MapDisplay.scss'
import board from '../Gameboard/board'
import Stoplight from '../Modules/Stoplight/Stoplight'
import Threebar from '../Modules/ThreeBar/ThreeBar'
import Sidebar from '../Modules/Sidebar/Sidebar'
import TwoMiniDots from '../Modules/TwoMiniDots/TwoMiniDots'
import ManyDots from '../Modules/ManyDots/ManyDots'
import axios from 'axios'


class MapDisplay extends Component {
  constructor(props) {
    super(props)

    this.state= {
      board: []
    }
  }

  componentDidMount() {
    let initialBoard = board.map( space => ({...space}))
    axios.get(`/api/maps/${this.props.mapId}`).then(res => {
      const positions = res.data
      let mapBoard = initialBoard.map((space, i) => {
        for (let key in positions) {
          if (key.charAt(10) && positions[key] === i) {
            space.name = key
          }
        }
        return space
      })
      let newBoard = mapBoard.map((space, i) => {
      let { name } = space
      if (name === 'm2_position1') {
          space.comp = <Stoplight/>
      } else if (name === 'm2_position2') {
          space.comp = <Threebar/>
      }  else if (name === 'm3a_position1') {
          space.comp = <Sidebar/>
      }  else if (name === 'm3a_position2') {
          space.comp = <TwoMiniDots/>
      }  else if (name === 'm3a_position3') {
          space.comp = <Threebar/>
      }  else if (name === 'm3b_position1') {
          space.comp = <ManyDots/>
      }  else if (name === 'm3b_position2') {
          space.comp = <Stoplight/>
      }  else if (name === 'm3b_position3') {
          space.comp = <Sidebar/>
      }  else if (name === 'm4_position1') {
          space.comp = <ManyDots/>
      }  else if (name === 'm4_position2') {
          space.comp = <ManyDots/>
      }  else if (name === 'm4_position3') {
          space.comp = <ManyDots/>
      }  else if (name === 'm4_position4') {
          space.comp = <ManyDots/>
      }  else if (name === 'm5_position1') {
          space.comp = <TwoMiniDots/>
      }  else if (name === 'm5_position2') {
          space.comp = <Sidebar/>
      }  else if (name === 'm5_position3') {
          space.comp = <Threebar/>
      }  else if (name === 'm5_position4') {
          space.comp = <ManyDots/>
      }  else if (name === 'm5_position5') {
          space.comp = <Stoplight/>
      } 
      })
      this.setState({
        board: initialBoard
      })
    })
  }

  render() {
    return (
      <div className='map-display-main'>
      <div className='map-display-board'>
        {this.state.board.length > 0 && 
          this.state.board.map((space, i) => {
            console.log(777777, space)
            return (
              <div key={i}
              className='board-space'>
                {space.comp}
              </div>
            )
          })
        }
        <button onClick={this.props.displayMapShowFalse}> X </button>
      </div>
      </div>
    )
  }
}

export default MapDisplay