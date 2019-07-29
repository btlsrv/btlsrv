import React from 'react'
import './TwoMiniDots.scss'

const TwoMiniDots = () => {
  return (
    <div className="module twominidots">
      <div className="background">
          <div className="dotsHolder">
            <div className="grayLights"></div>
            <div className="yellowLight"></div>
            <div className="grayLights"></div>
            <div className="grayLights"></div>
            <div className="greenLight"></div>
            <div className="grayLights"></div>
          </div>
          <div className="threeBlueSquares">
            <div className="three"></div>
            <div className="three"></div>
            <div className="three"></div>
          </div>
      </div>
    </div>
  )
}

export default TwoMiniDots