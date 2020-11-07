
import { noteService } from '../note-service/note-service.js'
import noteText from '../note-cmp/note-text.cmp.js'
import noteImg from '../note-cmp/note-img.cmp.js'
import noteTodo from '../note-cmp/note-todo.cmp.js'
import noteVideo from '../note-cmp/note-video.cmp.js'

// import d from '../../../../assets/icons/'

export default {
    props: ['types'],
    template: `
    <section class="note-add ">
        <div class="billboard ">
                <h2>Your</h2><h2> Billboard</h2>

            <!-- <h3>Your place for safe keeping: </h3> -->
            <!-- <pre style="white-space: pre-line;">{{ inputUser }}</pre> -->
            <br>
            <input  @keyup.enter="addNote" v-model="inputUser" :placeholder="placeHolder"/>
                <div class="type-btn">
                    <template v-for="(type, idx) in types">
                        <img :src= type.iconSrc  class="type-btns" @click="changeType(idx)"/> 
                    </template>
                </div>
        </div>
    </section>
    
    `,
    data() {
        return {
            newNote: noteService.getEmptyNote(),
            inputUser: '',
            typeOfNote: '',
            userText: [],
            component: 'note-text',
            placeHolder: 'share your ideas'
        }
    },
    computed: {
    },
    methods: {
        addNote() {
            console.log(this.newNote.type, 'type of new-------');
            switch (this.newNote.type) {
                case "text":
                    this.newNote.info.txt = this.inputUser
                    break;
                case "img":
                    this.newNote.info.url = this.inputUser
                    break;
                case "todo":
                    console.log(this.newNote)
                    this.newNote.info.todos = this.inputUser
                    break;
                case "video":
                    this.newNote.info.url = this.inputUser
                    break;
            }
            this.$emit('add', this.newNote)
            this.newNote = noteService.getEmptyNote();
            this.inputUser = '';
        },
        setSelectedType(type) {
            return (this.newNote.type === type)
        },
        changeType(type) {
            this.newNote.type = type;
            switch (this.newNote.type) {
                case "text":
                    this.placeHolder = 'share your ideas'
                    break;
                case "img":
                    this.placeHolder = 'enter image URL'
                    break;
                case "todo":
                    this.placeHolder = "What to do? seperate using '+' "
                    break;
                case "video":
                    this.placeHolder = 'Enter a Video URL'
                    break;
            }
        },
    },
    components: {
        noteText,
        noteImg,
        noteTodo,
        noteVideo
    }
}











































