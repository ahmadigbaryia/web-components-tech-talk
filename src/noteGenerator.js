const snTemplate = document.getElementById('sticky-note-template');

/**
 * Generate a sticky note element and append it to the body using shadow DOM
 */
export function generateStickyNote({ text = '', id = new Date().getTime() }) {
    const shadowHost = document.createElement('div');
    shadowHost.setAttribute("id", id);
    const shadowRoot = shadowHost.attachShadow({mode: "open"});
    const node = snTemplate.content.cloneNode(true);
    const stickyNote = node.querySelector('#sticky-note-container');
    //we won't have to give unique ID anymore because it's already encapsulated
    //stickyNote.setAttribute('id', `${stickyNote.getAttribute('id')}-${id}`);
    stickyNote.querySelector('.sticky-note-text').textContent = text;
    shadowRoot.appendChild(node);
    document.body.appendChild(shadowHost);
}
