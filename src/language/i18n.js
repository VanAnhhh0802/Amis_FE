import Vue from "vue";
import { createI18n } from "vue-i18n";
// import vnMessages from "./vi";
Vue.use(VueI18n);

const messages = {
  vi: {
    message: "xin  chao",
  },
  en: {
    message: "hello",
  },
};

const i18n = createI18n({
  locale: "vi", // set locale
  fallbackLocale: "vi", // set fallback locale
  messages,
});

export default i18n;
