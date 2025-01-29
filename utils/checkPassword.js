const bcrypt = require('bcryptjs');

async function checkPassword(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

module.exports = checkPassword;
