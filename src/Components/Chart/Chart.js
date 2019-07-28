import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducers/user'
import Chart from 'chart.js'

Chart.defaults.global.defaultFontFamily = "'Bungee', cursive"


class StatsChart extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            victories: null,
            defeats: null
        }
    }
    
    chartRef = React.createRef()

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d')

        const victories = this.props.user.victories
        const defeats = this.props.user.defeats
        this.setState({
            victories, 
            defeats
        })

        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [victories, defeats],
                        backgroundColor: ['#1FF1E5', '#2B85F8']
                    }
                ],
                labels: ['victories', 'defeats'],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
    
        })
    }

    render() {
        return (
            <div>
                <canvas id='myChart' ref={this.chartRef} style={{'display': 'inline', 'height': 135}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUser})(StatsChart)