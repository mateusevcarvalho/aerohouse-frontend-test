import { createStore } from 'vuex';
import posts from './modules/posts.js';
import users from './modules/users.js';

const store = createStore({
  modules: {
    posts,
    users
  }
});

export default store;