<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content u-bg-black">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      <div class="w-full my-[200px]">
        <template v-if="todoLists?.length > 0">
          <h1 class="mb-12 text-6xl font-bold u-text-white">{{ activeListName }}</h1>
          <form class="flex gap-2 my-2" @submit.prevent="tasksStore.addTask">
            <UInput v-model="newTask" :loading="loading" class="w-full" size="xl" variant="white" type="text"
              name="newTask" placeholder="Make a coffee" autofocus autocomplete="off" />
            <UButton type="submit" variant="white">
              Add
            </UButton>
          </form>
          <UCard v-if="tasks?.length > 0" body-class="px-6 py-2 overflow-hidden">
            <ul>
              <li v-for="task of tasks" :key="task.id" class="border-b border-gray-200 divide-y divide-gray-200">
                <div class="py-2">
                  <UFormGroup
                    :label-class="`block font-medium ${task.is_completed ? 'line-through u-text-gray-500' : 'u-text-gray-700'}`"
                    :label="task.task" :name="String(task.id)" wrapper-class="flex items-center justify-between w-full">
                    <div class="flex items-center justify-between">
                      <!-- edit task -->
                      <div @click="tasksStore.editTask(task)">
                        <UButton class="text-gray-600" size="sm" variant="transparent"
                          icon="i-heroicons-outline-pencil" />
                      </div>

                      <div @click="tasksStore.completeTask(task)">
                        <UToggle v-model="task.is_completed" :name="String(task.id)" icon-off="heroicons-solid:x"
                          icon-on="heroicons-solid:check" />
                      </div>
                      <UButton class="ml-3 text-red-600 trashbutton" size="sm" variant="transparent"
                        icon="i-heroicons-outline-trash" @click="tasksStore.removeTask(task)" />
                    </div>
                  </UFormGroup>
                </div>
              </li>
            </ul>
          </UCard>
        </template>
        <template v-else>
          <UCard body-class="px-6 py-2">
            <p class="u-text-gray-500">Please open a new todo-list.</p>
          </UCard>
        </template>
      </div>
    </div>
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
          <button @click="tasksStore.createNewList" class="btn btn-primary mt-4" id="new-task-list-button">New
            List</button>
        </li>
      </ul>

    </div>
    <Toast v-if="errorMessage" :message="errorMessage" @close="errorMessage = ''" />
  </div>
</template>

<style scoped>
.drawer-content {
  padding: 1rem;
}

.trashbutton:hover {
  color: red;
}
</style>

<script setup lang="ts">
import { watch } from 'vue'
import Toast from '~/components/Toast.vue'

// Component
const tasksStore = useTaskStore();
const {
  user,
  loading,
  newTask,
  activeList,
  activeListName,
  todoLists,
  tasks,
  errorMessage } = storeToRefs(tasksStore);

tasksStore.fetchData();

// Fetch todo lists and tasks
onMounted(() => {
  tasksStore.fetchData();
})
watch(user, () => {
  tasksStore.fetchData();
})

</script>