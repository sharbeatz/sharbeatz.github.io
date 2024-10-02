import {createElement} from '../framework/render.js';


function createClearButtonComponentTemplate() {
    return (
        `
        <li><button>Очистить</button></li>
        `
      );
}


export default class ClearButtonComponent {
  get template() {
    return createClearButtonComponentTemplate();
  }



}
