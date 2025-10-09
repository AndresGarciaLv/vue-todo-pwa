<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodos } from './composables/useTodos';
import TodoFilters from './components/TodoFilters.vue';
import TodoItem from './components/TodoItem.vue';
import EmptyState from './components/EmptyState.vue';

const { 
  filteredTodos, 
  filter, 
  searchQuery, 
  activeTodoCount, 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  updateTodo 
} = useTodos();

const newTodoText = ref('');

function handleAddTodo() {
  addTodo(newTodoText.value);
  newTodoText.value = '';
}

// PWA Install Prompt
const deferredPrompt = ref<any>(null);
const showInstallButton = ref(false);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
    showInstallButton.value = true;
  });
});

async function handleInstallClick() {
  if (!deferredPrompt.value) return;
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;
  if (outcome === 'accepted') {
    showInstallButton.value = false;
  }
  deferredPrompt.value = null;
}
</script>

<template>
  <div class="font-sans bg-gray-100 min-h-screen text-gray-800">
    <main class="max-w-2xl mx-auto py-12 px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800">Vue PWA To-Do</h1>
        <button 
          v-if="showInstallButton" 
          @click="handleInstallClick"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:scale-105"
        >
          Install App
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
        <input
          v-model="newTodoText"
          @keyup.enter="handleAddTodo"
          type="text"
          placeholder="What needs to be done?"
          class="w-full text-lg px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <TodoFilters 
        v-model:filter="filter" 
        v-model:searchQuery="searchQuery" 
        :activeTodoCount="activeTodoCount"
      />

      <ul v-if="filteredTodos.length" class="space-y-4">
        <TodoItem 
          v-for="todo in filteredTodos" 
          :key="todo.id" 
          :todo="todo"
          @toggle="toggleTodo"
          @delete="deleteTodo"
          @update="updateTodo"
        />
      </ul>

      <EmptyState v-else />

    </main>
  </div>
</template>
