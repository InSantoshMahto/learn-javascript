/** @format */

const crypto = require('crypto');

const config = require('../../config');

const ALGORITHM = config.crypto.algorithm;
const KEY = Buffer.from(config.crypto.key, 'hex');

/**
 * Encrypt
 * @param {string} message
 * @see message must be text
 * @returns object
 * @description this function use to encrypt the message.
 */
exports.Encrypt = (message) => {
	const IV = crypto.randomBytes(16);
	let chiper = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
	let encrypted = chiper.update(message);
	encrypted = Buffer.concat([encrypted, chiper.final()]);
	return {
		secret: IV.toString('hex'),
		data: encrypted.toString('hex'),
	};
};

/**
 * Decrypt
 * @param {string} message encoded
 * @param {string} secret iv
 * @see message must be decryptrd
 * @returns string
 * @description use to decrypt the message
 */
exports.Decrypt = (message, secret) => {
	const IV = Buffer.from(secret, 'hex');
	let encryptedText = Buffer.from(message, 'hex'); // encrepted buffer from encrypted text(hex).
	let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};
