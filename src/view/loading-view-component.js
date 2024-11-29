import { AbstractComponent } from "./abstract-component.js";

function createNoTaskTemplate() {
    return (
        `
                <div class="loading">
            <span class="loading__spinner"></span>
            Загрузка задач
        </div>
`
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}
