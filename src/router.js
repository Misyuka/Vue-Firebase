import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    component: () => import("./components/Home")
  },
  {
    path: "/mails",
    component: () => import("./components/AddMailing")
  },
  {
    path: "/meetings",
    component: () => import("./components/AddMeeting")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;