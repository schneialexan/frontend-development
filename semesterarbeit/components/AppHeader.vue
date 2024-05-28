<template>
  <div>
    <Title>FrontEnd ToDo-List</Title>
    <div class="flex items-center md:justify-between justify-center">
      <div class="flex items-center">
        <UButton variant="transparent" :icon="colorModeIcon" @click="toggleDark" />
        <UButton v-if="user" class="u-text-white" variant="transparent" @click="logout">
          Logout
        </UButton>
        <span v-if="user">
          Logged in as: {{ user.email }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const colorModeIcon = computed(() => colorMode.preference === 'dark' ? 'i-heroicons-outline-moon' : 'i-heroicons-outline-sun')

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}
</script>

<style scoped>
.header {
  position: fixed;
  top: -100px; /* Start off-screen */
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  transition: top 0.3s ease-out; /* Smooth transition */
}

.header.visible {
  top: 0; /* Bring header into view */
}
</style>
