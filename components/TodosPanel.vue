<script setup lang="ts">
  const { data: tasks, refresh } = await useFetch('/api/todos')
  const newtask = ref('')
  const showInput = ref<Boolean>(false)
  const currentTaskId = ref<number | null>(null)
  const currentTaskTitle = ref('')
  const headTitle = ref<string>('Add your new task')
  async function addTodo (){
    if (!newtask.value.trim()) return
    await $fetch('/api/todos', {
      method: 'POST',
      body: {
        title: newtask.value
      }
    })
    newtask.value = ''
    await refresh()
  }

  async function deleteTask(id: number) {
    try {
      await $fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })
      await refresh()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }
  async function updateCompletedTask(id: number) {
    try {
      const task = tasks.value?.find((task: any) => task.id === id)

      if (!task) {
        console.error('Task not found')
        return
      }
      const newCompletedStatus = task.completed === 1 ? 0 : 1

      if (!task) throw new Error('Task not found')
      await $fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        body: {
          completed: newCompletedStatus
        }
      })
      await refresh()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }
  function editTask(id: number, title: string) {
    currentTaskId.value = id
    currentTaskTitle.value = title
    showInput.value = true
    headTitle.value = 'Update your task'
  }
  async function updateTask() {
    if (currentTaskId.value === null || !currentTaskTitle.value.trim()) return

    try {
      await $fetch(`/api/todos/${currentTaskId.value}`, {
        method: 'PATCH',
        body: {
          title: currentTaskTitle.value
        }
      });
      showInput.value = false
      currentTaskId.value = null
      currentTaskTitle.value = ''
      headTitle.value = 'Add your task'
      await refresh()
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }
</script>

<template>
  <div>
    <div class="flex items-center justify-center w-screen h-screen font-medium">
      <div class="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
        <div class="max-w-full p-8 bg-white rounded-lg shadow-lg w-[30rem]">
          <div class="flex items-center mb-6">
            <svg class="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h4 class="font-semibold ml-3 text-lg">{{ headTitle }}</h4>
          </div>
          <form @submit.prevent="addTodo">
            <div class="mb-10 flex gap-4 w-full" v-if="!showInput">
              <input 
                v-model="newtask" 
                class="w-full py-1 rounded-md outline-none px-4 border border-gray-300" 
                placeholder="Add a new task"
              >
              <button 
                type="submit"
                @click="addTodo"
                class="py-1 bg-indigo-500 text-white px-3 rounded-sm"
              >
                Send
              </button>
            </div>
            <div
              class="w-full flex justify-between gap-4"
              v-if="showInput"
            >
              <input 
                class="w-full py-1 rounded-md outline-none px-4 border border-gray-300" 
                type="text"
                placeholder="Modifier la tâche"
                id=""
                v-model="currentTaskTitle"
              >
              <button 
                class="py-1 bg-indigo-500 text-white px-3 rounded-sm"
                @click="updateTask"
              >
                Modifier
              </button>
            </div>
            <div 
              v-for="{title, id, completed} of tasks"
              :key="id"
              v-else
              >
              <div
                @click="updateCompletedTask(id)"
                class="flex justify-between gap-4"
                @dblclick="editTask(id, title)"
              >
                <input class="hidden" type="checkbox" id="task_1" checked>
                <label class="flex items-center w-full h-10 px-2 transition-all duration-100 rounded cursor-pointer hover:bg-gray-100" for="task_1">
                  <span class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
                    <IconsIconCheckBox/>
                  </span>
                  <span 
                    :class="{'line-through': completed === 0}" 
                    class="ml-4 text-sm"
                  >
                    {{ title }}
                  </span>
                </label>	
                <div class="flex gap-2">
                  <button 
                    @click="deleteTask(id)"
                    class="text-red-500"
                  >
                    <IconsIconDelete/>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
input[type=checkbox]:checked+label span:first-of-type {
	background-color: #10B981;
	border-color: #10B981;
	color: #fff;
}
</style>
