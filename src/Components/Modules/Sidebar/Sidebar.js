import React from 'react'
import './Sidebar.scss'

const Sidebar = () => {
  return (
    <div className="module sidebar">
      <div className="backBox">
          <div className="longBar"></div>
      </div>
      <div className="dotAndSquare">
        <div className="threePinkSquares">
            <div className="threeSquares"></div>
            <div className="threeSquares middle"></div>
            <div className="threeSquares"></div>
        </div>
        <div className="theDots">
            <div className="grayDots"></div>
            <div className="greenDot"></div>
            <div className="grayDots"></div>
            <div className="grayDots"></div>
            <div className="grayDots"></div>
        </div>
          <div className="fourSquares">
              <div className="blueSquare"></div>
              <div className="blueSquare"></div>
              <div className="blueSquare"></div>
              <div className="blueSquare"></div>
          </div>
      </div>
    </div>
  )
}

export default Sidebar
