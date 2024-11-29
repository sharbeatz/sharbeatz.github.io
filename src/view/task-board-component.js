import {createElement} from '../framework/render.js';
import { AbstractComponent } from './abstract-component.js';


function createTaskBoardTemplate() {
    return (
        `
        <ul class="task-list">

        </ul>
        `
      );
}

export default class TaskBoardComponent extends AbstractComponent{
  get template() {
    return createTaskBoardTemplate();
  }

}
