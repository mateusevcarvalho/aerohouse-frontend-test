import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },

    addPost(state, post) {
      const maxId = Math.max(...state.posts.map(p => p.id));
      const id = maxId + 1;

      state.posts.push({ ...post, id });
    },

    updatePost(state, post) {
      const index = state.posts.findIndex(p => p.id === post.id);
      state.posts[index] = post;
    },

    deletePost(state, postId) {
      const index = state.posts.findIndex(p => p.id === postId);
      state.posts.splice(index, 1);
    }
  },
  actions: {
    async getPosts(context, userId = null) {
      try {
        const filter = userId ? `userId=${userId}` : '';
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?${filter}`);
        context.commit('setPosts', data);
      } catch (e) {
        console.error(e);

        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao carregar os posts.',
          icon: 'error'
        });
      }
    },

    async save(context, formData) {
      try {
        if (!formData.id) {
          const { data } = await axios.post(`https://jsonplaceholder.typicode.com/posts`, formData);
          context.commit('addPost', data);
        } else {
          const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, formData);
          context.commit('updatePost', data);
        }

        Swal.fire({
          icon: 'success',
          title: 'Post salvo com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (e) {
        console.error(e);

        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao salvar o post.',
          icon: 'error'
        });
      }
    },

    async destroy(context, postId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        context.commit('deletePost', postId);
        Swal.fire({
          icon: 'success',
          title: 'Post deletado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (e) {
        console.error(e);

        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao deletar o post.',
          icon: 'error'
        });
      }
    }
  }
};

export default posts;