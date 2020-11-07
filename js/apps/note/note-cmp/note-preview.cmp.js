


export default {
    props:['note'],
    template:`
    <section class= "note-preview">
        <p>{{note.id}}</p>
        <p>{{note.type}}</p>
        <p>{{note}}</p>
    </section>
    `,

    data(){
        return{
            type:'',
            isPinned:false,
            info: {
                txt:'',
                url:'',
            }
        }
    },
    created(){
    }
       
}