const crypto = require('crypto')

function generateIv() {
  return crypto.randomBytes(16);
}

function encrypt(text) {
  const data = JSON.stringify(text)
  const iv = generateIv()
  const key = crypto.scryptSync(process.env.COOKIESECRET, process.env.SALT, 32)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  
  let encrypted = cipher.update(data, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  
  return iv.toString('base64') + ':' + encrypted
}

function decrypt(encryptedText) {
  const parts = encryptedText.split(':')
  const iv = Buffer.from(parts[0], 'base64')
  const encrypted = parts[1]
  const key = crypto.scryptSync(process.env.COOKIESECRET, process.env.SALT, 32)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = { encrypt, decrypt }