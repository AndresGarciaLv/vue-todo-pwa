<template>
  <li class="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md transition-all duration-300">
    <div class="flex items-center gap-4 w-full">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="h-6 w-6 rounded-full border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
      />
      <input
        v-if="isEditing"
        ref="editInput"
        type="text"
        v-model="editText"
        @blur="finishEditing"
        @keyup.enter="finishEditing"
        @keyup.escape="cancelEditing"
        class="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 -m-2"
      />
      <span
        v-else
        @dblclick="startEditing"
        :class="{ 'line-through text-gray-400': todo.completed }"
        class="w-full cursor-pointer"
      >
        {{ todo.text }}
      </span>
    </div>
    <button @click="$emit('delete', todo.id)" class="ml-4 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  </li>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { Todo } from '../composables/useTodos';

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'delete', id: number): void;
  (e: 'update', id: number, text: string): void;
}>();

const isEditing = ref(false);
const editText = ref('');
const editInput = ref<HTMLInputElement | null>(null);

async function startEditing() {
  isEditing.value = true;
  editText.value = props.todo.text;
  await nextTick();
  editInput.value?.focus();
}

function finishEditing() {
  if (isEditing.value && editText.value.trim() && editText.value.trim() !== props.todo.text) {
    emit('update', props.todo.id, editText.value.trim());
  }
  isEditing.value = false;
}

function cancelEditing() {
  isEditing.value = false;
}
</script>
