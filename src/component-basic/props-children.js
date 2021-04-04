import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

class Child extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

class Parent extends Component {
    render() {
        return (
            <React.Fragment>
                <Child>Hello</Child>
                <hr />
                <Child>
                    <h1>Title</h1>
                    <div>React</div>
                    <ol>
                        <li>item 1</li>
                        <li>item 2</li>
                    </ol>
                    <Child>Inner Child</Child>
                </Child>
            </React.Fragment>
        )
    }
}
ReactDOM.render(<Parent />, document.getElementById("root"))

