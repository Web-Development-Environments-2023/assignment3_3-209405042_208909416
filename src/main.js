import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
import { BFormCheckboxGroup } from 'bootstrap-vue'
Vue.component('b-form-checkbox-group', BFormCheckboxGroup)
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { BToast } from 'bootstrap-vue'
Vue.component('b-toast', BToast)
import { BInputGroup } from 'bootstrap-vue'
Vue.component('b-input-group', BInputGroup)
import { BInputGroupPrepend } from 'bootstrap-vue'
Vue.component('b-input-group-prepend', BInputGroupPrepend)
Vue.use(BootstrapVueIcons)
import { BNavbar } from 'bootstrap-vue'
Vue.component('b-navbar', BNavbar)
import { BadgePlugin } from 'bootstrap-vue'
Vue.use(BadgePlugin)
import { VBHover } from 'bootstrap-vue'
Vue.directive('b-hover', VBHover)
import { BFormRadioGroup } from 'bootstrap-vue'
Vue.component('b-form-radio-group', BFormRadioGroup)
import { BFormSpinbutton } from 'bootstrap-vue'
Vue.component('b-form-spinbutton', BFormSpinbutton)
import { FormTextareaPlugin } from 'bootstrap-vue'
Vue.use(FormTextareaPlugin)

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormFilePlugin,
  FormCheckboxPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormFilePlugin,
  FormCheckboxPlugin,

].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
axios.defaults.withCredentials=true;
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  firstname: localStorage.firstname,
  lastsearch: localStorage.lastsearch,
  login(username, firstname) {
    localStorage.setItem("username", username);
    this.username = username;
    localStorage.setItem("firstname", firstname.data);
    this.firstname = firstname.data
    localStorage.setItem("lastsearch", "");
  },
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastsearch");

    this.username = undefined;
    this.firstname = undefined;
    this.lastsearch = undefined;
  },
  search(lastsearch)
  {
    localStorage.setItem("lastsearch", lastsearch);
    this.lastsearch = lastsearch;
  }
};

new Vue({
  router,
  data() {
    const store =
    {
      shared_data: shared_data,
      server_domain: "http://localhost:3000"
    }
    return {
      store
  };
s},
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
