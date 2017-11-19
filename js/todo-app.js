import ToDoModel from './todo-model';
import ToDoView from './todo-view';
import { generateId } from './utils';

export default class ToDoApp {

  constructor() {
    this.model = new ToDoModel();
    this.view = new ToDoView();
  }

  init(data) {
    this.data = data;
    this.model.init(data);
    this.fillListTasks();
  }

  fillListTasks() {
    for(let id in this.data) {
      this.view.addTask(id, this.data[id]);
    }
  }

};
