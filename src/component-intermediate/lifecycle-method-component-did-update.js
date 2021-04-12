import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Container extends Component {
    constructor(props) {
        super(props)

        this.state = { showColorBox: true }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState(state => ({ showColorBox: !state.showColorBox }))}>toggle color box</button>
                { this.state.showColorBox ? <RandomColorBoxWithTimer time={5} /> : null }
            </div>
        )
    }
}

class RandomColorBoxWithTimer extends Component {
    generateRandomColor = () => "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)})

    showNewColor = () => {
        this.setState({ color: this.generateRandomColor() })
    }

    resetTimerWithNewColor = () => {
        clearInterval(this.state.intervalId)
        this.state.intervalId = setInterval(() => {
            console.log('from setInterval')

            this.setState(state => {
                return { time: state.time - 1 }
            })
        }, 1000)

        this.showNewColor()
        this.setState(state => {
            return { time: this.props.time }
        })
    }

    resetTimerWithSaveColor = () => {
        clearInterval(this.state.intervalId)
        this.state.intervalId = setInterval(() => {
            console.log('from setInterval')

            this.setState(state => {
                return { time: state.time - 1 }
            })
        }, 1000)

        this.showNewColor()
        this.setState(state => {
            return { time: this.props.time }
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            color: this.generateRandomColor(),
            time: this.props.time,
            intervalId: null
        }
    }

    componentDidMount() {
        console.log('componentDidMount')

        this.state.intervalId = setInterval(() => {
            console.log('from setInterval')

            this.setState(state => {
                return { time: state.time - 1 }
            })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')

        // 지금 props, state 정보가 필요한 경우 this.props, this.state 값 접근
        if(this.state.time === 0) {
            this.resetTimerWithNewColor()
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')

        clearTimeout(this.state.intervalId)
    }

    render() {
        console.log("render")
        return (
            <div>
                <p>남은 시간 : {this.state.time}</p>
                <p>색상 : {this.state.color}</p>
                <div style={{ width: '100px', height: '100px', background: `${this.state.color}` }}>
                </div>
                <button onClick={ this.resetTimerWithNewColor }>next color</button>
                <button onClick={()=> this.resetTimerWithSaveColor }>save color</button>
            </div>
        )
    }
}
ReactDOM.render(<Container />, document.getElementById("root"))