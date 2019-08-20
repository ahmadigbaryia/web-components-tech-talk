import { LoremIpsum } from '@jsilvermist/lorem-ipsum-js';

const noteTemplate = document.getElementById('note-template');
const notesContainer = document.querySelector('div#notes');
const loremIpsum = new LoremIpsum();
let nextNoteId = 0;

let generateNote = () => {
    const noteElement = noteTemplate.content.cloneNode(true);
    const stickyNote = noteElement.children[0];
    stickyNote.setAttribute('id', (++nextNoteId).toString());
    stickyNote.setAttribute('note-title', loremIpsum.sentence(1));
    stickyNote.querySelector(
        'span[slot="note-content"]'
    ).innerText = loremIpsum.paragraph(2, 3);
    notesContainer.appendChild(noteElement);
};

let removeNote = (noteElement) => {
    noteElement.parentNode.removeChild(noteElement);
};

document.getElementById('generateNote').addEventListener('click', () => {
    generateNote();
});

document.addEventListener('delete-note', (e) => {
    removeNote(document.getElementById(e.detail.id));
});
