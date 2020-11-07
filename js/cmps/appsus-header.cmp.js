export default {
    template: `
    <section class="app-header container">
    <router-link class="logo" to="/" exact >Appsus</router-link>
        <div class="header-container-link">
            <router-link to="/" exact>Home</router-link>
            <router-link to="/mail" exact>Mail</router-link>
            <router-link to="/note">notes</router-link>
            
        </div>
    </section>
    `
}