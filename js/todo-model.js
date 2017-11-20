import { generateId } from './utils';

export default class ToDoModel {

  constructor() {
  }

  init(data) {
    this.data = data;
  }

  addTask(pTitle) {
    const id = generateId();

    this.data[id] = {
      title: pTitle,
      complete: false,
      time: Date.now()
    };

    localStorage.setItem('ToDoApp', JSON.stringify(this.data));
    return id;
  }

  getTask(id) {
    return this.data[id];
  }

  editTask(id, title) {
    this.data[id].title = title;
  }

  deleteTask(id) {
    delete this.data[id];
    localStorage.setItem('ToDoApp', JSON.stringify(this.data));
  }

  updateCompleteTask(id, complete) {
    this.data[id].complete = complete;
    localStorage.setItem('ToDoApp', JSON.stringify(this.data));
  }

}
