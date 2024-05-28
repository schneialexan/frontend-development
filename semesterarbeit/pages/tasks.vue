<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <TaskContent />
    <DrawerSidebar />
  </div>
</template>

<script setup lang="ts">
import TaskContent from '~/components/TaskContent.vue';
import DrawerSidebar from '~/components/DrawerSidebar.vue';
</script>