const KEYCODE_ENTER = 13;

class ToDoView {

  constructor() {
    this.toDo = document.querySelector('.todo');
    this.toDoList = this.toDo.querySelector('.todo__list');
    this.taskInput = this.toDo.querySelector('.todo__input');
    this.taskInput.addEventListener('input', () => this.changeInputHandler());
    this.addTaskBtn = this.toDo.querySelector('.todo__addbtn');
    this.addTaskBtn.addEventListener('click', () => this.clickNewTaskHandler());
    this.taskInput.addEventListener('keypress', (evt) => this.pressEnterHandler(evt));
    this.taskTemplate = document.getElementById('task-template');
  }

  addTask(id, taskObj) {
    const task = document.importNode(this.taskTemplate.content, true);
    const toDoTask = task.querySelector('.todo__task');
    const textTask = task.querySelector('.todo__text-task');
    const deleteBtn = task.querySelector('.todo__deltask');
    const completeBtn = task.querySelector('.todo__checktask');
    textTask.textContent = taskObj.title;
    if (taskObj.complete) toDoTask.classList.add('todo__task--complete');
    deleteBtn.addEventListener('click', () => this.clickDeleteHandler(id, toDoTask));
    completeBtn.addEventListener('click', () => this.clickCompletekHandler(id, toDoTask));
    this.toDoList.insertAdjacentElement('afterBegin', toDoTask);
  }

  clickDeleteHandler(id, toDoTask) {
    this.toDoList.removeChild(toDoTask);
    this.onClickDelete(id);
  }

  clickCompletekHandler(id, toDoTask) {
    if (toDoTask.classList.contains('todo__task--complete')) {
      toDoTask.classList.remove('todo__task--complete');
      this.onClickComplete(id, false);
    } else {
      toDoTask.classList.add('todo__task--complete');
      this.onClickComplete(id, true);
    }

  }

  clickNewTaskHandler() {
    this.onClickAddNewTask(this.taskInput.value.trim());
    this.addTaskBtn.setAttribute('disabled', 'disabled');
    this.taskInput.value = '';
  }

  changeInputHandler() {
    if (this.taskInput.value === '') {
      this.addTaskBtn.setAttribute('disabled', 'disabled');
    } else {
      this.addTaskBtn.removeAttribute('disabled');
    }
  }

  pressEnterHandler(evt) {
    if (evt.keyCode === KEYCODE_ENTER && this.taskInput.value !== '') this.clickNewTaskHandler();
  }

  onClickDelete(id) {
  }

  onClickComplete(id) {
  }

  onClickAddNewTask(title) {
  }

}

export default ToDoView;
