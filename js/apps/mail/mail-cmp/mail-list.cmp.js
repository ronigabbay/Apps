import mailPreview from './mail-preview.cmp.js'
import mailDetails from '../mail-pages/mail-details.cmp.js'
// import {mailService} from '../mail-service/mail-service.js'

export default {
    props:['mails'],
    template:`
    <section class="mail-list">
        <!-- <h2>mail-list</h2> -->
            <ul>
                <li v-for = "currMail in mails" :key="currMail.id">
                    <mail-preview @delete="emitDelete" :mail='currMail'></mail-preview>
                    <!-- <mail-preview @mailRead="emitMailRead" :mail='currMail'></mail-preview> -->
                    <!-- {{currMail}} -->
            
                    <!-- <button @click="emitDelete(currMail.id)">x</button> -->
                </li>
            </ul>
    </section>
    `,
     methods: {
        emitDelete(mailId){
            console.log(mailId);
            this.$emit('delete', mailId)
        },
        // emitMailRead(mail) {
        //     // console.log(mail);
        //     this.$emit('mailRead', mail)
        // }
    },
    components:{
        mailPreview,
        mailDetails
    }
} 