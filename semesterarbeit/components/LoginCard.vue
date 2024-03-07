<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="u-bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <div>
        <div>
          <div>
            <UInput class="inputField" type="email" placeholder="Your email" v-model="email" name="email" variant="white"/>
          </div>
          <div>
            <UInput class="inputField mt-2" type="password" placeholder="Your password" v-model="password" name="password" variant="white"/>
          </div>
          <div>
            <UButton class="mt-2" block label="Login" variant="black"
              @click="auth.signInWithPassword({ email, password })" />
          </div>
        </div>
        <div class="relative mt-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 u-bg-white text-gray-500"> Connect with </span>
          </div>
        </div>
        <div >
          <UButton class="mt-3" icon="i-mdi-github" block label="Github" variant="black"
            @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })" />
        </div>
        <div>
          <UButton class="mt-3" icon="i-mdi-google" block label="Google" variant="black"
            @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const email = ref('')
const password = ref('')

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/tasks')
  }
})

const props = defineProps({
  name: {
    type: String,
    required: false
  }
})

</script>
