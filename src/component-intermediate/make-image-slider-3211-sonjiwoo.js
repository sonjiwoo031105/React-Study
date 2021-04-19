import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class imagesItem extends Component {
    render() {
        const { onPrev, onNext } = this.props
        const { id } = this.props.item

        return (
            <div>
                <img src={id}  />
                <span>id : {this.state.images[{id}]}</span><br />
                <button onClick={
                    () => {
                        onPrev(id)
                    }
                }>prev</button>&nbsp;
                <button onClick={
                    () => {
                        onNext(id, { id: id})
                    }
                }>next</button>
            </div>
        );
    }
}

class ImageSlider extends Component {
    constructor(props) {
        super(props)

        // 기능 구현에 필요한 값을 state에 추가 가능
        this.state = {
            images : [
                'https://via.placeholder.com/100x100?text=Image+1',
                'https://via.placeholder.com/100x100?text=Image+2',
                'https://via.placeholder.com/100x100?text=Image+3',
                'https://via.placeholder.com/100x100?text=Image+4'
            ]
        }
    }

    handlePrev = () => {
        this.setState((state) => ({

        }))
    }

    handleNext = (id) => {
        this.setState((state) => ({
            images: state.images[state.images+1]
        }))
    }


    render() {
        return (
            <div>
                {
                    this.state.images.map(item => {
                        return
                            <imagesItem
                                onPrev={this.handlePrev}
                                onNext={this.handleNext}/>
                    })
                }

            </div>
        )
    }
}

ReactDOM.render(<ImageSlider />, document.getElementById("root"))