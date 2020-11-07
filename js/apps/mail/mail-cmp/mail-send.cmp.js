import mailSideNav from './mail-side-nav.cmp.js'
import {mailService} from '../mail-service/mail-service.js'
import {utilService} from '../../../service/util-service.js'
// import ggg from '../../../../assets/icons/trash.ico'

export default {
    // props:[],
    name: 'mailSend',
    template: `
    <section class="mail-send">
        <mail-side-nav></mail-side-nav>
        <div class="mail-msg">
            <p>New Message</p>
            <form>
                <input type="email" placeholder="To:"> 
                <br>  
                <input type="email" placeholder="Cc:"> 
                <br>  
                <input type="email" placeholder="Bcc:">
                <br>    
                <input type="text"  placeholder="Subject:" v-model="mail.subject">
                <br> 
                <textarea name="" id="" cols="100" rows="25" v-model="mail.body"></textarea> 
                <br>
                <div class="send-mail-btn">
                    <button @click="sendMail" >Send</button>   
                    <img @click="deleteTxt" src="../../../../assets/icons/trash.ico">
                    <!-- <button @click="deleteTxt">delete</button>    -->
                </div> 
            </form>
        </div>
       

    </section>
    `,
    data() {
        return {
             mail: 
            {
                id: utilService.makeId(),
                subject: null,
                body: null,
                isRead: false,
                sentAt: mailService.currTime(),
                name: mailService.randName()
            }
        }
    },
    methods: {
        sendMail(){
            mailService.sendNewMail(this.mail)
            console.log(this.mail);
            this.$router.push('/mail')
        },
        deleteTxt() {
            this.$router.push('/mail')
        }
    },
    computed: {
    
    },
    components: {
        mailSideNav,

    },
    created() {
        mailService.getMails()
        .then(mails => this.mails = mails)
    }
    
}
