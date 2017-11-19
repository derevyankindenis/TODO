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
      complete: false
    };

    // localStorage.setItem('ToDoApp', JSON.parse);
    return id;
  }

  getTask(id) {
    return this.data[id];
  }

  deleteTask(id) {
    delete this.data[id];
  }

  updateCompleteTask(id, complete) {
    this.data[id].complete = complete;
  }

}
