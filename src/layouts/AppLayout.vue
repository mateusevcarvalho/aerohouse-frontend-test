<template>
  <div>
    <header>
      <div class='bg-primary p-4 text-white text-center'>
        <h1>Post-List</h1>
      </div>
      <div class='bg-primary-dark text-white'>
        <nav class='navbar navbar-expand-lg'>
          <div class='container-fluid ms-5'>
            <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'
                    aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
              <span class='navbar-toggler-icon'></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
              <ul class='navbar-nav'>
                <li class='nav-item'>
                  <router-link class='nav-link' :class='{"active": $router.currentRoute.value.name === "posts"}'
                               :to='{name: "posts"}'>
                    Posts
                  </router-link>
                </li>
                <li class='nav-item'>
                  <router-link class='nav-link' :class='{"active": $router.currentRoute.value.name === "users"}'
                               :to='{name: "users"}'>
                    Users
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <main class='container mt-5'>
      <slot></slot>
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .nav-item a {
    color: #004563;
    font-weight: bold;
    font-size: 30px;
    margin-right: 80px;
  }

  .active {
    color: white !important;
  }
</style>