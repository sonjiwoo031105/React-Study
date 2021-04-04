import ReactDOM from 'react-dom'

//화살표 함수로 컴포넌트 정의(props 값은 함수의 파라미터로 전달)
const Greeting = (props) => <h1>Hello, {props.name}</h1>

const Smile = (props) => <span style={{fontSize: (props.size || 16) + 'px'}}>😃</span>

// 함수 선언식으로 함수 컴포넌트 정의
function FuncComponent(props) {
    return (
        <div>
            {/* 일반적인 컴포넌트와 똑같이 사용 가능 */}
            <Greeting name="John" />
            <Smile size={100} />
            <Smile  />
        </div>
    )
}

ReactDOM.render(<FuncComponent />, document.getElementById("root"))