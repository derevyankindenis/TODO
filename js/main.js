'use strict'

import ToDoApp from './todo-app';

const data = JSON.parse(localStorage.getItem('ToDoApp'));
const toDoApp = new ToDoApp();
toDoApp.init(data || {});

// const str = 'Задача 1';
// console.log(str.localeCompare('1'));
