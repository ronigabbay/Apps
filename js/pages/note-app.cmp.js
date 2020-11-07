import noteList from '../apps/note/note-cmp/note-list.cmp.js'
import noteText from '../apps/note/note-cmp/note-text.cmp.js'
import noteImg from '../apps/note/note-cmp/note-img.cmp.js'
import noteToDo from '../apps/note/note-cmp/note-todo.cmp.js'
import noteAdd from '../apps/note/note-cmp/note-add.cmp.js'
import noteVideo from '../apps/note/note-cmp/note-video.cmp.js'
import noteFilter from '../apps/note/note-cmp/note-filter.cmp.js'
import { noteService } from '../apps/note/note-service/note-service.js'
import {
    eventBus, EVENT_NOTE_ADDED, EVENT_NOTE_PINNED,
    EVENT_NOTE_MARKED, EVENT_NOTE_STYLED, EVENT_NOTE_EDITING, EVENT_NOTE_UPDATED,
    EVENT_NOTE_CLONED, EVENT_NOTE_DELETED, EVENT_NOTE_CLOSING,EVENT_LIST_NOTE_STATUS_CHANGED, EVENT_NOTE_FILTERED
} from '../service/event-bus-service.js'


export default {
    name: 'note-app',
    template: `
    <section v-if="notes" >
        <div class="inputs">
            <note-add :types="types" @add="addNote"></note-add>
            <note-filter></note-filter>
        </div>
        <div class= "container">
            <div class= "app-container masonry">
                <note-list  @remove="removeNote"  :notes="notesToShow" :types="types"></note-list>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            types: {
                text: { sector: 'text', btn: 'Txt',iconSrc:'../../../../assets/icons/text.ico', placeholder: 'keep your ideas!' },
                img: { sector: 'img', btn: 'Img',iconSrc:'../../../../assets/icons/image.ico', placeholder: 'keep your images!' },
                todo: { sector: 'todo', btn: 'todo',iconSrc:'../../../../assets/icons/list.ico', placeholder: 'What to do next!' },
                video: { sector: 'video', btn: 'video',iconSrc:'../../../../assets/icons/film .ico', placeholder: 'Upload a video!' }
            },
            cmp: null,
            notes: null,
            filterBy: null,
            type: null,
            isText: false,
        }
    },
    methods: {
        addNote(newNote) {
            console.log('new note', newNote, newNote.type);
            if (newNote.type==='todo') {
                noteService.saveTodo(newNote)
            }else{
                noteService.saveNote(newNote, newNote.type)
            }
        },
        editNote(noteId,newData) {
			noteService.editNote(noteId,newData);
		},
        removeNote(noteId) {
            noteService.remove(noteId)
        },
        styleNote(noteId, bgColor) {
            noteService.styleNote(noteId, bgColor);
        },
        updateFilter(newFilter) {
            console.log('new Filter', newFilter)
            this.filterBy = newFilter;
        },
        updateListNoteStatus(noteId, listIdx) {
            ('in note app !', noteId,listIdx)
			noteService.updateListNoteStatus(noteId, listIdx);
        },
        closeById(id){
            noteService.closeEdit(id)
        }
    },
    computed: {
        notesToShow() {
			let notesToShow = this.notes;

			if (this.filterBy && this.filterBy.type !=='') {
				notesToShow = notesToShow.filter(note => this.filterBy.type === note.type)
			}

			if (this.filterBy && this.filterBy.txt) {
				var search = this.filterBy.txt.toLowerCase()
				notesToShow = notesToShow.filter(note => {
					let strValue = '';
					switch (note.type) {
						case 'text':
							strValue = note.info.txt;
							break;
						case 'img':
						case 'video':
							strValue = note.info.url;
							break;
						case 'todo':
							strValue = note.info.todos.map(list => list.txt).join(',');
							break;
					}
					return strValue.includes(search);
				})
			}
            var copy=  JSON.parse(JSON.stringify(notesToShow)) 
			return copy;
		},
        noteType(idx) {
            console.log(this.notes[idx].type);
            return this.note.type = 'text'
        },


    },
    created() {
        // console.log('created');
        noteService.getNotes()
            .then(notes => this.notes = notes)
        // .then(console.log('this notes', this.notes))
        // this.noteToEdit = noteService.getEmptyNote()
        //     .then(note => this.noteToEdit = note)
        eventBus.$on(EVENT_NOTE_ADDED, (note) => this.addNote(note));
        // eventBus.$on(EVENT_NOTE_PINNED, noteId => this.pinNote(noteId));
        // eventBus.$on(EVENT_NOTE_MARKED, noteId => this.markNote(noteId));
        eventBus.$on(EVENT_NOTE_STYLED, (noteId, bgColor) => this.styleNote(noteId, bgColor));
        eventBus.$on(EVENT_NOTE_EDITING, (noteId,data) => this.editNote(noteId,data));
        eventBus.$on(EVENT_NOTE_CLOSING, noteId => this.closeById(noteId));
        // eventBus.$on(EVENT_NOTE_UPDATED, (note, data) => this.editNote(note, data));
        // eventBus.$on(EVENT_NOTE_CLONED, noteId => this.cloneNote(noteId));
        eventBus.$on(EVENT_NOTE_DELETED, noteId => this.removeNote(noteId));
        eventBus.$on(EVENT_LIST_NOTE_STATUS_CHANGED, (noteId, listIdx) => this.updateListNoteStatus(noteId, listIdx));
        eventBus.$on(EVENT_NOTE_FILTERED, filter => this.updateFilter(filter));
    },

    components: {
        noteList,
        noteText,
        noteImg,
        noteToDo,
        noteAdd,
        noteVideo,
        noteFilter
    }

}