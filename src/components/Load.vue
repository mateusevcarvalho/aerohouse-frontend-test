<template>
  <div class='loading' v-if='load'>
    <div class='loading-content'>
      <div :class='["spinner-border", "align-self-center", "loader-lg", "text-primary"]' />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    load: { type: Boolean, default: false }
  });
</script>
