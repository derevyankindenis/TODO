var todoView = (function () {
'use strict';

const KEYCODE_ENTER = 13;

const SORT_OF = {
  TITLE: 1,
  TITLE_REVERSE: 2,
  TIME: 3
};

class ToDoView {

  constructor() {
    this.taskListRender = [];
    this.currentSort = SORT_OF.TIME;
    this.toDo = document.querySelector('.todo');
    this.toDoList = this.toDo.querySelector('.todo__list');
    this.taskInput = this.toDo.querySelector('.todo__input');
    this.addTaskBtn = this.toDo.querySelector('.todo__addbtn');
    this.radioTitleSort = document.getElementById('sort-title');
    this.radioTimeSort = document.getElementById('sort-time');
    this.radioTitleReverseSort = document.getElementById('sort-title-reverse');
    this.taskTemplate = document.getElementById('task-template');
    this.taskInput.addEventListener('input', () => this.changeInputHandler());
    this.addTaskBtn.addEventListener('click', () => this.clickNewTaskHandler());
    this.taskInput.addEventListener('keypress', (evt) => this.pressEnterHandler(evt));
    this.radioTitleSort.addEventListener('click', () => this.sortOfTitle());
    this.radioTimeSort.addEventListener('click', () => this.sortOfTime());
    this.radioTitleReverseSort.addEventListener('click', () => this.sortOfTitle(true));
  }

  addTask(id, taskObj) {
    const task = document.importNode(this.taskTemplate.content, true);

    const taskDomElement = {
      id,
      time: taskObj.time,
      mainElement: task.querySelector('.todo__task'),
      textTask: task.querySelector('.todo__text-task'),
      deleteBtn: task.querySelector('.todo__deltask'),
      completeBtn: task.querySelector('.todo__checktask')
    };

    taskDomElement.textTask.value = taskObj.title;
    if (taskObj.complete) taskDomElement.mainElement.classList.add('todo__task--complete');
    taskDomElement.deleteBtn.addEventListener('click', () => this.clickDeleteHandler(taskDomElement));
    taskDomElement.completeBtn.addEventListener('click', () => this.clickCompletekHandler(taskDomElement));
    taskDomElement.textTask.addEventListener('blur', () => this.blurTaskInputHandler(taskDomElement));
    this.addTaskInDOM(taskDomElement);
  }

  addTaskInDOM(taskDomElement) {
    switch (this.currentSort) {
      case SORT_OF.TIME:
        this.insertForTimeSort(taskDomElement);
        return;
      case SORT_OF.TITLE:
        this.insertForTitleSort(taskDomElement);
        break;
      case SORT_OF.TITLE_REVERSE:
        this.insertForTitleSort(taskDomElement, true);
        break;
      default:
        this.taskListRender.push(taskDomElement);
        this.toDoList.appendChild(taskDomElement.mainElement);
    }
  }


  renderTaskList(taskList) {
    const fragment = document.createDocumentFragment();
    taskList.forEach((task) => fragment.appendChild(task.mainElement));
    this.toDoList.innerHTML = '';
    this.toDoList.appendChild(fragment);
  }

  insertForTitleSort(taskDomElement, reverse = false) {
    const compareResult = reverse ? -1 : 1;
    for(let i = 0; i < this.taskListRender.length; i++) {
      if (this.taskListRender[i].textTask.value.localeCompare(taskDomElement.textTask.value) === compareResult) {
        this.toDoList.insertBefore(taskDomElement.mainElement, this.taskListRender[i].mainElement);
        this.taskListRender.splice(i, 0, taskDomElement);
        return;
      }
    }

    this.taskListRender.push(taskDomElement);
    this.toDoList.appendChild(taskDomElement.mainElement);
  }

  insertForTimeSort(taskDomElement) {
    this.toDoList.appendChild( taskDomElement.mainElement);
    this.taskListRender.unshift(taskDomElement);
  }

  sortOfTitle(reverse = false) {
    this.currentSort = reverse ? SORT_OF.TITLE_REVERSE : SORT_OF.TITLE;
    let sortFunction;
    if (reverse) {
      sortFunction = (task1, task2) => task2.textTask.value.localeCompare(task1.textTask.value);
    } else {
      sortFunction = (task1, task2) => task1.textTask.value.localeCompare(task2.textTask.value);
    }
    this.taskListRender.sort(sortFunction);
    this.renderTaskList(this.taskListRender);
  }

  sortOfTime() {
    this.currentSort = SORT_OF.TIME;
    this.taskListRender.sort((task1, task2) => {
      return task1.time - task2.time;
    });
    this.renderTaskList(this.taskListRender);
  }

  clickDeleteHandler(taskDomElement) {
    this.toDoList.removeChild(taskDomElement.mainElement);
    this.taskListRender.splice(this.taskListRender.indexOf(taskDomElement), 1);
    this.onClickDelete(taskDomElement.id);
  }

  clickCompletekHandler(taskDomElement) {
    if (taskDomElement.mainElement.classList.contains('todo__task--complete')) {
      taskDomElement.mainElement.classList.remove('todo__task--complete');
      this.onClickComplete(taskDomElement.id, false);
    } else {
      taskDomElement.mainElement.classList.add('todo__task--complete');
      this.onClickComplete(taskDomElement.id, true);
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

  blurTaskInputHandler(taskDomElement) {
    if (taskDomElement.textTask.value === '') {
      this.clickDeleteHandler(taskDomElement);
    } else {
      this.onEditTask(taskDomElement.id, taskDomElement.textTask.value);
    }
  }

  onClickDelete(id) {
  }

  onClickComplete(id) {
  }

  onClickAddNewTask(title) {
  }

  onEditTask(id, title) {
  }

}

return ToDoView;

}());

//# sourceMappingURL=todo-view.js.map
