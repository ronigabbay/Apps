
import {eventBus} from '../../../service/event-bus-service.js'
// import fff from '../../../../assets/icons/trash.ico'

export default {
    props:['mail'],
    template:`
    <section class="mail-preview" :class="mailRead" >
        <!-- <h2>mail-preview </h2> -->
        <!-- <p   @click="getMailDetails" > {{mail.name}} {{mail.subject}} {{mail.sentAt}} </p> -->
        <span @click="getMailDetails" class='mailName'>{{mail.name}}</span>
        <span @click="getMailDetails" class='maiSubject'>{{mail.subject}}</span>
        <span @click="getMailDetails" class='mailTime'>{{mail.sentAt}}</span>
        <img @click="emitDelete(mail.id)" src="../../../../assets/icons/trash.ico">
        <!-- <button @click="emitDelete(mail.id)">x</button> -->
    
        
    </section>
    `,
    data(){
        return{
            subject:null,
            body:null,
            isRead:false,
            sentAt:null,
            name: ''
        }
    }, 
    methods: {
        getMailDetails() {
            this.$router.push('/mail/'  + this.mail.id)
        },
        emitDelete(mailId){
            this.$emit('delete', mailId)
        },
        // readMark(){
        //     this.mail.isRead = !this.mail.isRead
        //     this.$emit('mailRead', this.mail)
        //     // console.log(this.mail);
        // }
    },
    computed: {
        mailRead() {
            return {read: this.mail.isRead}
        }
    }
}