import notePreview from './note-preview.cmp.js'
import noteText from './note-text.cmp.js'
import noteImg from './note-img.cmp.js'
import noteTodo from './note-todo.cmp.js'
import noteVideo from './note-video.cmp.js'


export default {
    props: ['notes', 'types'],
    template: `
    <section class="note-list">
        <component v-for="(note,idx) in notes" :is="'note-'+note.type"
					:key="note.id" :note="note" @remove="emitRemove(note.id)">
        </component>
    </section>
    
    `,
    methods: {
        emitRemove(noteId) {
            console.log('note id', noteId);
            // console.log('OK', carId);
            this.$emit('remove', noteId)
        },
    },

    components: {
        notePreview,
        noteText,
        noteImg,
        noteTodo,
        noteVideo
    }

}