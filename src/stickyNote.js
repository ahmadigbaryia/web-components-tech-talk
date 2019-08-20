let idCounter = 1;
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Caveat&display=swap" />
<style>
    .sticky-note-container {
        text-decoration: none;
        color: #000;
        background: #ffc;
        display: block;
        height: 10em;
        width: 10em;
        padding: 1em;
        /* Firefox */
        -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
        /* Safari+Chrome */
        -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
        /* Opera */
        box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    }
    .sticky-note-text {
        font-family: 'Caveat', cursive;
    }
    .note-controls {
        text-align: right;
        font-size: 11px;
        padding-bottom: 5px;
    }
    .note-controls > span {
        cursor: pointer;
    }

    :host {
        display: inline-block; /* by default, custom elements are display: inline */
        contain: content; /* CSS containment FTW. */
        padding: 5px;
    }
</style>
<div id="sticky-note-container" class="sticky-note-container">
    <div class="note-controls">
        <span id="delete-note">X</span>
    </div>
    <h1 id="note-title"></h1>
    <slot name="note-content" class="sticky-note-text"></slot>
</div>
`;

export default class StickyNoteElement extends HTMLElement {
    
    /**
     * Constructor, the best place to attach the shadow dom
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._deleteButton = this.shadowRoot.querySelector('#delete-note');
        this._noteTitle = this.shadowRoot.querySelector('#note-title');
    }

    /**
     * A callback that is triggered by the browser when the element is rendered 
     */
    connectedCallback() {
        if (!this.hasAttribute('note-title')) {
            this._noteTitle.style.display = 'none';
        }
        if (!this.id) {
            this.id = `sticky-note-${idCounter++}`;
        }
        this._deleteButton.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent('delete-note', {
                    detail: {
                        id: this.id
                    },
                    bubbles: true // important, the default is false, we need this to pierce the shadow dom boundaries
                })
            );
        });
    }

    /**
     * A callback that is triggered by the browser when the element is removed
     */
    disconnectedCallback() {
        this._deleteButton.removeEventListener('click');
    }

    /**
     * A callback that is triggered by the browser when the element's attribute changes 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'note-title') {
            if (!!newValue) {
                this._noteTitle.innerText = newValue;
                if(!oldValue) {
                    this._noteTitle.style.display = 'block';
                }
            } else {
                this._noteTitle.innerText = '';
                this._noteTitle.style.display = 'none';
            }
        }
    }

    /**
     * An array of attributes to be observed for changes
     */
    static get observedAttributes() {
        return ['note-title'];
    }

    set noteTitle(noteTitle) {
        if (!!noteTitle) {
            this.setAttribute('note-title', noteTitle);
        } else {
            this.setAttribute('note-title', '');
        }
    }
    get noteTitle() {
        return this.getAttribute('note-title');
    }
}

window.customElements.define('sticky-note', StickyNoteElement);
