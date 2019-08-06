import { LoremIpsum } from '@jsilvermist/lorem-ipsum-js';
import { generateStickyNote } from './noteGenerator';

const ipsum = new LoremIpsum();

document
    .getElementById('generate-sticky-note')
    .addEventListener('click', () => {
      const noteLength = Math.random() * 10 + 5;
        generateStickyNote({ text: ipsum.paragraph(noteLength) });
    });
