import apiConfig from './config';

async function signup(inputData) {
  const response = await apiConfig.post('/users/signup', inputData);

  const {
    token,
    data: { user },
  } = response.data;

  return {
    token,
    user,
  };
}

async function signin(inputData) {
  const response = await apiConfig.post('/users/login', inputData);

  const {
    token,
    data: { user },
  } = response.data;

  return {
    token,
    user,
  };
}

async function getMe() {
  const response = await apiConfig.get('/users/me');

  const {
    data: { user },
  } = response.data;

  return user;
}

const authApi = {
  signup,
  signin,
  getMe,
};

export default authApi;
