<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodos } from './composables/useTodos';
import TodoFilters from './components/TodoFilters.vue';
import TodoItem from './components/TodoItem.vue';
import EmptyState from './components/EmptyState.vue';
import SplashScreen from './components/SplashScreen.vue';

// Splash Screen: Show only on first visit per session
const showSplash = ref(!sessionStorage.getItem('hasSeenSplash'));

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
  if (showSplash.value) {
    // If splash is shown, hide it after a delay and set flag in session storage
    setTimeout(() => {
      showSplash.value = false;
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 2500);
  }

  // Listen for PWA install prompt
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
  <Transition name="fade">
    <SplashScreen v-if="showSplash" />
  </Transition>

  <div v-if="!showSplash" class="font-sans bg-slate-100 min-h-screen text-gray-800">
    <main class="max-w-2xl mx-auto py-12 px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-slate-800">PWA To-Do App</h1>
        <button 
          v-if="showInstallButton" 
          @click="handleInstallClick"
          class="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-md hover:scale-105"
        >
          Instalar App
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center space-x-4">
        <input
          v-model="newTodoText"
          @keyup.enter="handleAddTodo"
          type="text"
          placeholder="¿Qué necesitas hacer?"
          class="w-full text-lg px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        />
        <button
          @click="handleAddTodo"
          class="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors shadow-md disabled:bg-teal-300 disabled:cursor-not-allowed"
          :disabled="!newTodoText.trim()"
        >
          Agregar
        </button>
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

      <div class="mt-12 text-center">
        <p class="text-sm text-gray-500">Creado por:</p>
        <p class="text-lg text-gray-700 font-semibold">Andrés García Leyva</p>
        <p class="text-lg text-gray-700 font-semibold">Juan Diego Mendoza Gutierrez</p>
        <p class="mt-2 px-3 py-1 inline-block bg-gray-200 text-gray-800 text-sm rounded-full">IDYGS101</p>
      </div>

    </main>
  </div>
</template>
