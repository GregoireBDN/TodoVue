<template>
  <footer class="footer">
    <p>{{ nbTodos }} todos</p>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  nbTodos: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.footer {
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.8rem;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
}
</style>
