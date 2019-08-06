const snTemplate = document.getElementById('sticky-note-template');

/**
 * Generate a sticky note element and append it to the body
 */
export function generateStickyNote({ text = '', id = new Date().getTime() }) {
    const node = snTemplate.content.cloneNode(true);
    const stickyNote = node.querySelector("#sticky-note-container");
    //resolve id conflicts if more notes are generated
    stickyNote.setAttribute('id', `${stickyNote.getAttribute('id')}-${id}`);
    stickyNote.querySelector('.sticky-note-text').textContent = text;
    document.body.appendChild(node);
}
