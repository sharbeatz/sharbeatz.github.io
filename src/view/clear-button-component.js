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
  #handleClick;

  constructor({ onClick } ={} ) { // Добавлено значение по умолчанию
      super();
      this.#handleClick = onClick;
      this.element.addEventListener("click", this.#clickHandler);
  }

  get template() {
      return createClearButtonComponentTemplate();
  }

  #clickHandler = (evt) => {
      console.log('Кнопка очищения нажата'); // Проверка, что обработчик сработал
      evt.preventDefault();
      if (typeof this.#handleClick === 'function') { // Проверка на существование функции
          this.#handleClick();
      }
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



