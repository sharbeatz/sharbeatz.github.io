import { AbstractComponent } from "./abstract-component.js";

function createNoTaskTemplate() {
    return (
        `<p class="loading">Loading tasks...
        </p>
`
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}
