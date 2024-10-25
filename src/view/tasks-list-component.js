// import { createElement } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import { AbstractComponent } from './abstract-component.js';


function createTaskListTemplate({ status, label }) {
  return (
    `
    <li class="tasks">
        <h4 class="title-tasks ${status}">${StatusLabel[status]}</h4>
        <ul class="tasks ${status}">
        </ul>
    </li>
    `
  );
}

export default class TasksListComponent extends AbstractComponent{
  constructor({ status, label }) {
    super(); // Необходимо вызывать super() для наследования от AbstractComponent
    this.status = status;
    this.label = label;

  }

  get template() {
    return createTaskListTemplate({ status: this.status, label: this.label});
  }

//   getElement() {
//     if (!this.element) {
//       this.element = createElement(this.getTemplate());
//     }
//     return this.element;
//   }

//   removeElement() {
//     this.element = null;
//   }
 }
