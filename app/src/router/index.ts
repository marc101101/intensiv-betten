import Vue from "vue";
import Router from "vue-router";

import Home from "../layouts/Home.vue";
import Impressum from "../layouts/Impressum.vue";
import NotFound from "../layouts/NotFound.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: " ",
    component: Home
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: Impressum
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
