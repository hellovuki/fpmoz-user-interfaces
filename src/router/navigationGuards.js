import authApi from '@/api/auth';
import { useUserStore } from '@/stores/user';

async function forbidUnauthenticated() {
  const userStore = useUserStore();

  if (userStore.currentUser) return true;

  try {
    const user = await authApi.getMe();

    userStore.currentUser = user;

    return true;
  } catch {
    return { name: 'AuthPage' };
  }
}

export { forbidUnauthenticated };
