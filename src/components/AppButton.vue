<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button class="btn" :class="[props.primary ? 'primary' : '']">
    {{ props.label }}
  </button>
</template>

<style lang="css" scoped>
.btn {
  display: inline-block;
  border: none;
  border-radius: 9px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 24px;
  transition: background-color 0.6s;
}

.primary {
  background-color: var(--primary);
  color: var(--on-primary);
}

.primary:hover {
  background-color: var(--primary-dark);
}
</style>
