import noteActions from '../note-cmp/note-actions.cmp.js'
export default {
    props:['note'],
    template:`

    <section class= "note-video item" :style="{'background-color': note.styles.backgroundColor }">
    <img src="../../../../assets/icons/trash.ico" class="delete-cmp" @click="emitRemove(note.id)" />
        <div class="video">
            <iframe width="500" height="400" :src="note.info.url" frameborder="0"> </iframe>
        </div>
        <note-actions :note="note" ></note-actions>
    </section>
    
    `,
    methods:{
        emitRemove(noteId) {
            console.log('note id', noteId);
            // console.log('OK', carId);
            this.$emit('remove', noteId)
        },
    },
    components:{
        noteActions
    }
}