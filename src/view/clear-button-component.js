import {createElement} from '../framework/render.js';
import { AbstractComponent } from './abstract-component.js';

function createClearButtonComponentTemplate() {
    return (
        `

            <li><button>Очистить</button></li>

        `
      );
}


export default class ClearButtonComponent extends AbstractComponent {
  #handleClick = null;
  
  
  clearTasks (onClick) {
    this.#handleClick = onClick;
    
    if (this.element) {
        this.element.addEventListener('click', this.#clickHandler.bind(this)); // Привязываем контекст
    } else {
        console.warn("Элемент не найден в DOM");
    }
    
  }

  #clickHandler() {
    if (this.#handleClick) {
        this.#handleClick(); 
     
    }
}


toggleDisabled(isDisabled) {
  this.element.disabled = isDisabled;
}toggleDisabled(isDisabled) {
  this.element.disabled = isDisabled;
}


  get template() {
      return createClearButtonComponentTemplate();
  }


}


  // #handleClick = null;
  // constructor ({onClick}) {
  //   super();  // <--- Необходимо вызывать перед использованием 'this'
  //   this.#handleClick = onClick;
  //   this.element.addEventListener('submit', this.#clickHandler);
  //   }
  //   #clickHandler = (evt) => {
  //     evt.preventDefault();
  //     this.#handleClick();
  // }



