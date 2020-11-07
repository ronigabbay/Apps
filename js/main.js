import {myRouter} from './routes.js'
import appsusHeader from './cmps/appsus-header.cmp.js'


const options = {
    el: '#app',
    router:myRouter,
    template: `
        <section>
            <appsus-header></appsus-header>
            <main>
                <router-view></router-view>
            </main>
        </section>
    `,
    components:{
        appsusHeader
    }

}



const app = new Vue(options);