import React, {  useState, useEffect } from 'react'
import {board1} from '../Gameboard/board'
import axios from 'axios'


const MapDisplay = (props) => {
  const [boardDisplay, setBoardDisplay] = useState([])

  let initialBoard = board1.map( space => ({...space}))

  
  useEffect( async() => {
    await axios.get(`/api/maps/${props.mapId}`).then(res => {
      const positions = res.data
      let mapBoard = initialBoard.map((space, i) => {
        for (let key in positions) {
          if (key.charAt(10) && positions[key] === i) {
            space.name = key
          }
        }
        return space
      })
      setBoardDisplay(mapBoard)
    })
  }, [])
  console.log(props.mapId)

  // const displayMapFalse = () => {
  //   return (
  //     props.displayMapShowFalse
  //   )
  // }
  
  return (
    <div>
    {boardDisplay.map((space, i) => {
      return (
        <div
        key = {i}>
          {space.comp}
        </div>
      )
    })}
    <div>
      <button onClick={props.displayMapShowFalse}> X </button>
    </div>
    </div>
  )
}
export default MapDisplay