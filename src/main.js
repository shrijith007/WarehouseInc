import { createApp } from 'vue';
import App from './App.vue';
import router from "./Assets/Router"
import store from "./Assets/Store"
import Basecard from "./Component/Basecard.vue"


const app=createApp(App);




app.component("basecard",Basecard)
app.use(store);
app.use(router);
app.mount('#app');
