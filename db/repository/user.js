const fs = require('fs/promises');
const createID = require('../../utils/createID');
const z = require('zod');
const path = require('path');
const bcrypt = require('bcryptjs');
const AppError = require('../../utils/appError');

const filePath = path.join(__dirname, '../data/users.json');

const UserCreateSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

async function getUsers() {
  const users = await fs.readFile(filePath);

  return JSON.parse(users);
}

function saveUsers(users) {
  return fs.writeFile(filePath, JSON.stringify(users));
}

async function createUser(user) {
  UserCreateSchema.parse(user);

  const users = await getUsers();

  if (users.some((u) => u.email === user.email)) {
    throw new AppError('There is already a user with this email!', 400);
  }

  const id = createID();

  const password = await bcrypt.hash(user.password, 12);

  const newUser = {
    ...user,
    password,
    id,
  };

  users.push(newUser);

  await saveUsers(users);

  return newUser;
}

async function findOne(key, value) {
  const users = await getUsers();

  const selectedUser = users.find((u) => u[key] === value);

  return selectedUser;
}

module.exports = {
  createUser,
  findOne,
};
