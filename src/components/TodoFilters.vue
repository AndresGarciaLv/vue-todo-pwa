<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-md mb-6">
    <div class="flex items-center gap-2 text-sm text-gray-500">
      <span>{{ activeTodoCount }}</span>
      <span>{{ activeTodoCount === 1 ? 'tarea pendiente' : 'tareas pendientes' }}</span>
    </div>
    <div class="flex items-center gap-2">
      <button
        @click="$emit('update:filter', 'all')"
        :class="{ 'text-teal-500 font-semibold': filter === 'all' }"
        class="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
      >
        Todas
      </button>
      <button
        @click="$emit('update:filter', 'active')"
        :class="{ 'text-teal-500 font-semibold': filter === 'active' }"
        class="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
      >
        Activas
      </button>
      <button
        @click="$emit('update:filter', 'completed')"
        :class="{ 'text-teal-500 font-semibold': filter === 'completed' }"
        class="px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
      >
        Completadas
      </button>
    </div>
    <div class="relative">
      <input
        type="text"
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        placeholder="Buscar..."
        class="pl-8 pr-3 py-2 w-full sm:w-auto text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
      />
      <svg class="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Filter } from '../composables/useTodos';

defineProps<{
  filter: Filter;
  searchQuery: string;
  activeTodoCount: number;
}>();

defineEmits<{
  (e: 'update:filter', filter: Filter): void;
  (e: 'update:searchQuery', query: string): void;
}>();
</script>
