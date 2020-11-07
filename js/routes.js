import homePage from '../js/pages/home-page.cmp.js'
import mailApp from '../js/pages/mail-app.cmp.js'
import noteApp from '../js/pages/note-app.cmp.js'
import mailDetails from './apps/mail/mail-pages/mail-details.cmp.js'
import mailSend from './apps/mail/mail-cmp/mail-send.cmp.js'


const myRoutes = [
    {
        path:'/',
        component:homePage,
    },
    {
        path:'/mail',
        component:mailApp,
    },
    {
        path:'/send',
        component:mailSend,
    },
    {
        path:'/note',
        component:noteApp,
    },
    {
        path:'/mail/:mailId',
        component:mailDetails,
    }
    
]

export const myRouter = new VueRouter({ routes: myRoutes })
