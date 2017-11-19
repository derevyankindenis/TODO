
class ToDoView {

  constructor() {
    this.toDo = document.querySelector('.todo');
    this.toDoList = this.toDo.querySelector('.todo__list');
    this.addTaskBtn = this.toDo.querySelector('.todo__addbtn');
    this.addTaskBtn.addEventListener('click', () => this.onClickAddNewTask());
    this.taskTemplate = document.getElementById('task-template');
  }

  addTask(id, taskObj) {
    const task = document.importNode(this.taskTemplate.content, true);
    const toDoTask = task.querySelector('.todo__task');
    const textTask = task.querySelector('.todo__text-task');
    const deleteBtn = task.querySelector('.todo__deltask');
    const completeBtn = task.querySelector('.todo__checktask');
    textTask.textContent = taskObj.title;
    deleteBtn.addEventListener('click', () => this.clickDeleteHandler(id, toDoTask));
    completeBtn.addEventListener('click', () => this.clickCompletekHandler(id, toDoTask));
    this.toDoList.appendChild(task);
  }

  clickDeleteHandler(id, toDoTask) {
    this.toDoList.removeChild(toDoTask);
    this.onClickDelete(id);
  }

  clickCompletekHandler(id, toDoTask) {
    toDoTask.classList.contains('todo__task--complete') ? toDoTask.classList.remove('todo__task--complete') : toDoTask.classList.add('todo__task--complete');
    this.onClickComplete(id);
  }

  onClickDelete(id) {
  }

  onClickComplete(id) {
  }

  onClickAddNewTask() {
  }

}

export default ToDoView;
