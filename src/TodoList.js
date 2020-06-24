import React, { Component, Fragment } from 'react';
import TododItem from './TododItem.js'

class TodoList extends Component {
  // ES6的写法 constructor, 组件被创建时该方法会被自动执行
  constructor(props) {
    super(props)  // 初始化
    this.state = {
      list: [],
      inputValue: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }
  handleBtnClick() {
    // 调用react提供给我们的方法setState来改变state内设的数据
    this.setState({
      // ...也是ES6语法, 展开运算符
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
  handleInputChange(e) {
    // 该方法会接收一个event事件对象
    this.setState({
      inputValue: e.target.value
    })
  }
  handleDelete(index) {
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({ list })  // ES6写法, key和value一致的情况下可省写
  }
  getTodoItems() {
    return (
      this.state.list.map((item, index) => {
        // 父组件通过属性的方式向子组件传递参数
        // 子组件通过props接受父组件传递过来的参数
        return (
          <TododItem
            content={item}
            index={index}
            delete={this.handleDelete}
            key={index}
          />
        )
      })
    )
  }
  render() {
    return (
      // 无论时vue还是react根都只能是一个大区块,而react可以使用Fragment在渲染时忽略最外层自身的大区块
      <Fragment>
        <div>
          {/* input输入框的值只要变化就会触发onChange */}
          {/* 只要inputValue发生变化,input输入框的值就会发生变化 */}
          <input value={this.state.inputValue} onChange={this.handleInputChange} />
          {/* onClick 大写的C 不是原生的点击事件 */}
          {/* 这里最终重构优化了代码,把bind操作放在了construct里,react这么写性能会有较大提升 */}
          {/* 第一个this指向该组件本身，于是可以使用handleBtnClick方法 */}
          {/* 如果不使用bind改变handleBtnClick的this指向,那么handleBtnClick内部的this将会指向button自身 */}
          {/* CSS行内样式: 第一个花括号表示是JS表达式,第二个花括号表示是一个对象 */}
          {/* CSSClass样式: 由于class是ES类语法关键字,所以在使用类名时react使用className */}
          <button className='add-btn' onClick={this.handleBtnClick} style={{ color: 'black' }}>add</button>
        </div>
        <ul>
          {this.getTodoItems()}
        </ul>
      </Fragment>
    );
  }
}

export default TodoList;
