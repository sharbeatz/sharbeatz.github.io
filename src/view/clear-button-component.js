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
  get template() {
    return createClearButtonComponentTemplate();
  }



}
