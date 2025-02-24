const crypto = require('crypto');

const ts = new Date().getTime().toString();
const publicKey = 'd89a35673c8a956f1d73557368b3b4e8';
const privateKey = '6bce56d6c7f5f90d82148c9ae2b45d39f88a3ed3';

const hash = crypto
  .createHash('md5')
  .update(ts + privateKey + publicKey)
  .digest('hex');

console.log({ ts, publicKey, hash });
