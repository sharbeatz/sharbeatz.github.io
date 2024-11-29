
import { AbstractComponent } from "./abstract-component.js";

function createNoTasksComponentTemplate (task) {
    return (
    `
        <li class="no-tasks">Перетащите карточку</li>
    `
    );
}

export default class NoTasksComponent extends AbstractComponent {
    get template() {
        return createNoTasksComponentTemplate();
    }
}


