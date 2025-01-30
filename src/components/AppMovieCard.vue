<script setup>
import AppButton from './AppButton.vue';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="movie">
    <img class="main-image" :src="props.movie.thumbnailUrl" alt="Main Image" />
    <div class="hover-content">
      <img class="hover-image" :src="props.movie.thumbnailUrl" alt="Hover Image" />
      <div class="flex items-center gap-md" style="padding: 16px; background-color: #27272a">
        <div style="width: 80px">
          <AppButton secondary label="Play" :icon="faPlay" />
        </div>
        <p>{{ props.movie.durationInMin }} minutes</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.movie {
  position: relative;
  background-color: #18181b;
  height: 12vw;
  width: 100%;
}

.main-image {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.hover-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: scale(0) translate(0, 0);
  transition: all 0.3s;
  z-index: 1000;
}

.hover-image {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}

/* Hover Effects */
.movie:hover .main-image {
  opacity: 0;
}

.movie:hover .hover-content {
  opacity: 1;
  transform: scale(1.2);
}
</style>
bhh
