import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class TodoItem extends Component {
    render() {
        const { completed, text } = this.props.todo

        return (
            <div>
                <div>
                    <span
                        style={completed ? { textDecoration: 'line-through' } : null}
                        onClick={() => this.props.handleTodoStatusToggle(this.props.idx)}>
                        {text}
                    </span> &nbsp;
                    <button onClick={() => this.props.handleTodoRemove(this.props.idx)}>X</button>
                </div>
            </div>
        )
    }
}

class TodoList extends Component {
    render() {
        return (
            <ol>
                {
                    this.props.todos.map((todo, idx) => {
                        return (
                            <li key={idx}>
                                <TodoItem
                                    idx={idx}
                                    todo={todo}
                                    handleTodoStatusToggle={this.props.handleTodoStatusToggle}
                                    handleTodoRemove={this.props.handleTodoRemove}/>
                            </li>
                        )
                    })
                }
            </ol>
        )
    }
}

class TodoAdder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: ''
        }
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value })
    }

    render() {
        return (
            <div>
                <input type='text' onChange={this.handleChange} value={this.state.input} />
                <button onClick={() => {
                    this.props.handleTodoAdd({ completed: false, text: this.state.input })
                    this.setState({ input: '' })
                }}>Add</button>
            </div>
        )
    }
}

//상태는 결국 TodoApp에 있다. 상태는 최상위 컴포넌트에 위치해있다.
class TodoApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [
                { completed: false, text: '리액트 공부하기' },
                { completed: true, text: 'ES6 문법 공부하기' },
            ]
        }
    }

    handleTodoAdd = (newTodo) => {
        this.setState((state) => ({
            todos: state.todos.concat(newTodo)
        }))
    }

    handleTodoStatusToggle = (todoIndex) => {
        this.setState((state) => ({
            todos: state.todos.map((todo, idx) => {
                if(idx === todoIndex) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        }))
    }
    handleTodoRemove = (todoIndex) => {
        this.setState((state) => ({
            // _ :변수이름으로 사용 가능. 난 이 변수에는 관심이 없다.
            todos: state.todos.filter((_, idx) => {
                return idx !== todoIndex
            })
        }))
    }
    render() {
        return (
            <div>
                {/*ToDoList TodoAdder 둘다 투두리스트 배열에 관심을 갖고있기때문에 공통조상에다가 올려버림*/}
                {/*state올리기*/}
                <TodoList
                    //todos는 리스트 이야기하는거입니다. 그럼 그 상태 원래 얘가 갖고있어야하는거아냐??
                    todos={this.state.todos}
                    handleTodoStatusToggle={this.handleTodoStatusToggle}
                    handleTodoRemove={this.handleTodoRemove}/>
                <TodoAdder handleTodoAdd={this.handleTodoAdd} />
            </div>
        );
    }
}
const rootElement = document.getElementById("root")
ReactDOM.render(<TodoApp />, rootElement)