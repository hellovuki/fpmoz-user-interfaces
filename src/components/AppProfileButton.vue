<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const isDropdownOpen = ref(false);

function logout() {
  localStorage.clear('token');

  router.push({
    name: 'AuthPage',
  });
}
</script>

<template>
  <el-dropdown @visible-change="isDropdownOpen = !isDropdownOpen" trigger="click">
    <button class="btn">
      <img src="@/assets/img/profile.jpg" alt="Profile icon" class="profile" />
      <FontAwesomeIcon v-if="!isDropdownOpen" :icon="faArrowDown" class="icon" />
      <FontAwesomeIcon v-else :icon="faArrowUp" class="icon" />
    </button>

    <template #dropdown>
      <el-dropdown-menu class="profile-menu">
        <el-dropdown-item>{{ userStore.currentUser.firstName }}</el-dropdown-item>
        <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="css" scoped>
.btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.profile {
  height: 35px;
}

.icon {
  color: #fff;
  font-size: 13px;
}
</style>
