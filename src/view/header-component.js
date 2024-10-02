import { AbstractComponent } from './abstract-component.js';


function createHeaderComponentTemplate() {
    return (
        `    <header class="header">    
        
            <h2>Список задач</h2>
        
    </header>`
      );
}


export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}



