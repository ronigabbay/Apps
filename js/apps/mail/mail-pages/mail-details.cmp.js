
import { eventBus } from '../../../service/event-bus-service.js'
import {mailService} from '../mail-service/mail-service.js'
import mailSideNav from '../mail-cmp/mail-side-nav.cmp.js'

export default {
    // props:[],
    name: 'mailDetails',
    template: `
    <section v-if="mail"  class="mail-details">
        <mail-side-nav class="mail-side-nav"></mail-side-nav>
        <div class="details"> 
            <div class="details-btn">
                <img @click="goBack()" src="../../../../assets/icons/back.ico">
                <button class="mail-read-btn" v-if="!mail.isRead"  @click="MailReadOrUnread">Read</button>
                <button  class="mail-unRead-btn" v-if="mail.isRead"  @click="MailReadOrUnread">Unread</button>
                <img @click="deleteMail(mail.id)" src="../../../../assets/icons/trash.ico">
            </div>
            <h3 class="mail-subject-details">{{mail.subject}}</h3>
            <hr>
            <p class="mail-subject-body" >{{mail.body}}</p>
            <router-link class="forward" to="/send" exact> <img src="../../../../assets/icons/forward.ico"></router-link>
       </div>
    </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    methods: {
        deleteMail(mailId){
            console.log(mailId);
            mailService.remove(mailId)
            this.$router.push('/mail')
        },
        goBack(){
            this.$router.push('/mail')
        },
        MailReadOrUnread(){
            this.mail.isRead = !this.mail.isRead
            mailService.save(this.mail)
        }
    },
    computed: {
    
    },
    components: {
        
        mailSideNav,
       

    },
    created() {
     const id = this.$route.params.mailId
     mailService.getById(id)
        .then(mail => this.mail = mail)
        
    }
    
}
