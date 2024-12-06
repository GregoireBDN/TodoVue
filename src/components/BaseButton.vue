<template>
  <button
    :class="['base-button', variant, { 'is-small': small }]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "danger", "default"].includes(value),
  },
  small: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.base-button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}

.base-button:hover {
  opacity: 0.9;
}

.primary {
  background-color: #4caf50;
  color: white;
}

.danger {
  background-color: #ff4444;
  color: white;
}

.default {
  background-color: #e0e0e0;
  color: #333;
}

.is-small {
  padding: 6px 12px;
  font-size: 12px;
}
</style>
