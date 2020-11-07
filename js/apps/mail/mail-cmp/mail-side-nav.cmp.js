

export default {
  props: [''],
  template: `
    <section class="mail-side-nav">
        <router-link class="compose" to="/send" exact><img src="../../../../assets/icons/plus.ico"> Compose</router-link>
        <router-link class="inbox" to="/mail" exact><img src="../../../../assets/icons/inbox.ico"> Inbox</router-link>
        <router-link class="sentMail" to="/send" exact><img src="../../../../assets/icons/send-mail.ico"> Sent Mail</router-link>
        <span><img src="../../../../assets/icons/star.ico"> Starred</span> 
       <span><img src="../../../../assets/icons/edit.ico"> Drafts</span>
    </section>
    `
}