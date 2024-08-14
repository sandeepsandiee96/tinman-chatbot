
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import LoginScreen from './components/LoginScreen.vue';
import ChatScreen from './components/ChatScreen.vue';

const routes = [
  { path: '/login', component: LoginScreen },
  { path: '/chat', component: ChatScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
