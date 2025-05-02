import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import News from '../views/News.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/about', name: 'About', component: About },
  { path: '/news', name: 'News', component: News },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
