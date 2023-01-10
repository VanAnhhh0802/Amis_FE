import { createApp } from "vue";
import App from "./App.vue";
import "./css/main.css";
import axios from "axios";
import VueAxios from "vue-axios";
import MISAEnum from "./lib/enum";
import resource from "./lib/resource";

const app = createApp(App);
app.use(VueAxios, axios);
app.config.globalProperties.MISAEnum = MISAEnum;
app.config.globalProperties.resource = resource;
// app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");
