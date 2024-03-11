<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      <div class="w-full my-[200px]">
        <h1 class="mb-12 text-6xl font-bold u-text-white">{{ activeListName }}</h1>
        <form class="flex gap-2 my-2" @submit.prevent="addTask">
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
                    <div @click="editTask(task)">
                      <UButton class="text-gray-600" size="sm" variant="transparent"
                        icon="i-heroicons-outline-pencil" />
                    </div>

                    <div @click="completeTask(task)">
                      <UToggle v-model="task.is_completed" :name="String(task.id)" icon-off="heroicons-solid:x"
                        icon-on="heroicons-solid:check" />
                    </div>
                    <UButton class="ml-3 text-red-600" size="sm" variant="transparent" icon="i-heroicons-outline-trash"
                      @click="removeTask(task)" />
                  </div>
                </UFormGroup>
              </div>
            </li>
          </ul>
        </UCard>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold mb-4">ToDo-Lists:</h2>
          <li v-for="list in todoLists" :key="list.id" @click="fetchTasks(list.id)">
            <div class="flex justify-between items-center">
              <a :href="`#${list.id}`" :class="{ 'text-blue-500': activeList === list.id }">{{ list.name }}</a>
              <button @click="editList(list)" class="text-gray-600 ml-2" title="Edit list">
                <i class="i-heroicons-outline-pencil"></i> </button>
            </div>
          </li>
        </div>
        <li>
          <button @click="createNewList" class="btn btn-primary mt-4">New List</button>
        </li>
      </ul>

    </div>
  </div>
</template>

<style lang="postcss">
ul>li:last-child {
  @apply border-b-0;
}
</style>

<script setup lang="ts">
import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

const loading = ref(false)
const newTask = ref('')
const activeList = ref(0)
const activeListName = ref<string>('')

const todoLists = ref<List[]>([])
const tasks = ref<Task[]>([])

// Fetch todo lists and tasks
onMounted(fetchData)
watch(user, fetchData)

async function fetchData() {
  if (!user.value) return

  loading.value = true
  try {
    await fetchTodoLists()
    await fetchTasks(activeList.value || todoLists.value[0]?.id)
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

async function fetchTodoLists() {
  const { data, error } = await client.from('lists').select('id, name').eq('user_id', user.value.id)
  if (error) {
    throw new Error('Error fetching todo lists: ' + error.message)
  }
  todoLists.value = data || []
}

async function fetchTasks(listId: number) {
  const { data, error } = await client.from('tasks').select('id, task, is_completed, list_id')
    .eq('user_id', user.value.id)
    .eq('list_id', listId)
    .order('created_at')
  if (error) {
    throw new Error('Error fetching tasks: ' + error.message)
  }
  tasks.value = data || []
  activeList.value = listId
  activeListName.value = todoLists.value.find(list => list.id === listId)?.name || ''
}
async function addTask() {
  if (newTask.value.trim().length === 0 || !activeList.value) return

  loading.value = true
  try {
    const { data, error } = await client.from('tasks')
      .upsert({
        user_id: user.value.id,
        task: newTask.value,
        is_completed: false,
        list_id: activeList.value
      })
      .select('id, task, is_completed, list_id')
      .single()

    if (error) {
      throw new Error('Error adding task: ' + error.message)
    }

    await fetchTasks(activeList.value)
    newTask.value = ''
  } catch (error) {
    console.error('Error adding task:', error)
  } finally {
    loading.value = false
  }
}

async function editTask(task: Task) {
  const newTask = prompt('Edit task:', task.task)
  if (newTask) {
    await client.from('tasks').update({ task: newTask }).match({ id: task.id })
    await fetchTasks(activeList.value)
  }
}

async function completeTask(task: Task) {
  await client.from('tasks').update({ is_completed: task.is_completed }).match({ id: task.id })
}

async function removeTask(task: Task) {
  try {
    await client.from('tasks').delete().match({ id: task.id })
    tasks.value = tasks.value.filter(t => t.id !== task.id)
  } catch (error) {
    console.error('Error removing task:', error)
  }
}

async function createNewList() {
  const listName = prompt('Enter a name for the new list')
  if (listName) {
    const { data, error } = await client.from('lists')
      .upsert({ user_id: user.value.id, name: listName })
      .select('id, name')
      .single()
    if (error) {
      console.error('Error creating new list:', error)
    } else {
      todoLists.value.push(data)
    }
  }
}

async function editList(list: List) {
  const newName = prompt('Edit list name:', list.name)
  if (newName) {
    await client.from('lists').update({ name: newName }).match({ id: list.id })
    await fetchTodoLists()
    activeListName.value = newName
  }
}

</script>
