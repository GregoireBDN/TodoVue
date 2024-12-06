<template>
  <div class="filters-container">
    <div class="filters">
      <BaseButton
        v-for="filter in filters"
        :key="filter.value"
        :variant="currentFilter === filter.value ? 'primary' : 'default'"
        small
        @click="$emit('change', filter.value)"
      >
        {{ filter.label }}
      </BaseButton>
    </div>
    <BaseButton
      class="clear-button"
      v-if="showClearButton"
      variant="danger"
      small
      @click="$emit('clear-all')"
    >
      <i class="fas fa-trash-alt"></i>
      Tout supprimer
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineProps({
  currentFilter: {
    type: String,
    required: true,
  },
  showClearButton: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["change", "clear-all"]);

const filters = [
  { label: "Tous", value: "all" },
  { label: "À faire", value: "active" },
  { label: "Terminées", value: "completed" },
];
</script>

<style scoped>
.filters-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
}

.clear-button {
  margin-left: 10px;
}
</style>
