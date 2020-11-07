import {mailService} from '../mail-service/mail-service.js'

export default {
    props:[''],
    template:`
    <section class="mail-status">

        
        <p><span>Unread: {{ mailsReadNum}} </span></p>
        <!-- <p> {{mailsRead}} </p> -->
       
    </section>
    `,
    data(){
      return {
          mailsRead: null
      }
    }, 
    methods: {
        // mailsReadNum(){
        //     mailService.countMailRead()
        //         .then (num => this.mailsRead = num)
        //     // return mailService.countMailRead()
        // }
    },
    computed: {
        mailsReadNum(){
            return mailService.countMailUnRead()
        }
    },
    created() {
        
    }
}