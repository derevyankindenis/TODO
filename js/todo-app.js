import ToDoModel from './todo-model';
import ToDoView from './todo-view';

export default class ToDoApp {

  constructor() {
    this.model = new ToDoModel();
    this.view = new ToDoView();
  }

  init(data) {
    this.data = data;
    this.model.init(data);
    this.view.onClickAddNewTask = (title) => this.newTaskHandler(title);
    this.view.onClickComplete = (id, complete) => this.completeTaksHandler(id, complete);
    this.view.onClickDelete = (id) => this.deleteTaskHandler(id);
    this.fillListTasks(data);
  }

  fillListTasks(data) {
    for(let id in data) {
      this.view.addTask(id, data[id]);
    }
  }

  newTaskHandler(title) {
    const id = this.model.addTask(title);
    this.view.addTask(id, this.model.getTask(id));
  }

  deleteTaskHandler(id) {
    this.model.deleteTask(id);
  }

  completeTaksHandler(id, complete) {
    this.model.updateCompleteTask(id, complete);
  }

};
