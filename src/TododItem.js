import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    // 子组件可以直接使用父组件啊传递的方法
    handleDelete() {
        this.props.delete(this.props.index);
    }
    render() {
        const { content } = this.props  // ES6解构赋值
        return (
            <div onClick={this.handleDelete}>{content}</div>
        )
    }
}

export default TodoItem