import {createElement} from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
        `    <header>    
        <div class="container"> 
            <h2>Список задач</h2>
        </div>
    </header>`
      );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
