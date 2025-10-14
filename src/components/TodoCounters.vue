<template>
  <div class="flex items-center justify-center gap-4 my-4">
    <div class="flex items-center gap-2 text-sm text-gray-600 bg-gray-200 px-3 py-2 rounded-full">
      <span class="font-bold text-gray-700">{{ todos.length }}</span>
      <span>{{ todos.length === 1 ? 'tarea' : 'tareas' }}</span>
    </div>
    <div class="flex items-center gap-2 text-sm text-yellow-800 bg-yellow-100 px-3 py-2 rounded-full">
      <span class="font-bold text-yellow-900">{{ activeTodoCount }}</span>
      <span>{{ activeTodoCount === 1 ? 'pendiente' : 'pendientes' }}</span>
    </div>
    <div class="flex items-center gap-2 text-sm text-green-800 bg-green-100 px-3 py-2 rounded-full">
      <span class="font-bold text-green-900">{{ completedTodoCount }}</span>
      <span>{{ completedTodoCount === 1 ? 'completada' : 'completadas' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Todo } from '../composables/useTodos';

const props = defineProps<{
  todos: Todo[];
}>();

const activeTodoCount = computed(() => {
  return props.todos.filter(todo => !todo.completed).length;
});

const completedTodoCount = computed(() => {
  return props.todos.filter(todo => todo.completed).length;
});
</script>
