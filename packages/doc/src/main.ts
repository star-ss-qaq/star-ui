import { createApp } from "vue";
import App from "./App.vue";
import StarUi from "@thestarweb/ui";
import i18n from "@/lang/index";
import router from "@/router"


createApp(App).use(i18n).use(StarUi).use(router).mount('#app');