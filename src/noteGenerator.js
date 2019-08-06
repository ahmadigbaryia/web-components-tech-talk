import "./stickyNote.css";

const snTemplate = document.getElementById('sticky-note-template');
const snContainer = snTemplate.content.querySelector('#sticky-note-container');

/**
 * Generate a sticky note element and append it to the body
 */
export function generateStickyNote({ text = '', id = new Date().getTime() }) {
    const node = snContainer.cloneNode(true);
    //resolve id conflicts if more notes are generated
    node.setAttribute('id', `${node.getAttribute('id')}-${id}`);
    node.querySelector('.sticky-note-text').textContent = text;
    document.body.appendChild(node);
}
