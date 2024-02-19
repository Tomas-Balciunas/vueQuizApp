import { createRouter, createWebHistory } from "vue-router";
import { validateParams, Query } from "./composables/helpers";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("./views/Home.vue"),
  },
  {
    name: "quiz",
    path: "/quiz",
    component: () => import("./views/Quiz.vue"),
  },
  {
    name: "results",
    path: "/results",
    component: () => import("./views/Results.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _) => {
  if (to.name == "quiz") {
    if (Object.keys(to.query).length === 0) {
      return { name: "home" }
    }

    if (!validateParams(to.query as Query)) {
      return { name: "home" }
    }
  }
});

export default router;
