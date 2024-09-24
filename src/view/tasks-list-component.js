import {createElement} from '../framework/render.js';



function createTaskListTemplate(task) {
    const { status } = task;
    return (
        `
        <li class="tasks">
            <h4 class="title-tasks backlog">${status}</h4>
            <ul class="tasks backlog">
            </ul>
        </li>
        `
      );
}

export default class TaskListComponent {
    constructor({ task }) {
        this.task = task;
        this.element = null; // Инициализируем element как null
      }

  getTemplate() {
    return createTaskListTemplate(this.task);
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
