<template>
  <div v-if="visible" class="toast toast-top toast-end">
    <div class="alert alert-error">
      <div>
        <span>{{ message }}</span>
        <button @click="hideToast" class="btn btn-sm btn-error ml-2">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const visible = ref(true)

    const hideToast = () => {
      visible.value = false
    }

    return {
      visible,
      hideToast,
      ...props,
    }
  },
})
</script>

<style scoped>
.toast-top {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
}
</style>