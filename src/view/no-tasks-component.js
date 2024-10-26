
import { AbstractComponent } from "./abstract-component.js";

function createNoTasksComponentTemplate (task) {
    return (
    `
    <div class="no-tasks">
        <p>Перетащите карточку</p>
    </div>
    `
    );
}

export default class NoTasksComponent extends AbstractComponent {
    get template() {
        return createNoTasksComponentTemplate();
    }
}


