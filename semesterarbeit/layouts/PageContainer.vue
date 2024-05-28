<template>
  <div class="loginform">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style>
.loginform {
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

<script lang="ts">
export default {
  name: 'PageContainer',
}
</script>