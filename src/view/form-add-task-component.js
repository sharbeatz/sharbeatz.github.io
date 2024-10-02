import {createElement} from '../framework/render.js';
import { AbstractComponent } from './abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="add-task__form" aria-label="Форма добавления задачи">
            <section class="new-task">
                <div class="container">   
                    <label>Новая задача</label>
                    <div class="add-task">
                        <input type="text" placeholder="Название задачи...">     
                        <button>+ Добавить</button>
                    </div>      
                </div>    
            </section>
      </form>`
      );
}


export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
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
