import React, { Component } from 'react';

import './App.css';
import TodoHeader from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/Form/Form';

class App extends Component {
    state = {
        todoItems: this.props.initItems
    };

    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
    }

    addItem(todoItem) {
        const items = this.state.todoItems;
        items.unshift({
            index: this.state.todoItems.length + 1,
            value: todoItem.newItemValue,
            done: false
        });
        this.setState({ todoItems: items });
    }

    removeItem(itemIndex) {
        const items = this.state.todoItems;
        items.splice(itemIndex, 1);
        this.setState({ todoItems: items });
    }

    markTodoDone(itemIndex) {
        const items = this.state.todoItems;
        const todo = { ...items[itemIndex] };
        items.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? items.push(todo) : items.unshift(todo);
        this.setState({ todoItems: items });
    }

    render() {
        return (
            <div id="main">
                <TodoHeader />
                <TodoForm addItem={this.addItem} />
                <TodoList
                    items={this.state.todoItems}
                    removeItem={this.removeItem}
                    markTodoDone={this.markTodoDone}
                />
            </div>
        );
    }
}

export default App;
