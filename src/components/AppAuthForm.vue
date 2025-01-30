<script setup>
import { ref } from 'vue';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import authApi from '@/api/auth';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const isSignInMode = ref(true);

const firstName = ref();
const lastName = ref();
const email = ref();
const password = ref();

const isSubmitting = ref(false);

async function submit() {
  try {
    isSubmitting.value = true;
    const { token, user } = await authApi[isSignInMode.value ? 'signin' : 'signup']({
      email: email.value,
      password: password.value,
      ...(!isSignInMode.value ? { firstName: firstName.value, lastName: lastName.value } : {}),
    });

    localStorage.setItem('token', token);

    userStore.currentUser = user;

    router.push({
      name: 'HomePage',
    });
  } catch {
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <form class="form pa-xl" @submit.prevent="submit">
    <h2 class="title mb-md">{{ isSignInMode ? 'Sign in' : 'Sign up' }}</h2>
    <div class="mb-md">
      <div v-if="!isSignInMode" class="flex gap-sm mb-sm">
        <AppInput id="firstName" label="First name" v-model="firstName" />
        <AppInput id="lastName" label="Last name" v-model="lastName" />
      </div>
      <AppInput id="email" label="Email" v-model="email" class="mb-sm" />
      <AppInput id="password" type="password" label="Password" v-model="password" />
    </div>
    <AppButton type="submit" primary :label="isSignInMode ? 'Sign in' : 'Sign up'" class="mb-sm" />
    <p v-if="isSubmitting">...Submitting</p>
    <p class="toggle">
      {{ isSignInMode ? 'New to Netflix?' : 'Already have an account?' }}
      <a class="toggle-link" @click="isSignInMode = !isSignInMode">
        {{ isSignInMode ? 'Sign up now.' : 'Sign in.' }}
      </a>
    </p>
  </form>
</template>

<style lang="css" scoped>
.form {
  background-image: var(--gradient-bg);
  width: 448px;
  max-width: 448px;
  border-radius: 9px;
}

.title {
  font-size: 36px;
  font-weight: 600;
}

.toggle {
  color: #737373;
}

.toggle-link {
  color: #fff;
  cursor: pointer;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>
