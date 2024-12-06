<template>
  <div class="todo-container">
    <h1 class="title">Ma Liste de Tâches</h1>

    <div class="add-todo">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Ajouter une nouvelle tâche..."
        class="todo-input"
      />
      <BaseButton @click="addTodo">
        <i class="fas fa-plus"></i>
        Ajouter
      </BaseButton>
    </div>

    <TodoFilters
      v-if="todos.length"
      :current-filter="currentFilter"
      :show-clear-button="todos.length > 0"
      @change="currentFilter = $event"
      @clear-all="clearAllTodos"
    />

    <div class="todo-list-container">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle-complete="toggleComplete"
        @delete="removeTodo"
        @update="updateTodo"
      />
      <p v-if="filteredTodos.length === 0" class="empty-state">
        {{ emptyStateMessage }}
      </p>
    </div>
    <Footer v-if="filteredTodos.length" :nbTodos="filteredTodos.length" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import TodoItem from "./TodoItem.vue";
import BaseButton from "./BaseButton.vue";
import Footer from "./Footer.vue";
import TodoFilters from "./TodoFilters.vue";

const STORAGE_KEY = "vue-todo-list";

const newTodo = ref("");
const todos = ref([]);
const currentFilter = ref("all");

// Filtrer les todos
const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.completed);
    case "completed":
      return todos.value.filter((todo) => todo.completed);
    default:
      return todos.value;
  }
});

// Message d'état vide
const emptyStateMessage = computed(() => {
  switch (currentFilter.value) {
    case "active":
      return "Aucune tâche à faire";
    case "completed":
      return "Aucune tâche terminée";
    default:
      return "Aucune tâche";
  }
});

// Charger les todos depuis localStorage avec validation
const loadTodos = () => {
  const savedTodos = localStorage.getItem(STORAGE_KEY);
  if (savedTodos) {
    try {
      const parsedTodos = JSON.parse(savedTodos);
      // Valider que c'est un tableau et que chaque todo a les bonnes propriétés
      if (Array.isArray(parsedTodos)) {
        todos.value = parsedTodos.filter(
          (todo) =>
            todo &&
            typeof todo === "object" &&
            typeof todo.id === "number" &&
            typeof todo.text === "string" &&
            todo.text.trim() !== "" &&
            typeof todo.completed === "boolean"
        );
      } else {
        todos.value = [];
      }
    } catch (e) {
      console.error("Erreur lors du chargement des todos:", e);
      todos.value = [];
    }
  }
};

// Sauvegarder les todos dans localStorage
const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
};

// Charger les todos au montage du composant
onMounted(() => {
  loadTodos();
});

// Observer les changements dans todos et sauvegarder
watch(
  todos,
  () => {
    saveTodos();
  },
  { deep: true }
);

// Améliorer la validation lors de l'ajout
const addTodo = () => {
  const trimmedText = newTodo.value.trim();
  if (trimmedText) {
    const todo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };
    todos.value.push(todo);
    newTodo.value = "";
  }
};

const toggleComplete = (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

// Ajouter la fonction pour supprimer toutes les tâches
const clearAllTodos = () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) {
    todos.value = [];
  }
};

const updateTodo = ({ id, text }) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.text = text;
  }
};
</script>

<style scoped>
.todo-container {
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 2rem;
  width: 100%;
  min-width: 200px;
}

.title {
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.add-todo {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.todo-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 100px;
}

.empty-state {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 1rem;
}
</style>
