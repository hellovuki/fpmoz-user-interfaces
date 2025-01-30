<script setup>
import AppMovieCard from './AppMovieCard.vue';

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="px-lg py-md">
    <div>
      <p class="category mb-sm">{{ props.category }}</p>
      <div class="movies">
        <AppMovieCard v-for="movie in props.movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.category {
  font-size: 24px;
  font-weight: 600;
}

.movies {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
</style>
