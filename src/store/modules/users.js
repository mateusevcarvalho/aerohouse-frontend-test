import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const users = {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    async getUsers(context) {
      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        context.commit('setUsers', data);
      } catch (e) {
        console.error(e);

        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao carregar os usuários.',
          icon: 'error',
        });
      }
    }
  }
};

export default users;