<template>
  <div class='p-3'>
    <load :load='load' />
    <div class='row mb-5'>
      <div class='col-lg-3 col-12'>
        <select class='form-select form-select-lg' v-model='userId'>
          <option v-for='(user, index) in $store.state.users.users' :value='user.id' :key='index'>
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>

    <div class='row g-5'>
      <div class='col-lg-6 col-12 pe-md-5'>
        <h1 class='app-title mb-4'>Posts</h1>

        <div class='card-post d-flex justify-content-between align-items-center mb-3'
             v-for='(post, index) in filterPosts' :key='index'>
          <div>{{ post.title }}</div>
          <div class='d-flex ms-3'>
            <svg-icon type='mdi' :path='mdiTrashCanOutline' size='50' class='text-primary me-3'
                      @click.prevent='onDelete(post.id)' />

            <svg-icon type='mdi' :path='mdiPencilOutline' size='50' class='text-primary-dark me-3'
                      @click.prevent='onEdit(post)' />
          </div>
        </div>
      </div>
      <div class='col-lg-6 col-12 ps-md-5'>
        <h1 class='app-title mb-4'>Create / Edit Post</h1>
        <form @submit.prevent='onSave'>
          <div class='row'>
            <div class='col-md-8'>
              <input type='text' class='form-control form-control-lg' placeholder='Title Post' v-model='formData.title'
                     required>
            </div>
            <div class='col-md-12 mt-4'>
              <textarea placeholder='Post Body' class='form-control form-control-lg' rows='4' v-model='formData.body' />
            </div>
            <div class='col-md-12 mt-4'>
              <button type='submit' class='btn btn-dark'>Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiPencilOutline, mdiTrashCanOutline } from '@mdi/js';
  import Load from '../../components/Load.vue';
  import Swal from 'sweetalert2/dist/sweetalert2.js';

  const store = useStore();
  const load = ref(false);
  const userId = ref(null);

  const formData = ref({
    id: null,
    title: null,
    body: null,
    userId: null
  });

  onMounted(async () => {
    load.value = true;
    if (!store.state.users.users.length) {
      await store.dispatch('users/getUsers');
    }

    if (store.state.users.users.length) {
      userId.value = store.state.users.users[0].id;

      if (!store.state.posts.posts.length) {
        await store.dispatch('posts/getPosts');
      }
    }

    load.value = false;
  });

  const filterPosts = computed(() => {
    return store.state.posts.posts.filter(p => p.userId === userId.value);
  });

  const onEdit = (post) => {
    formData.value = { ...post };
  };

  const onDelete = async (postId) => {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Deseja realmente deletar esse post?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Não Deletar`
    });

    if (isConfirmed) {
      load.value = true;
      await store.dispatch('posts/destroy', postId);
      load.value = false;
    }
  };

  const onSave = async () => {
    load.value = true;
    formData.value.userId = userId.value;
    await store.dispatch('posts/save', formData.value);
    formData.value = {
      id: null,
      title: null,
      body: null,
      userId: null
    };

    load.value = false;
  };
</script>

<style scoped>

</style>