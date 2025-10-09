import { ref, computed, watch } from 'vue';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = 'all' | 'active' | 'completed';

const STORAGE_KEY = 'vue-pwa-todos';

export function useTodos() {
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  const filter = ref<Filter>('all');
  const searchQuery = ref('');

  const filteredTodos = computed(() => {
    let filtered = todos.value;

    // Filter by completion status
    if (filter.value === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter.value === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Filter by search query
    if (searchQuery.value) {
      const lowerCaseQuery = searchQuery.value.toLowerCase();
      filtered = filtered.filter(todo => todo.text.toLowerCase().includes(lowerCaseQuery));
    }

    return filtered;
  });

  const activeTodoCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length;
  });

  function addTodo(text: string) {
    if (!text.trim()) return;
    todos.value.push({
      id: Date.now(),
      text: text.trim(),
      completed: false,
    });
    // Request notification permission and show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Nueva tarea añadida!', {
        body: text.trim(),
        icon: 'icons/icon-192x192.svg',
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New task added!', {
            body: text.trim(),
            icon: 'icons/icon-192x192.svg',
          });
        }
      });
    }
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      if (todo.completed) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('¡Tarea completada!', {
            body: todo.text,
            icon: 'icons/icon-192x192.svg',
          });
        }
      }
    }
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id);
  }

  function updateTodo(id: number, newText: string) {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.text = newText;
    }
  }

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    },
    { deep: true }
  );

  return {
    todos,
    filter,
    searchQuery,
    filteredTodos,
    activeTodoCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
}
