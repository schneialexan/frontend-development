import { ref, watch } from 'vue'
import { type Database } from '../types/database.types'


export const useTaskStore = defineStore('taskStore', () => {

    const client = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    const loading = ref(false)
    const newTask = ref('')
    const activeList = ref(0)
    const activeListName = ref<string>('')

    const todoLists = ref<List[]>([])
    const tasks = ref<Task[]>([])
    const errorMessage = ref<string | null>(null)

    async function fetchData() {
        if (!user.value) return

        loading.value = true
        try {
            await fetchTodoLists()
            await fetchTasks(activeList.value || todoLists.value[0]?.id)
        } catch (error) {
            handleError('Error fetching data', error)
        } finally {
            loading.value = false
        }
    }

    async function fetchTodoLists() {
        const { data, error } = await client.from('lists').select('id, name').eq('user_id', user.value.id)
        if (error) {
            handleError('Error fetching todo lists', error)
        }
        todoLists.value = data || []
    }

    async function fetchTasks(listId: number) {
        if (!listId) return
        const { data, error } = await client.from('tasks').select('id, task, is_completed, list_id')
            .eq('user_id', user.value.id)
            .eq('list_id', listId)
            .order('created_at')
        if (error) {
            handleError('Error fetching tasks', error)
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
                errorMessage.value = 'Error adding task: ' + error.message
            }

            await fetchTasks(activeList.value)
            newTask.value = ''
        } catch (error) {
            handleError('Error adding task', error)
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
            errorMessage.value = 'Error removing task: ' + error
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
                handleError('Error creating new list', error)
            } else {
                todoLists.value.push(data)
                activeListName.value = listName
                await fetchTasks(data.id)
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

    async function removeList(list: List) {
        if (confirm(`Do you really want to remove the list "${list.name}"?`)) {
            try {
                await client.from('tasks').delete().match({ list_id: list.id })
                await client.from('lists').delete().match({ id: list.id })
                todoLists.value = todoLists.value.filter(l => l.id !== list.id)
                await fetchTasks(todoLists.value[0]?.id)
            } catch (error) {
                handleError('Error removing list', error)
            }
        }
    }

    // function which handles errors
    function handleError(message: string, error: any) {
        console.error(message, error)
        errorMessage.value = message + ': ' + error
    }

    return {
        user,
        loading,
        newTask,
        activeList,
        activeListName,
        todoLists,
        tasks,
        errorMessage,
        fetchData,
        addTask,
        editTask,
        completeTask,
        removeTask,
        createNewList,
        editList,
        removeList,
        fetchTasks
    }
})