import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import News from '../views/News.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Pokemon from '../views/Pokemon.vue';
import { useAuth } from '../composables/useAuth';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/news', name: 'News', component: News },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: Pokemon,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth();

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/about');
  } else {
    next();
  }
});

export default router;
