var bcrypt = require('bcryptjs');

function hashPassword(password){
  return bcrypt.hashSync(password, 8);
}

function verifyPassword(plainPass, hashPassword){
  return bcrypt.compareSync(plainPass, hashPassword);
}

module.exports = {
  hashPassword,
  verifyPassword
}