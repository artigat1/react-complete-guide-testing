import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

var todoItems = [];
todoItems.push({ index: 1, value: 'learn react', done: false });
todoItems.push({ index: 2, value: 'Go shopping', done: true });
todoItems.push({ index: 3, value: 'buy flowers', done: true });

ReactDOM.render(<App initItems={todoItems} />, document.getElementById('root'));
