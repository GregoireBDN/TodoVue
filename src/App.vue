<template>
  <TodoList />
</template>

<script setup>
import TodoList from "./components/TodoList.vue";
</script>

<style>
:root {
  --primary-color: #4caf50;
  --danger-color: #ff4444;
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-color: #2c3e50;
  --border-color: #e2e8f0;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--bg-color);
}
</style>
