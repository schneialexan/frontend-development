<template>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
  
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between py-10">
        <div>
          <h2 class="text-lg font-semibold mb-4">ToDo-Lists:</h2>
          <li v-for="list in todoLists" :key="list.id" @click="tasksStore.fetchTasks(list.id)">
            <div class="flex justify-between items-center">
              <a :href="`#${list.id}`" :class="{ 'text-blue-500': activeList === list.id }">{{ list.name }}</a>
              <div>
                <UButton class="text-gray-600" size="sm" variant="transparent" icon="i-heroicons-outline-pencil"
                  @click="tasksStore.editList(list)" />
                <UButton class="text-red-600 trashbutton" size="sm" variant="transparent"
                  icon="i-heroicons-outline-trash" @click="tasksStore.removeList(list)" />
              </div>
            </div>
          </li>
        </div>
        <li>
          <button @click="tasksStore.createNewList" class="btn btn-primary mt-4" id="new-task-list-button">New List</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia';
  
  const tasksStore = useTaskStore();
  const { activeList, todoLists } = storeToRefs(tasksStore);
  </script>
  
  <style scoped>
  .trashbutton:hover {
    color: red;
  }
  </style>
  