<template>
  <div class='p-3'>
    <load :load='load' />
    <div class='row mb-5'>
      <div class='col-lg-3 col-12'>
        <select class='form-select form-select-lg' v-model='user' @change='onChange'>
          <option v-for='(user, index) in $store.state.users.users' :value='user' :key='index'>
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>

    <div class='row'>
      <div class='col-md-4'>
        <label>Name</label>
        <input type='text' class='form-control form-control-lg' v-model='formData.name'>
      </div>
      <div class='col-md-4 mt-5 mt-md-0'>
        <label>Username</label>
        <input type='text' class='form-control form-control-lg' v-model='formData.username'>
      </div>
      <div class='col-md-4 mt-5 mt-md-0'>
        <label>Email</label>
        <input type='text' class='form-control form-control-lg' v-model='formData.email'>
      </div>
      <div class='col-md-4 mt-5'>
        <label>Phone</label>
        <input type='text' class='form-control form-control-lg' v-model='formData.phone'>
      </div>
      <div class='col-md-4 mt-5'>
        <label>Street</label>
        <input type='text' class='form-control form-control-lg' v-model='formData.address.street'>
      </div>
      <div class='col-md-4 mt-5'>
        <label>City</label>
        <input type='text' class='form-control form-control-lg' v-model='formData.address.city'>
      </div>
    </div>

  </div>
</template>

<script setup>

  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import Load from '../../components/Load.vue';

  const store = useStore();
  const load = ref(false);
  const user = ref(null);
  const formData = ref({
    id: 1,
    name: null,
    username: null,
    email: null,
    address: {
      street: null,
      suite: null,
      city: null,
      zipcode: null,
      geo: {
        lat: null,
        lng: null
      }
    },
    phone: null,
    website: null,
    company: {
      name: null,
      catchPhrase: null,
      bs: null
    }
  });

  onMounted(async () => {
    load.value = true;
    if (!store.state.users.users.length) {
      await store.dispatch('users/getUsers');
    }

    if (store.state.users.users.length) {
      user.value = store.state.users.users[0];
    }

    load.value = false;
  });

  const onChange = () => {
    formData.value = user.value;
  };

</script>

<style scoped>

</style>