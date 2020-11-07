import mailList from '../apps/mail/mail-cmp/mail-list.cmp.js'
import { mailService } from '../apps/mail/mail-service/mail-service.js'
import mailDetails from '../apps/mail/mail-pages/mail-details.cmp.js'
import mailStatus from '../apps/mail/mail-cmp/mail-status.js'
import mailSideNav from '../apps/mail/mail-cmp/mail-side-nav.cmp.js'
import mailFilter from '../apps/mail/mail-cmp/mail-filter.cmp.js'
// import mailSend from '../apps/mail/mail-cmp/mail-send.cmp.js'




export default {
    template: `
    <section class="mail-app">
        <!-- <h2>mail</h2> -->
        <mail-status></mail-status>
        <mail-filter @doFilter="setFilter" ></mail-filter>
        <mail-side-nav></mail-side-nav>
        <!-- <mail-send v-if="sendMail"></mail-send> -->
        <mail-list v-if="!sendMail" @delete="deleteMail" :mails="mailsToShow"></mail-list>
        <!-- <mail-list v-if="!sendMail" @delete="deleteMail" @mailRead="marekdReadMail" :mails="mailsToShow"></mail-list> -->
        <mail-details  ></mail-details>
    </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null,
            mailReadCount: null,
            sendMail: false
        }
    },
    computed: {
        mailsToShow() {
            if (!this.filterBy) return this.mails;
            const txt = this.filterBy.filterByTxt.toLowerCase();
            return this.mails.filter(mail => (mail.name.toLowerCase().includes(txt) || 
            mail.subject.toLowerCase().includes(txt) ||  mail.body.toLowerCase().includes(txt))
             &&
            (mail.isRead && this.filterBy.isRead || !mail.isRead && this.filterBy.isUnRead)
            )
        },
    },
    methods: {
        deleteMail(mailId){
            console.log('in app:',mailId);
            mailService.remove(mailId)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        // marekdReadMail(mail) {
        //     mailService.save(mail)
        // }
    },
    created() {
        // console.log('created');
        mailService.getMails()
        .then(mails => this.mails = mails)
    },
    components: {
        mailList,
        mailDetails,
        mailStatus,
        mailSideNav,
        mailFilter
        // mailSend

    }
}