'use strict'

import ToDoApp from './todo-app';

const tasks = {
    '_i9qx8tbdc': {
        title: 'Задача 1',
        complete: false
    },

    '_i9qx8tb': {
        title: 'Задача 2',
        complete: true
    },

    '_i9qx8t': {
        title: 'Задача 3',
        complete: false
    }
};

const toDoApp = new ToDoApp();
toDoApp.init(tasks);

