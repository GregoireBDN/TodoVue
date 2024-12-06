<template>
  <li :class="['todo-item', { completed: todo.completed }]">
    <div class="todo-content">
      <label class="checkbox-container">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="$emit('toggle-complete', todo.id)"
        />
        <span class="checkmark"></span>
      </label>

      <div v-if="isEditing" class="edit-container">
        <input
          v-model="editedText"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
          @blur="handleBlur"
          ref="editInput"
          class="edit-input"
        />
        <div class="edit-actions">
          <BaseButton variant="primary" small @click="saveEdit">
            <i class="fas fa-check"></i>
          </BaseButton>
          <BaseButton variant="danger" small @click="cancelEdit">
            <i class="fas fa-times"></i>
          </BaseButton>
        </div>
      </div>

      <span v-else class="todo-text">{{ todo.text }}</span>
    </div>

    <div class="actions">
      <BaseButton
        v-if="!isEditing"
        class="edit-btn"
        variant="default"
        small
        @click="startEdit"
      >
        <i class="fas fa-edit"></i>
      </BaseButton>
      <BaseButton
        v-if="!isEditing"
        class="delete-btn"
        variant="danger"
        small
        @click="$emit('delete', todo.id)"
      >
        <i class="fas fa-times"></i>
      </BaseButton>
    </div>
  </li>
</template>

<script setup>
import { ref, nextTick } from "vue";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["toggle-complete", "delete", "update"]);

const isEditing = ref(false);
const editedText = ref("");
const editInput = ref(null);

const startEdit = () => {
  editedText.value = props.todo.text;
  isEditing.value = true;
  nextTick(() => {
    editInput.value?.focus();
  });
};

const saveEdit = () => {
  const trimmedText = editedText.value.trim();
  if (trimmedText && trimmedText !== props.todo.text) {
    emit("update", { id: props.todo.id, text: trimmedText });
  }
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const handleBlur = (event) => {
  // Vérifie si le clic n'est pas sur un des boutons d'action
  const isClickOnActions = event.relatedTarget?.closest(".edit-actions");
  if (!isClickOnActions) {
    saveEdit();
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.todo-text {
  font-size: 1rem;
  color: var(--text-color);
}

.completed .todo-text {
  text-decoration: line-through;
  color: #9ca3af;
}

.checkbox-container {
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: -10px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.2s;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: var(--primary-color);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .actions {
  opacity: 1;
}

.edit-container {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.edit-input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.edit-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn {
  color: var(--text-color);
}

.todo-text {
  flex: 1;
}
</style>
