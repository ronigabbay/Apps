import {eventBus,EVENT_NOTE_EDITING,EVENT_NOTE_CLOSING} from '../../../service/event-bus-service.js'


export default {
    props: ['note'],
    template: `
		<section class="notes-edit">

			<input v-if="note.isEdit" type="text" autocomplete="off" v-model="newData" />
			<button @click="cancel">Cancel</button>
			<button @click="saveEdit">Update</button>
		</section>
	`,
    data() {
        return {
            newData: '',
        }
    },
    created() {
        this.newData = this.getNoteData();
    },
    methods: {
        getNoteData() {
            let strValue = '';
            switch (this.note.type) {
                case 'text':
                    strValue = this.note.info.txt;
                    break;
                case 'image':
                case 'video':
                    strValue = this.note.info.url;
                    break;
                case 'todo':
                    strValue = this.note.info.todos.map((list => list.txt));
                    break;
            }
            return strValue;
        },
        cancel() {
            // this.note.isEdit=false
            eventBus.$emit(EVENT_NOTE_CLOSING, this.note.id);
        },
        saveEdit() {
            eventBus.$emit(EVENT_NOTE_EDITING, this.note.id,this.newData);
            // eventBus.$emit(EVENT_NOTE_UPDATED, this.note, this.newData);
        }
    }
}
