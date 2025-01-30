<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  tertiary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <button
    class="btn flex justify-center items-center gap-sm"
    :class="[
      props.primary ? 'primary' : '',
      props.secondary ? 'secondary' : '',
      props.tertiary ? 'tertiary' : '',
    ]"
  >
    <FontAwesomeIcon v-if="icon" :icon="props.icon" />
    <span>{{ props.label }}</span>
  </button>
</template>

<style lang="css" scoped>
.btn {
  border: none;
  background: none;
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

.secondary {
  background-color: #fff;
  color: var(--app-bg);
}

.secondary:hover {
  background-color: #e7e7e7;
}

.tertiary {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}

.tertiary:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
