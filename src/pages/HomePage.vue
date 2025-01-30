<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppBillboard from '@/components/AppBillboard.vue';
import AppMovies from '@/components/AppMovies.vue';
import categoryApi from '@/api/category';
import { onMounted, ref } from 'vue';

const categoriesWithMovies = ref([]);

async function loadCategoriesWithMovies() {
  categoriesWithMovies.value = await categoryApi.getCategoriesWithMovies();
}

onMounted(() => {
  loadCategoriesWithMovies();
});
</script>

<template>
  <AppHeader />
  <AppBillboard />
  <div>
    <AppMovies
      v-for="cwm in categoriesWithMovies"
      :key="cwm.id"
      :category="cwm.name"
      :movies="cwm.movies"
    />
  </div>
</template>
