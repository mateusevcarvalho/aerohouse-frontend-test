import { createRouter, createWebHistory } from 'vue-router';
import Posts from './views/posts/Posts.vue';
import Users from './views/users/Users.vue';
import NotFound from './views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'posts',
    component: Posts
  }, {
    path: '/users',
    name: 'users',
    component: Users
  }, {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;