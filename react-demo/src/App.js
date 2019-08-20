import React from 'react';
import { LoremIpsum } from '@jsilvermist/lorem-ipsum-js';
import './web-component/stickyNote';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.nextNoteId = 0;
        this.notesBoardRef = React.createRef();
        this.loremIpsum = new LoremIpsum();

        this.state = {
            notes: []
        };

        this.generateNoteHandler = this.generateNoteHandler.bind(this);
    }
    componentDidMount() {
        this.notesBoardRef.current.addEventListener('delete-note', (e) =>
            this.onNoteDelete(e)
        );
    }
    generateNote() {
        return {
            id: (++this.nextNoteId).toString(),
            title: this.loremIpsum.sentence(1),
            contents: this.loremIpsum.paragraph(2, 3)
        };
    }
    onNoteDelete(e) {
        const deletedNoteId = e.detail.id;
        this.setState((state) => ({
            notes: state.notes.filter((note) => note.id !== deletedNoteId)
        }));
    }
    generateNoteHandler() {
        this.setState((state) => ({
            notes: [...state.notes, this.generateNote()]
        }));
    }
    render() {
        return (
            <div className="App" ref={this.notesBoardRef}>
                <button onClick={this.generateNoteHandler}>
                    Generate Note
                </button>
                <div>
                    {this.state.notes.map((note) => (
                        <sticky-note
                            id={note.id}
                            note-title={note.title}
                            key={note.id}
                        >
                            <span slot="note-content">{note.contents}</span>
                        </sticky-note>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
