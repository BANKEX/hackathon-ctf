  var currentDocument = document.currentScript.ownerDocument;

// регистрируем новый элемент
customElements.define('pos-navigation',  class extends HTMLElement {
  constructor() {
    super();
  }

  // колбэк, вызываемый после создания элнмента
  createdCallback() {  };
  // колбэк, вызываемый после вставки нового элнмента в DOM
  connectedCallback() {
    const shadowRoot = this// отключил //.attachShadow({ mode: 'open' });
    const template = currentDocument.querySelector('#navigation-template');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
    this.setupNavigation();
  }

  setupNavigation() {
    const currentLocation = window.location.toString().split('/').pop();
    const items = this.querySelectorAll('.navbar-nav a[id]');
    items.forEach((item, index)=> {
      if (currentLocation === item.href.split('/').pop()) {
        item.classList.add('active');
      }
    })
  }
})





