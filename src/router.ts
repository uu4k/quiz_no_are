import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Room from "./views/Room.vue";
import Presentation from "./views/Presentation.vue";
import Manage from "./views/Manage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/rooms",
      name: "rooms",
      component: Room
    },
    {
      path: "/rooms/:roomId",
      name: "room",
      component: Room
    },
    {
      path: "/rooms/:roomId/presentation",
      name: "presentation",
      component: Presentation
    },
    {
      path: "/rooms/:roomId/manage",
      name: "manage",
      component: Manage
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
