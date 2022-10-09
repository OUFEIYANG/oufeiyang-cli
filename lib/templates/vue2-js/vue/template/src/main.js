import Vue from 'vue'
import App from './App.vue'
<%_ if (hasRouter) { _%>
import router from "./router"
<%_ } _%>
<%_ if (hasVuex) { _%>
import store from "./store"
<%_ } _%>



new Vue({
    <%_ if (hasRouter) { _%>
     router,
     <%_ } _%>
     <%_ if (hasVuex) { _%>
    store,
    <%_ } _%>
    render: (h) => h(App),
}).$mount('#app')