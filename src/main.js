import { createApp } from "vue";
import App from "./App.vue";
import "./css/main.css";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import vueClickOutsideElement from 'vue-click-outside-element'
// import { vue3Debounce } from "vue-debounce";
import vueDebounce, { PluginConfig, debounce } from 'vue-debounce'
import MISAEnum from "./lib/enum";
import resource from "./lib/resource";
import MCombobox from "@/components/bases/combobox/MCombobox.vue";
import MInput from "@/components/bases/input/MInput.vue";
import MButton from "@/components/bases/Button/MButton.vue";
import MCheckbox from "@/components/bases/input/MCheckbox.vue";



const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(vueClickOutsideElement)
app.use<PluginConfig>(vueDebounce, { lock: true, defaultTime: '5000ms', listenTo: 'keyup' });
app.component("MCombobox", MCombobox);
app.component("MInput", MInput);
app.component("MButton", MButton);
app.component("MCheckbox", MCheckbox);
app.directive(debounce({ lock: true }));
app.config.globalProperties.MISAEnum = MISAEnum;
app.config.globalProperties.resource = resource;
app.mount("#app");
