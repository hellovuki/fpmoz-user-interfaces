<script setup>
import { faExclamation, faPlay } from '@fortawesome/free-solid-svg-icons';
import { onMounted, onUnmounted, ref } from 'vue';
import movieApi from '@/api/movie';
import AppButton from './AppButton.vue';

const apiUrl = import.meta.env.VITE_API_URL;

const currentMovie = ref(null);

async function loadMovie() {
  currentMovie.value = await movieApi.getRandomMovie();
}

let intervalId;

onMounted(() => {
  loadMovie();
  intervalId = setInterval(loadMovie, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="bilboard">
    <template v-if="currentMovie">
      <video :src="`${apiUrl}/${currentMovie.videoUrl}`" class="video" autoplay loop muted></video>
      <div class="info">
        <p class="title">{{ currentMovie.title }}</p>
        <p class="description mb-md">
          {{ currentMovie.description }}
        </p>
        <div class="flex gap-md">
          <div style="width: 100px">
            <AppButton secondary label="Play" :icon="faPlay" />
          </div>
          <div style="width: 130px">
            <AppButton tertiary label="More info" :icon="faExclamation" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
.bilboard {
  height: 56.25vw;
  position: relative;
}

.video {
  height: 100%;
  filter: brightness(50%);
  object-fit: cover;
}

.info {
  position: absolute;
  top: 40%;
  left: 10%;
}

.title {
  font-size: 64px;
  width: 50%;
  font-weight: 700;
}

.description {
  font-size: 18px;
  width: 50%;
  line-height: 1.5;
}
</style>
