import { LoremIpsum } from '@jsilvermist/lorem-ipsum-js';

angular
    .module('angularjs-demo', [])
    .controller('NotesBoardController', function($scope) {
        const loremIpsum = new LoremIpsum();

        this.nextNoteId = 0;
        this.notes = [];

        this.generateNote = () => {
            this.notes.push({
                id: (++this.nextNoteId).toString(),
                title: loremIpsum.sentence(1),
                contents: loremIpsum.paragraph(2, 3)
            });
        };

        this.removeNote = (id) => {
            let noteIndex = -1;
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i].id === id) {
                    noteIndex = i;
                    break;
                }
            }
            if (noteIndex > -1) {
                this.notes.splice(noteIndex, 1);
            }
        };

        document.addEventListener('delete-note', (e) => {
            $scope.$apply(() => this.removeNote(e.detail.id));
        });

        $scope.$on('$destroy', () => {
            document.removeEventListener('delete-note');
        });
    });
