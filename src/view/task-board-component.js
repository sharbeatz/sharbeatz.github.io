import {createElement} from '../framework/render.js';


function createTaskBoardTemplate() {
    return (
        `
        <li class="tasks-item">
            <h4 class="title-tasks backlog">Бэклог</h4>
            <ul class="tasks backlog">    
               
            </ul>
        </li>
        `
      );
    
}


export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardTemplate();
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
