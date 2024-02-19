import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import axios from "axios";
import router from "./router";
import VueAxios from "vue-axios";
import App from "./App.vue";
import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
const app = createApp(App);

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
