import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// npm install uuid
import { v4 } from 'uuid' //유니크한 값을 만들어준다. primary key같은 역할

//ListItem 은 수동적인, 상태를 가진애가 모든 것을 하는거지 전달받은 거 호출받기만 하는 역할
class ListItem extends Component {
    render() {
        // 부모 컴포넌트로부터 전달받은 상태 변화 메소드 저장
        //객체 비구조 할당 => 코드가 간결해진다.
        //render 함수=> 화면에 표시해주는거 jsx
        const { onRemove, onUpdate } = this.props
        const { id, value } = this.props.item

        return (
            <div style={{ border: '1px solid black', margin: '20px', padding: '20px' }}>
                <span>id : {id}</span><br />
                <span>value : {value}</span><br />
                {/* 화살표 함수를 전달하여, 부모로 부터 전달받은 상태 변화 메소드(onRemove) 호출 */}
                <button onClick={
                    () => {
                        // 필요한 인자값(삭제할 id) 전달
                        onRemove(id)
                    }
                }>remove</button>&nbsp;
                <button onClick={
                    () => {
                        // 필요한 인자값(추가할 객체) 전달
                        onUpdate(id, { id: id, value: value + 1 })
                        //onUpdate(id,{...id,value:value+1}) 이렇게 해도된다.
                    }
                }>update</button>
            </div>
        );
    }
}

class ListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = { lst: [] }
    }

    handleCreateItem = () => {
        // create (concat)
        //concat으로 객체를 새로 만들어서 리스트 교체
        this.setState((state) => ({
            // 새 항목을 추가한 "새로운 참조를 가진" 리스트로 교체
            lst: state.lst.concat({ id: v4(), value: 0 })
        }))

    }

    handleRemoveItem = (uuid) => {
        // remove (filter)
        this.setState((state) => ({
            lst: state.lst.filter((item) => {
                // id가 일치할 경우 false 리턴하여 리스트에서 제외
                return item.id !== uuid
            })
        }))
    }

    //updated는 내가 수정하고 싶은 객체 자체
    handleUpdateItem = (uuid, updated) => {
        // update (map)
        this.setState((state) => ({
            lst: state.lst.map((item) => {
                // id가 일치할 경우
                if(item.id === uuid) {
                    // 수정된 객체를 반환
                    return updated
                } else {
                    return item
                }
            })
        }))
    }

    render() {
        return (
            <div>
                <button onClick={this.handleCreateItem}>add</button>
                <ul>
                    {
                        this.state.lst.map(item => {
                            // uuid => 데이터베이스에서 참조할 pk라고 가정
                            return <li key={item.id}>
                                <ListItem
                                    item={item}
                                    //props값으로 넘겨줄 수 있는 값의 제한이 없으니까 함수로 준다.
                                    onRemove={this.handleRemoveItem}
                                    onUpdate={this.handleUpdateItem}/>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<ListComponent />, document.getElementById("root"))