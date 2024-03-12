<template>
  <div class="flex">
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  padding: 0 1rem;
}
</style>