<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import { ref, onMounted, onUnmounted } from 'vue';
import AppProfileButton from './AppProfileButton.vue';

const TOP_OFFSET = 60;

const showBackground = ref(false);
function scrollHandler() {
  if (window.scrollY >= TOP_OFFSET) {
    showBackground.value = true;
  } else {
    showBackground.value = false;
  }
}

onMounted(() => {
  window.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
});
</script>

<template>
  <header
    class="flex items-center justify-between px-md header"
    :class="{ 'header--background': showBackground }"
  >
    <div class="flex items-center" style="gap: 80px">
      <img src="@/assets/img/logo.png" alt="Logo" class="logo" />
      <div class="flex gap-sm">
        <div class="link">Home</div>
        <div class="link">TV Shows</div>
        <div class="link">Movies</div>
        <div class="link">Latest</div>
        <div class="link">My List</div>
        <div class="link">Browser by languages</div>
      </div>
    </div>
    <div class="flex items-center gap-md">
      <FontAwesomeIcon :icon="faMagnifyingGlass" class="icon" style="font-size: 20px" />
      <div class="link">Kids</div>
      <FontAwesomeIcon :icon="faBell" class="icon" />
      <AppProfileButton />
    </div>
  </header>
</template>

<style>
.header {
  position: fixed;
  width: 100%;
  z-index: 40;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
}

.header--background {
  background-color: #18181b;
}

.logo {
  height: 80px;
}

.link {
  color: #fff;
  cursor: pointer;
  transition: color 0.4s;
  font-size: 13px;
}

.link:hover {
  color: #d1d5db;
}

.icon {
  color: #fff;
  font-size: 13px;
}
</style>
