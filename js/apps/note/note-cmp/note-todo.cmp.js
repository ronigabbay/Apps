import noteActions from '../note-cmp/note-actions.cmp.js' 
import noteEdit from '../note-cmp/note-edit.cmp.js' 
import { eventBus, EVENT_LIST_NOTE_STATUS_CHANGED } from '../../../service/event-bus-service.js'
export default {
    props: ['note'],
    template: `
    <section class="note-todo item" :style="{'background-color': note.styles.backgroundColor }">
    <img src="../../../../assets/icons/trash.ico" class="delete-cmp" @click="emitRemove(note.id)" />
        <h3>To Do:</h3>
            <!-- <ul>
				<li v-for="(item,idx) in note.info.todos">
                    <label>   
                        <input type="checkbox" @change="checkboxClick"/>    
                            {{item.txt}}
                    </label>
				</li>
            </ul> -->
            <ul>
				<li  v-for="(listItem, idx) in note.info.todos"
					@click="updateStatus(idx)" :class="statusClass(listItem.completed)">
						{{listItem.text}}
				</li>
			</ul>

            <note-actions :note="note" ></note-actions>
            <note-edit :note ="note" v-if="note.isEdit"></note-edit>
            
    </section>
    
    `,
    methods: {
        emitRemove(noteId) {
            // console.log('note id', noteId);
            // console.log('OK', carId);
            this.$emit('remove', noteId)
        },
        checkboxClick(){
            this.$emit(change)

        },
        statusClass(status) {
			return (status) ? 'completed' : '';
        },
        updateStatus(listIdx) {
			console.log('change status');
			eventBus.$emit(EVENT_LIST_NOTE_STATUS_CHANGED, this.note.id, listIdx);
		}
    },
    components:{
        noteActions,
        noteEdit
    }
}
