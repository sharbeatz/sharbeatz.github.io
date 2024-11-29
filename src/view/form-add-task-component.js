import {createElement} from '../framework/render.js';
import { AbstractComponent } from './abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="add-task__form" aria-label="Форма добавления задачи">
            <section class="new-task">
                <div class="container">   
                    <label class = "new-task-label">Новая задача</label>
                    <div class="add-task">
                        <input type="text" id="add-task" placeholder="Название задачи...">     
                        <button type = "submit">Добавить</button>
                    </div>      
                </div>    
            </section>
      </form>`
      );
}


export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;
    constructor ({onClick}) {
    super();  // <--- Необходимо вызывать перед использованием 'this'
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);

    }
  get template() {
    return createFormAddTaskComponentTemplate();
  }


#clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
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
